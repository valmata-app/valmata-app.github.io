import React, { useState, useEffect } from 'react';
import { getTranslator } from './localization/index.js';
import { programs } from './data/programs.js';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Sidebar from './components/Sidebar.jsx';
import Catalog from './features/catalog/Catalog.jsx';
import BuyModal from './features/buy/BuyModal.jsx';
import ActivatePage from './features/activate/ActivatePage.jsx';
import RulesPage from './features/rules/RulesPage.jsx';
import PrivacyPage from './features/privacy/PrivacyPage.jsx';

export default function App() {
  const [lang, setLang] = useState('ru');
  const [buyProgram, setBuyProgram] = useState(null);
  const [isBuyOpen, setIsBuyOpen] = useState(false);

  const [route, setRoute] = useState(
    typeof window !== 'undefined' ? window.location.hash : ''
  );

  useEffect(() => {
    const onHash = () => {
      setRoute(window.location.hash);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const isActivate = route === '#/activate';
  const isRules = route === '#/rules';
  const isPrivacy = route === '#/privacy';

  const t = getTranslator(lang);

  const handleBuy = (program) => {
    setBuyProgram(program);
    setIsBuyOpen(true);
  };

  const goHome = () => {
    window.location.hash = '';
  };

  return (
    <div className="min-h-screen flex flex-col">

      {/* Баннер «сайт в разработке» */}
      <div className="bg-amber-400 text-[#1D1D1F] text-center py-2 px-4 text-xs sm:text-sm font-semibold">
        {t.devBanner}
      </div>

      <Header t={t} lang={lang} setLang={setLang} />

      {/* Страницы правил / политики / активации — одна колонка */}
      {(isActivate || isRules || isPrivacy) && (
        <main className="flex-1 max-w-3xl w-full mx-auto px-6 py-12">
          {isActivate && <ActivatePage t={t} onBack={goHome} />}
          {isRules && <RulesPage t={t} onBack={goHome} />}
          {isPrivacy && <PrivacyPage t={t} onBack={goHome} />}
        </main>
      )}

      {/* Главная страница — две колонки */}
      {!isActivate && !isRules && !isPrivacy && (
        <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
            <Sidebar t={t} />

            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-3">
                {t.catalog.title}
              </h2>
              <p className="text-[#86868B] text-sm mb-8">
                {t.catalog.desc}
              </p>
              <Catalog
                t={t}
                lang={lang}
                programs={programs}
                onBuy={handleBuy}
              />

              <div className="mt-8 text-center">
                <a
                  href="#/activate"
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium transition"
                >
                  {t.activate.linkFromCatalog}
                </a>
              </div>
            </div>
          </div>
        </main>
      )}

      <Footer t={t} />

      <BuyModal
        t={t}
        lang={lang}
        program={buyProgram}
        isOpen={isBuyOpen}
        onClose={() => setIsBuyOpen(false)}
      />
    </div>
  );
}