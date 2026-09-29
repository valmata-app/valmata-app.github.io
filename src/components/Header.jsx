import React from 'react';
import LangSwitcher from './LangSwitcher.jsx';

export default function Header({ t, lang, setLang }) {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 px-6 sm:px-8 py-4 flex justify-between items-center border-b border-[#E5E5EA]">
      <div className="flex flex-col leading-tight">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1D1D1F]">
          {t.nav.brand}
        </h1>
        {t.nav.subtitle && (
          <p className="text-[11px] sm:text-xs text-[#86868B] mt-0.5">
            {t.nav.subtitle}
          </p>
        )}
      </div>
      <LangSwitcher lang={lang} setLang={setLang} />
    </header>
  );
}