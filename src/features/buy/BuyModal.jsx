import React, { useState, useEffect } from 'react';
import Modal from '../../components/Modal.jsx';
import TariffSelect from './TariffSelect.jsx';
import { formatPrice } from '../../utils/format.js';
import { trackEvent } from '../../utils/analytics.js';

const MIN_CORPORATE_SEATS = 5;

export default function BuyModal({ t, lang, program, isOpen, onClose }) {
  const [licenseType, setLicenseType] = useState('private');
  const [months, setMonths] = useState(1);
  const [email, setEmail] = useState('');
  const [hwid, setHwid] = useState('');
  const [hwids, setHwids] = useState(['', '', '', '', '']);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');

  // Сброс ошибки при смене типа лицензии
  useEffect(() => {
    setError('');
  }, [licenseType]);

  if (!program) return null;

  const name =
    lang === 'kz' ? (program.nameKz || program.nameRu) :
    lang === 'en' ? (program.nameEn || program.nameRu) :
    program.nameRu;

  const prices = program.prices?.[licenseType] || {};
  const pricePerUnit = prices[months] || 0;
  const isCorporate = licenseType === 'corporate';
  const seats = isCorporate ? hwids.length : 1;
  const total = isCorporate ? pricePerUnit * seats : pricePerUnit;

  // -------- Управление списком HWID (корпоративная) --------
  const addSeat = () => setHwids((prev) => [...prev, '']);

  const removeSeat = (index) => {
    if (hwids.length <= MIN_CORPORATE_SEATS) return;
    setHwids((prev) => prev.filter((_, i) => i !== index));
  };

  const updateHwid = (index, value) => {
    setHwids((prev) => prev.map((h, i) => (i === index ? value : h)));
  };

  // -------- Оплата --------
  const handlePay = () => {
    setError('');

    const emailTrim = email.trim();

    if (!emailTrim || !/^\S+@\S+\.\S+$/.test(emailTrim)) {
      setError(t.buy.errorEmail);
      return;
    }

    if (isCorporate) {
      const trimmedHwids = hwids.map((h) => h.trim().toUpperCase());

      if (trimmedHwids.some((h) => !h || h.length < 4)) {
        setError(t.buy.errorHwid);
        return;
      }

      const unique = new Set(trimmedHwids);
      if (unique.size !== trimmedHwids.length) {
        setError(t.buy.errorDuplicateHwid);
        return;
      }
    } else {
      const hwidTrim = hwid.trim();
      if (!hwidTrim || hwidTrim.length < 4) {
        setError(t.buy.errorHwid);
        return;
      }
    }

    if (!agreed) {
      setError(t.buy.errorAgree);
      return;
    }

    trackEvent('checkout_start', {
      program: program.id,
      licenseType,
      months,
      seats,
    });

    if (!program.lemonSqueezyUrl) {
      // eslint-disable-next-line no-alert
      alert('Оплата ещё не подключена. Lemon Squeezy URL не задан.');
      return;
    }

    const url = new URL(program.lemonSqueezyUrl);
    url.searchParams.set('checkout[email]', emailTrim.toLowerCase());
    url.searchParams.set('checkout[custom][program_id]', program.id);
    url.searchParams.set('checkout[custom][license_type]', licenseType);
    url.searchParams.set('checkout[custom][months]', String(months));

    if (isCorporate) {
      url.searchParams.set('checkout[custom][seats]', String(seats));
      hwids.forEach((h, i) => {
        url.searchParams.set(
          `checkout[custom][hwid_${i + 1}]`,
          h.trim().toUpperCase()
        );
      });
    } else {
      url.searchParams.set('checkout[custom][hwid]', hwid.trim().toUpperCase());
    }

    window.location.href = url.toString();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-xl">
      <h3 className="text-lg font-bold mb-4 pr-8">{name}</h3>

      {/* Тип лицензии */}
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setLicenseType('private')}
          className={
            'flex-1 py-2 rounded-xl border text-xs font-semibold transition ' +
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
            'flex-1 py-2 rounded-xl border text-xs font-semibold transition ' +
            (licenseType === 'corporate'
              ? 'border-blue-600 bg-blue-50 text-blue-600'
              : 'border-[#E5E5EA] text-[#86868B]')
          }
        >
          {t.buy.corporateTab}
        </button>
      </div>

      {/* Подсказка для корпоративной */}
      {isCorporate && (
        <div className="mb-4 px-3.5 py-2.5 bg-blue-50 border border-blue-100 rounded-xl">
          <p className="text-[11px] text-[#424245] leading-relaxed">
            <span className="font-semibold text-[#1D1D1F]">
              {t.buy.corporateHintTitle}
            </span>{' '}
            {t.buy.corporateHintText}
          </p>
        </div>
      )}

      {/* Период подписки */}
      <TariffSelect
        t={t}
        prices={prices}
        months={months}
        setMonths={setMonths}
      />

      {/* Данные для активации */}
      <div className="mt-4 pt-4 border-t border-[#F5F5F7]">
        <p className="text-xs font-semibold text-[#1D1D1F] mb-2.5">
          {t.buy.activationDataTitle}
        </p>

        {/* Email */}
        <label className="block mb-3">
          <span className="block text-[11px] font-medium text-[#86868B] mb-1">
            {t.buy.emailLabel}
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-3.5 py-2 rounded-xl border border-[#E5E5EA] text-sm outline-none focus:border-blue-500"
          />
          <span className="block text-[10px] text-[#86868B] mt-1">
            {t.buy.infoEmail}
          </span>
        </label>

        {/* Частная: одно поле HWID */}
        {!isCorporate && (
          <label className="block">
            <span className="block text-[11px] font-medium text-[#86868B] mb-1">
              {t.buy.hwidLabel}
            </span>
            <input
              type="text"
              value={hwid}
              onChange={(e) => setHwid(e.target.value)}
              placeholder="XXXX-XXXX-XXXX-XXXX"
              className="w-full px-3.5 py-2 rounded-xl border border-[#E5E5EA] text-sm font-mono outline-none focus:border-blue-500"
            />
            <span className="block text-[10px] text-[#86868B] mt-1">
              {t.buy.infoHwid}
            </span>
          </label>
        )}

        {/* Корпоративная: список HWID */}
        {isCorporate && (
          <div>
            <div className="flex justify-between items-baseline mb-1.5">
              <span className="text-[11px] font-medium text-[#86868B]">
                {t.buy.hwidsListLabel}
              </span>
              <span className="text-[10px] text-[#86868B]">
                {t.buy.minSeatsHint}
              </span>
            </div>

            <div className="space-y-1.5 max-h-52 overflow-y-auto modal-scroll pr-1">
              {hwids.map((h, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <span className="text-[11px] text-[#86868B] w-24 shrink-0">
                    {t.buy.seatLabel} №{i + 1}
                  </span>
                  <input
                    type="text"
                    value={h}
                    onChange={(e) => updateHwid(i, e.target.value)}
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-[#E5E5EA] text-xs font-mono outline-none focus:border-blue-500"
                  />
                  {hwids.length > MIN_CORPORATE_SEATS ? (
                    <button
                      type="button"
                      onClick={() => removeSeat(i)}
                      className="text-[#86868B] hover:text-red-500 text-sm shrink-0 w-5 text-center transition"
                      aria-label="Remove"
                    >
                      ✕
                    </button>
                  ) : (
                    <span className="w-5 shrink-0" />
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addSeat}
              className="mt-2 text-xs text-blue-600 hover:text-blue-800 font-semibold transition"
            >
              + {t.buy.addSeatBtn}
            </button>
          </div>
        )}
      </div>

      {/* Итого */}
      <div className="mt-4 px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl">
        {isCorporate ? (
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-[#86868B]">{t.buy.perSeatLabel}</span>
              <span className="font-semibold text-[#1D1D1F]">
                {formatPrice(pricePerUnit)}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#86868B]">{t.buy.qtyLabel}</span>
              <span className="font-semibold text-[#1D1D1F]">{seats}</span>
            </div>
            <div className="border-t border-blue-200 pt-1.5 flex justify-between items-baseline">
              <span className="text-xs font-semibold text-[#1D1D1F]">
                {t.buy.totalLabel}
              </span>
              <span className="text-lg font-bold text-blue-600">
                {formatPrice(total)}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-[#1D1D1F]">
              {t.buy.totalLabel}
            </span>
            <span className="text-lg font-bold text-blue-600">
              {formatPrice(total)}
            </span>
          </div>
        )}
      </div>

      {/* Согласие */}
      <label className="mt-3 flex gap-3 items-start cursor-pointer select-none">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 w-4 h-4 shrink-0 accent-blue-600 cursor-pointer"
        />
        <span className="text-[11px] text-[#424245] leading-relaxed">
          {t.buy.agreePrefix}{' '}
          <a
            href="#/rules"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:text-blue-800 font-semibold underline decoration-1 underline-offset-2"
            onClick={(e) => e.stopPropagation()}
          >
            {t.buy.agreeRules}
          </a>{' '}
          {t.buy.agreeAnd}{' '}
          <a
            href="#/privacy"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:text-blue-800 font-semibold underline decoration-1 underline-offset-2"
            onClick={(e) => e.stopPropagation()}
          >
            {t.buy.agreePrivacy}
          </a>
        </span>
      </label>

      {/* Ошибка */}
      {error && (
        <div className="mt-3 px-3 py-2 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
          {error}
        </div>
      )}

      {/* Кнопка оплаты */}
      <button
        type="button"
        onClick={handlePay}
        className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-full shadow-sm transition"
      >
        {t.buy.btnPay}
      </button>

      {/* Блок безопасности */}
      <div className="mt-3 px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E5E5EA] rounded-xl">
        <p className="text-[10px] text-[#86868B] leading-relaxed flex gap-2">
          <span className="shrink-0">🔒</span>
          <span>{t.buy.securePayment}</span>
        </p>
      </div>
    </Modal>
  );
}