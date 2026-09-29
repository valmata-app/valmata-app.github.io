import React, { useState } from 'react';
import Modal from '../../components/Modal.jsx';
import TariffSelect from './TariffSelect.jsx';
import { formatPrice } from '../../utils/format.js';
import { trackEvent } from '../../utils/analytics.js';

export default function BuyModal({ t, lang, program, isOpen, onClose }) {
  const [licenseType, setLicenseType] = useState('private');
  const [months, setMonths] = useState(1);
  const [email, setEmail] = useState('');
  const [hwid, setHwid] = useState('');
  const [error, setError] = useState('');

  if (!program) return null;

  const name =
    lang === 'kz' ? (program.nameKz || program.nameRu) :
    lang === 'en' ? (program.nameEn || program.nameRu) :
    program.nameRu;

  const prices = program.prices?.[licenseType] || {};
  const price = prices[months] || 0;

  const handlePay = () => {
    setError('');

    // Валидация
    const emailTrim = email.trim();
    const hwidTrim = hwid.trim();

    if (!emailTrim || !/^\S+@\S+\.\S+$/.test(emailTrim)) {
      setError(t.buy.errorEmail);
      return;
    }
    if (!hwidTrim || hwidTrim.length < 4) {
      setError(t.buy.errorHwid);
      return;
    }

    trackEvent('checkout_start', {
      program: program.id,
      licenseType,
      months,
    });

    if (!program.lemonSqueezyUrl) {
      // eslint-disable-next-line no-alert
      alert('Оплата ещё не подключена. Lemon Squeezy URL не задан.');
      return;
    }

    const url = new URL(program.lemonSqueezyUrl);
    // Email предзаполнится на чекауте Lemon Squeezy
    url.searchParams.set('checkout[email]', emailTrim.toLowerCase());
    // Наши данные — попадут в webhook в meta.custom_data
    url.searchParams.set('checkout[custom][program_id]', program.id);
    url.searchParams.set('checkout[custom][license_type]', licenseType);
    url.searchParams.set('checkout[custom][months]', String(months));
    url.searchParams.set('checkout[custom][hwid]', hwidTrim.toUpperCase());

    window.location.href = url.toString();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-lg font-bold mb-4 pr-8">{name}</h3>

      {/* Тип лицензии */}
      <div className="flex gap-2 mb-5">
        <button
          type="button"
          onClick={() => setLicenseType('private')}
          className={
            'flex-1 py-2.5 rounded-xl border text-xs font-semibold transition ' +
            (licenseType === 'private'
              ? 'border-blue-600 bg-blue-50 text-blue-600'
              : 'border-[#E5E5EA] text-[#86868B]')
          }
        >
          {t.buy.privateTab}
        </button>
        <button
          type="button"
          onClick={() => setLicenseType('corporate')}
          className={
            'flex-1 py-2.5 rounded-xl border text-xs font-semibold transition ' +
            (licenseType === 'corporate'
              ? 'border-blue-600 bg-blue-50 text-blue-600'
              : 'border-[#E5E5EA] text-[#86868B]')
          }
        >
          {t.buy.corporateTab}
        </button>
      </div>

      {/* Период подписки */}
      <TariffSelect
        t={t}
        prices={prices}
        months={months}
        setMonths={setMonths}
      />

      {/* Данные для активации */}
      <div className="mt-5 pt-5 border-t border-[#F5F5F7]">
        <p className="text-xs font-semibold text-[#1D1D1F] mb-3">
          {t.buy.activationDataTitle}
        </p>

        <label className="block mb-3">
          <span className="block text-[11px] font-medium text-[#86868B] mb-1.5">
            {t.buy.emailLabel}
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E5EA] text-sm outline-none focus:border-blue-500"
          />
        </label>

        <label className="block">
          <span className="block text-[11px] font-medium text-[#86868B] mb-1.5">
            {t.buy.hwidLabel}
          </span>
          <input
            type="text"
            value={hwid}
            onChange={(e) => setHwid(e.target.value)}
            placeholder="XXXX-XXXX-XXXX-XXXX"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E5EA] text-sm font-mono outline-none focus:border-blue-500"
          />
        </label>
      </div>

      {/* Пояснение */}
      <div className="mt-4 p-3.5 bg-[#F5F5F7] border border-[#E5E5EA] rounded-xl">
        <p className="text-[11px] text-[#86868B] leading-relaxed">
          <span className="font-semibold text-[#1D1D1F]">{t.buy.infoTitle}</span>
          <br />
          {t.buy.infoEmail}
          <br />
          {t.buy.infoHwid}
        </p>
      </div>

      {/* Итого */}
      <div className="mt-5 p-4 bg-blue-50 border border-blue-100 rounded-xl flex justify-between items-center">
        <span className="text-xs font-semibold text-[#1D1D1F]">
          {t.buy.totalLabel}
        </span>
        <span className="text-lg font-bold text-blue-600">
          {formatPrice(price)}
        </span>
      </div>

      {/* Ошибка валидации */}
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handlePay}
        className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full shadow-sm transition"
      >
        {t.buy.btnPay}
      </button>
    </Modal>
  );
}