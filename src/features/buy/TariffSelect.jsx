import React from 'react';
import { formatPrice } from '../../utils/format.js';

const PERIODS = [1, 3, 6, 12];

export default function TariffSelect({ t, prices, months, setMonths }) {
  return (
    <div>
      <label className="block mb-1.5 text-xs font-medium text-[#86868B]">
        {t.buy.periodLabel}
      </label>
      <div className="grid grid-cols-4 gap-2">
        {PERIODS.map((m) => {
          const isActive = months === m;
          const price = prices?.[m];
          return (
            <button
              key={m}
              type="button"
              onClick={() => setMonths(m)}
              className={
                'py-2 rounded-xl border text-xs font-semibold transition ' +
                (isActive
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-[#E5E5EA] text-[#86868B] hover:border-[#D2D2D7]')
              }
            >
              <div>{m} {t.catalog.perMonth}</div>
              <div className="text-[10px] mt-0.5 opacity-80">
                {formatPrice(price)}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}