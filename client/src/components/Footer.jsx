import React from 'react';
import { Sparkles, Globe, Heart } from 'lucide-react';

export default function Footer({ content, lang, setLang }) {
  const { footer, nav } = content;
  const isRtl = lang === 'he';

  return (
    <footer className="border-t border-slate-800 bg-[#080b12] py-14 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div className="text-center md:text-start">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/40 flex items-center justify-center font-bold text-xs">
                TS
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                {nav.brand}
              </span>
              <span className="text-[10px] text-teal-400 font-mono bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20">
                B.Sc • Coding Academy
              </span>
            </div>
            <p className="max-w-md text-slate-400 leading-relaxed text-xs">
              {footer.brandDesc}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300">
            <a href="#case-study" className="hover:text-teal-400 transition-colors">
              {nav.caseStudies}
            </a>
            <a href="#services" className="hover:text-teal-400 transition-colors">
              {nav.services}
            </a>
            <a href="#automations" className="hover:text-teal-400 transition-colors">
              {nav.automations}
            </a>
            <a href="#pricing" className="hover:text-teal-400 transition-colors">
              {nav.pricing}
            </a>
            <a href="#about" className="hover:text-teal-400 transition-colors">
              {nav.about}
            </a>

            <button
              onClick={() => setLang(lang === 'he' ? 'en' : 'he')}
              className="flex items-center gap-1 px-3 py-1 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 hover:text-white transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-teal-400" />
              <span>{lang === 'he' ? 'Switch to English' : 'מעבר לעברית'}</span>
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
          <div>{footer.copyright}</div>
          <div className="text-slate-400 font-mono text-[11px]">
            {footer.subnote}
          </div>
        </div>
      </div>
    </footer>
  );
}
