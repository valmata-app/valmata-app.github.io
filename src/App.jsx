import React, { useState, useEffect } from 'react';
import { getTranslator } from './localization/index.js';
import { programs } from './data/programs.js';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Catalog from './features/catalog/Catalog.jsx';
import BuyModal from './features/buy/BuyModal.jsx';
import ActivatePage from './features/activate/ActivatePage.jsx';

export default function App() {
  const [lang, setLang] = useState('ru');
  const [buyProgram, setBuyProgram] = useState(null);
  const [isBuyOpen, setIsBuyOpen] = useState(false);

  // Простейший роутинг через hash: #/  → каталог, #/activate → активация
  const [route, setRoute] = useState(
    typeof window !== 'undefined' ? window.location.hash : ''
  );

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const isActivate = route === '#/activate';

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
      <Header t={t} lang={lang} setLang={setLang} />

      <main className="flex-1 max-w-3xl w-full mx-auto px-6 py-12">
        {isActivate ? (
          <ActivatePage t={t} onBack={goHome} />
        ) : (
          <>
            <h2 className="text-3xl font-bold tracking-tight mb-3">{t.catalog.title}</h2>
            <p className="text-[#86868B] text-sm mb-8">{t.catalog.desc}</p>
            <Catalog t={t} lang={lang} programs={programs} onBuy={handleBuy} />

            <div className="mt-8 text-center">
              <a
                href="#/activate"
                className="text-xs text-blue-600 hover:text-blue-800 font-medium transition"
              >
                {t.activate.linkFromCatalog}
              </a>
            </div>
          </>
        )}
      </main>

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