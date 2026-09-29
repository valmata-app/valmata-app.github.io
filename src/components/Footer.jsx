import React from 'react';

export default function Footer({ t }) {
  return (
    <footer className="mt-16 border-t border-[#E5E5EA]">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <p className="text-center text-xs text-[#86868B]">
          {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}