import React, { useEffect } from 'react';

export default function Modal({ isOpen, onClose, children, maxWidth = 'max-w-lg' }) {
  useEffect(() => {
    if (!isOpen) return;
    const onEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className={
          'bg-white rounded-3xl w-full ' + maxWidth +
          ' relative max-h-[90vh] shadow-2xl flex flex-col overflow-hidden'
        }
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-6 z-10 text-[#86868B] hover:text-[#1D1D1F] text-lg transition"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="overflow-y-auto modal-scroll px-7 py-6">
          {children}
        </div>
      </div>
    </div>
  );
}