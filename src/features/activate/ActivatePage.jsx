import React, { useState } from 'react';
import { API_URL } from '../../config.js';

export default function ActivatePage({ t, onBack }) {
  const [email, setEmail] = useState('');
  const [hwid, setHwid] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [key, setKey] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !hwid.trim()) return;

    setStatus('loading');
    setError('');

    try {
      const res = await fetch(`${API_URL}/api/activate/request-key`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          hwid: hwid.trim().toUpperCase(),
          programId: 'mathapp-1',
          months: 1,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus('error');
        setError(data.error || t.activate.errorGeneric);
        return;
      }

      setKey(data.key || '');
      setExpiresAt(data.expiresAt || '');
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err.message || t.activate.errorNetwork);
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto">
      <button
        type="button"
        onClick={onBack}
        className="text-xs text-[#86868B] hover:text-[#1D1D1F] mb-6 transition"
      >
        ← {t.activate.back}
      </button>

      <h2 className="text-3xl font-bold tracking-tight mb-3">{t.activate.title}</h2>
      <p className="text-[#86868B] text-sm mb-8">{t.activate.desc}</p>

      {status === 'success' ? (
        <div className="bg-white rounded-2xl border border-[#E5E5EA] p-6 shadow-sm">
          <p className="text-sm text-[#1D1D1F] font-semibold mb-4">
            {t.activate.successTitle}
          </p>

          <div className="bg-[#F5F5F7] rounded-xl p-4 mb-4">
            <p className="text-[11px] text-[#86868B] uppercase tracking-wider mb-1">
              {t.activate.keyLabel}
            </p>
            <p className="font-mono text-xs text-[#1D1D1F] break-all font-semibold">
              {key}
            </p>
          </div>

          <p className="text-xs text-[#86868B] mb-4">
            {t.activate.expiresLabel}: <b className="text-[#1D1D1F]">
              {new Date(expiresAt).toLocaleDateString('ru-RU')}
            </b>
          </p>

          <p className="text-xs text-[#86868B]">{t.activate.emailHint}</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-[#E5E5EA] p-6 shadow-sm"
        >
          <label className="block mb-4">
            <span className="block text-xs font-semibold text-[#1D1D1F] mb-2">
              {t.activate.emailLabel}
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-[#E5E5EA] text-sm outline-none focus:border-blue-500"
            />
          </label>

          <label className="block mb-6">
            <span className="block text-xs font-semibold text-[#1D1D1F] mb-2">
              {t.activate.hwidLabel}
            </span>
            <input
              type="text"
              value={hwid}
              onChange={(e) => setHwid(e.target.value)}
              placeholder="XXXX-XXXX-XXXX-XXXX"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-[#E5E5EA] text-sm font-mono outline-none focus:border-blue-500"
            />
            <span className="block text-[11px] text-[#86868B] mt-1.5">
              {t.activate.hwidHint}
            </span>
          </label>

          {status === 'error' && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className={
              'w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-full shadow-sm transition ' +
              (status === 'loading' ? 'opacity-60 cursor-not-allowed' : '')
            }
          >
            {status === 'loading' ? t.activate.loading : t.activate.btnSubmit}
          </button>
        </form>
      )}
    </div>
  );
}