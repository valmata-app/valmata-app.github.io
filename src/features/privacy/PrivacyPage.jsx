import React from 'react';

export default function PrivacyPage({ t, onBack }) {
  const p = t.privacy;

  return (
    <div className="max-w-3xl w-full mx-auto">
      <button
        type="button"
        onClick={onBack}
        className="text-xs text-[#86868B] hover:text-[#1D1D1F] mb-6 transition"
      >
        ← {p.back}
      </button>

      <h2 className="text-3xl font-bold tracking-tight mb-3">{p.title}</h2>
      <p className="text-[#86868B] text-sm mb-8">{p.intro}</p>

      <div className="space-y-5">
        <Section
          num="1"
          title={p.s1Title}
          items={[p.s1i1, p.s1i2, p.s1i3]}
        />

        <Section
          num="2"
          title={p.s2Title}
          items={[p.s2i1, p.s2i2, p.s2i3]}
        />

        <Section
          num="3"
          title={p.s3Title}
          items={[p.s3i1, p.s3i2, p.s3i3]}
        />

        <Section
          num="4"
          title={p.s4Title}
          items={[p.s4i1, p.s4i2, p.s4i3]}
        />

        <Section
          num="5"
          title={p.s5Title}
          items={[p.s5i1, p.s5i2, p.s5i3]}
        />

        <Section
          num="6"
          title={p.s6Title}
          items={[p.s6i1, p.s6i2, p.s6i3, p.s6i4]}
        />

        <Section
          num="7"
          title={p.s7Title}
          items={[p.s7i1, p.s7i2]}
        />

        <Section
          num="8"
          title={p.s8Title}
          items={[p.s8i1, p.s8i2]}
        />

        <Section
          num="9"
          title={p.s9Title}
          items={[p.s9i1, p.s9i2]}
        />
      </div>

      <p className="mt-8 text-xs text-[#86868B] text-center">
        {p.footer}
      </p>
    </div>
  );
}

function Section({ num, title, items }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E5EA] p-6 shadow-sm">
      <h3 className="text-base font-bold text-[#1D1D1F] mb-3 flex items-start gap-3">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-50 text-blue-600 text-xs font-bold shrink-0">
          {num}
        </span>
        <span className="pt-0.5">{title}</span>
      </h3>
      <ul className="space-y-2 pl-10">
        {items.map((item, i) => (
          <li
            key={i}
            className="text-sm text-[#424245] leading-relaxed flex gap-2"
          >
            <span className="text-[#86868B] shrink-0">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}