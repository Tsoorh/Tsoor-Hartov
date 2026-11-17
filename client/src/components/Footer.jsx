import React from 'react';
import { Globe, Shield, Lock, Scale } from 'lucide-react';

export default function Footer({ content, lang, setLang, onOpenLegal }) {
  const { footer, nav } = content;
  const isRtl = lang === 'he';

  return (
    <footer className="border-t border-slate-800 bg-[#080b12] py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Footer Row: Brand & Main Navigation */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div className="text-center lg:text-start">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/40 flex items-center justify-center font-bold text-xs">
                TS
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                {nav.brand}
              </span>
              <span className="text-[10px] text-teal-400 font-mono bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20">
                {lang === 'he' ? 'פיתוח אתרים ומערכות' : 'Custom Web Development'}
              </span>
            </div>
            <p className="max-w-md text-slate-400 leading-relaxed text-xs">
              {footer.brandDesc}
            </p>
          </div>

          {/* Section Navigation Links */}
          <nav aria-label={isRtl ? 'ניווט תחתון' : 'Footer Navigation'} className="flex flex-wrap items-center justify-center gap-5 text-slate-300">
            <a
              href="#case-study"
              className="hover:text-teal-400 transition-colors py-1 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none rounded-md"
            >
              {nav.caseStudies}
            </a>
            <a
              href="#services"
              className="hover:text-teal-400 transition-colors py-1 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none rounded-md"
            >
              {nav.services}
            </a>
            <a
              href="#automations"
              className="hover:text-teal-400 transition-colors py-1 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none rounded-md"
            >
              {nav.automations}
            </a>
            <a
              href="#pricing"
              className="hover:text-teal-400 transition-colors py-1 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none rounded-md"
            >
              {nav.pricing}
            </a>
            <a
              href="#about"
              className="hover:text-teal-400 transition-colors py-1 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none rounded-md"
            >
              {nav.about}
            </a>

            <button
              onClick={() => setLang(lang === 'he' ? 'en' : 'he')}
              aria-label={lang === 'he' ? 'שנה שפה לאנגלית' : 'Switch language to Hebrew'}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
            >
              <Globe className="w-3.5 h-3.5 text-teal-400" />
              <span>{lang === 'he' ? 'Switch to English' : 'מעבר לעברית'}</span>
            </button>
          </nav>
        </div>

        {/* Middle Footer Row: Dedicated Legal & Accessibility Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
          <div className="flex items-center gap-2 text-slate-300 font-medium text-xs">
            <span className="w-2 h-2 rounded-full bg-teal-400 inline-block animate-pulse"></span>
            <span>
              {isRtl
                ? 'נגישות ושקיפות מלאה לפי הדין הישראלי'
                : 'Accessibility & Legal Compliance (IS 5568 AA)'}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <button
              onClick={() => onOpenLegal && onOpenLegal('accessibility')}
              className="flex items-center gap-1.5 text-teal-400 hover:text-teal-300 font-semibold transition-colors py-1 px-2 rounded-lg hover:bg-teal-500/10 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{isRtl ? 'הצהרת נגישות (AA)' : 'Accessibility Statement'}</span>
            </button>

            <span className="text-slate-700 hidden sm:inline">•</span>

            <button
              onClick={() => onOpenLegal && onOpenLegal('privacy')}
              className="flex items-center gap-1.5 text-slate-300 hover:text-teal-400 transition-colors py-1 px-2 rounded-lg hover:bg-slate-800/60 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
            >
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>{isRtl ? 'מדיניות פרטיות' : 'Privacy Policy'}</span>
            </button>

            <span className="text-slate-700 hidden sm:inline">•</span>

            <button
              onClick={() => onOpenLegal && onOpenLegal('terms')}
              className="flex items-center gap-1.5 text-slate-300 hover:text-teal-400 transition-colors py-1 px-2 rounded-lg hover:bg-slate-800/60 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
            >
              <Scale className="w-3.5 h-3.5 text-slate-400" />
              <span>{isRtl ? 'תנאי שימוש' : 'Terms of Use'}</span>
            </button>
          </div>
        </div>

        {/* Bottom Footer Row: Copyright & Tech Subnote */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start text-slate-400">
          <div>{footer.copyright}</div>
          <div className="font-mono text-[11px] text-slate-400">
            {footer.subnote}
          </div>
        </div>
      </div>
    </footer>
  );
}
