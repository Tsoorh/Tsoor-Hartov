import React, { useState } from 'react';

export default function WhatsAppFloat({ lang }) {
  const isRtl = lang === 'he';
  const [hovered, setHovered] = useState(false);

  const message = encodeURIComponent(
    isRtl
      ? 'היי צור, ראיתי את האתר שלך ואשמח לשמוע פרטים על בניית אתר/אוטומציות לעסק שלי.'
      : 'Hi Tsoor, I saw your website and would like to hear more about web development and automations for my business.'
  );

  const url = `https://wa.me/972505935609?text=${message}`;

  return (
    <div
      className={`fixed bottom-5 sm:bottom-6 ${
        isRtl ? 'left-4 sm:left-6' : 'right-4 sm:right-6'
      } z-50 flex items-center gap-3`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip Card on Hover (Desktop) */}
      <div
        className={`hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-slate-900/95 border border-slate-700/80 text-white shadow-2xl backdrop-blur-md transition-all duration-300 pointer-events-none ${
          hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
        }`}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse"></div>
        <div>
          <div className="text-xs font-bold leading-tight">
            {isRtl ? 'צור הרטוב - זמין בוואטסאפ' : 'Tsoor is available on WhatsApp'}
          </div>
          <div className="text-[11px] text-teal-400 font-mono mt-0.5">050-593-5609</div>
        </div>
      </div>

      {/* Main Floating Button with Authentic 100% Mathematically Centered WhatsApp Badge */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Tsoor Hartov on WhatsApp (050-593-5609)"
        className="group relative flex items-center gap-2 p-1 sm:px-3 sm:py-2 bg-slate-900/90 hover:bg-slate-850 border border-slate-700/80 hover:border-[#25D366]/60 rounded-full shadow-2xl shadow-black/80 hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-md focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:outline-none"
      >
        <div className="relative shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 64 64" className="w-12 h-12 sm:w-11 sm:h-11 shrink-0 drop-shadow-md">
            <path
              fill="#25D366"
              d="M32 2C15.432 2 2 15.432 2 32c0 5.293 1.378 10.274 3.791 14.604L2 62l15.86-4.152A29.835 29.835 0 0 0 32 62c16.568 0 30-13.432 30-30S48.568 2 32 2z"
            />
            <path
              fill="#FFFFFF"
              d="M47.79 38.835c-.792-.397-4.686-2.312-5.411-2.576-.726-.264-1.255-.396-1.784.397-.528.792-2.046 2.576-2.508 3.104-.462.529-.924.594-1.716.198-.792-.396-3.344-1.232-6.37-3.93-2.355-2.099-3.945-4.693-4.407-5.485-.462-.792-.049-1.22.347-1.614.357-.356.792-.924 1.188-1.386.396-.462.528-.792.792-1.32.264-.528.132-.99-.066-1.386-.198-.396-1.784-4.298-2.443-5.883-.643-1.545-1.298-1.334-1.783-1.36-.462-.022-.99-.026-1.518-.026-.528 0-1.386.198-2.112.99-.726.792-2.772 2.706-2.772 6.6 0 3.894 2.838 7.656 3.234 8.184.396.528 5.584 8.528 13.528 11.956 1.89.816 3.364 1.303 4.514 1.666 1.897.604 3.624.519 4.988.315 1.523-.227 4.686-1.914 5.346-3.762.66-1.848.66-3.432.462-3.762-.198-.33-.726-.528-1.518-.924z"
            />
          </svg>
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 border-2 border-slate-900 rounded-full"></span>
        </div>

        <div className="hidden sm:block text-start px-1">
          <div className="text-xs font-bold text-white leading-tight">
            {isRtl ? 'וואטסאפ ישיר' : 'WhatsApp'}
          </div>
          <div className="text-[10px] text-emerald-400 font-mono leading-tight">050-593-5609</div>
        </div>
      </a>
    </div>
  );
}
