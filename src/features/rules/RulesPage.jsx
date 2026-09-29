import React from 'react';

export default function RulesPage({ t, onBack }) {
  const rules = t.rules;

  return (
    <div className="max-w-3xl w-full mx-auto">
      <button
        type="button"
        onClick={onBack}
        className="text-xs text-[#86868B] hover:text-[#1D1D1F] mb-6 transition"
      >
        ← {rules.back}
      </button>

      <h2 className="text-3xl font-bold tracking-tight mb-3">{rules.title}</h2>
      <p className="text-[#86868B] text-sm mb-8">{rules.intro}</p>

      <div className="space-y-5">
        {/* 1. Как работает активация */}
        <Section
          num="1"
          title={rules.s1Title}
          items={[rules.s1i1, rules.s1i2, rules.s1i3, rules.s1i4]}
        />

        {/* 2. Что разрешено */}
        <Section
          num="2"
          title={rules.s2Title}
          items={[rules.s2i1, rules.s2i2, rules.s2i3]}
        />

        {/* 3. Что запрещено */}
        <Section
          num="3"
          title={rules.s3Title}
          items={[rules.s3i1, rules.s3i2, rules.s3i3]}
        />

        {/* 4. Из-за чего может перестать работать */}
        <Section
          num="4"
          title={rules.s4Title}
          items={[
            rules.s4i1,
            rules.s4i2,
            rules.s4i3,
            rules.s4i4,
            rules.s4i5,
          ]}
        />

        {/* 5. Что делать если проблема */}
        <Section
          num="5"
          title={rules.s5Title}
          items={[rules.s5i1, rules.s5i2, rules.s5i3]}
        />

        {/* 6. Возврат средств */}
        <Section
          num="6"
          title={rules.s6Title}
          items={[rules.s6i1, rules.s6i2, rules.s6i3]}
        />

        {/* 7. Приватность */}
        <Section
          num="7"
          title={rules.s7Title}
          items={[rules.s7i1, rules.s7i2, rules.s7i3]}
        />

        {/* 8. Перенос лицензии */}
        <Section
          num="8"
          title={rules.s8Title}
          items={[
            rules.s8i1,
            rules.s8i2,
            rules.s8i3,
            rules.s8i4,
            rules.s8i5,
            rules.s8i6,
            rules.s8i7,
            rules.s8i8,
          ]}
        />

        {/* 9. Как отличить нас от мошенников */}
        <Section
          num="9"
          title={rules.s9Title}
          items={[
            rules.s9i1,
            rules.s9i2,
            rules.s9i3,
            rules.s9i4,
            rules.s9i5,
          ]}
        />
      </div>

      <p className="mt-8 text-xs text-[#86868B] text-center">
        {rules.footer}
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