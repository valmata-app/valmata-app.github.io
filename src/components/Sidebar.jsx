import React from 'react';

export default function Sidebar({ t }) {
  return (
    <aside className="space-y-4">
      {/* Блок про правила и политику */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
        <p className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wide mb-2">
          📌 {t.footer.importantTitle}
        </p>
        <p className="text-xs text-[#424245] leading-relaxed mb-4">
          {t.footer.importantText}
        </p>
        <div className="flex flex-col gap-2">
          <a
            href="#/rules"
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 transition"
          >
            {t.footer.rulesLink}
          </a>
          <a
            href="#/privacy"
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 transition"
          >
            {t.footer.privacyLink}
          </a>
        </div>
      </div>

      {/* Плашка про мошенников */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <p className="text-xs text-[#424245] leading-relaxed flex gap-2">
          <span className="shrink-0 text-base">🛡️</span>
          <span>
            <span className="font-semibold text-[#1D1D1F]">
              {t.footer.scamWarningTitle}
            </span>{' '}
            {t.footer.scamWarning}
          </span>
        </p>
      </div>
    </aside>
  );
}