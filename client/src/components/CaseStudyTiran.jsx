import React, { useState } from 'react';
import { ExternalLink, Check, Smartphone, Monitor, Sparkles, MessageCircle, ArrowUpRight } from 'lucide-react';

export default function CaseStudyTiran({ content, lang }) {
  const { caseStudy } = content;
  const [deviceMode, setDeviceMode] = useState('desktop'); // desktop or mobile

  return (
    <section id="case-study" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{caseStudy.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {caseStudy.clientName}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1">
              {caseStudy.industry}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Live site link */}
            <a
              href={caseStudy.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold border border-slate-700 transition-all hover:scale-105 shadow-sm"
            >
              <span>{lang === 'he' ? 'ביקור באתר החי (tiranlasry.com)' : 'Visit Live Site (tiranlasry.com)'}</span>
              <ArrowUpRight className="w-4 h-4 text-teal-400" />
            </a>

            {/* Viewport switch for preview */}
            <div className="hidden sm:flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                  deviceMode === 'desktop'
                    ? 'bg-teal-500 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Desktop View"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                  deviceMode === 'mobile'
                    ? 'bg-teal-500 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Mobile View"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Case Study Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl glow-card">
          {/* Details & Copy (Left / Right depending on RTL) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {caseStudy.headline}
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {caseStudy.overview}
            </p>

            {/* Key Highlights */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                {lang === 'he' ? 'דגשי הפיתוח והעיצוב:' : 'Key Engineering & Design Highlights:'}
              </h4>
              {caseStudy.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Testimonial Quote */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs sm:text-sm text-slate-300 italic border-l-4 border-l-teal-500">
              "{caseStudy.quote}"
              <div className="mt-2 text-xs font-semibold text-teal-400 not-italic">
                — {caseStudy.clientName}
              </div>
            </div>

            {/* CTA specific to this style */}
            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-teal-400 hover:text-teal-300 underline underline-offset-4"
              >
                <span>{caseStudy.cta}</span>
              </a>
            </div>
          </div>

          {/* Interactive Preview Mockup Window (Right / Left) */}
          <div className="lg:col-span-7 flex justify-center">
            <div
              className={`transition-all duration-300 ${
                deviceMode === 'mobile'
                  ? 'w-[320px] max-w-full'
                  : 'w-full'
              }`}
            >
              {/* Mockup Frame Header */}
              <div className="bg-slate-950 border border-slate-800 rounded-t-2xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/70 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500/70 inline-block"></span>
                </div>
                <div className="px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                  <span>https://tiranlasry.com</span>
                </div>
                <div className="text-[11px] text-teal-400 font-medium">0.8s load</div>
              </div>

              {/* Mockup Screen Content */}
              <div className="bg-[#121316] border-x border-b border-slate-800 rounded-b-2xl overflow-hidden relative shadow-2xl">
                {/* Visual Representation of Tiran Lasry */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden group bg-gradient-to-br from-stone-900 via-neutral-900 to-black">
                  {/* Real Tiran Lasry Brand Logo & Slogan Header */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between h-full relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15 inline-flex items-center gap-3">
                        <img
                          src="https://tiranlasry.com/images/Figma/Tiran_T_Grey_Logo.png"
                          alt="Tiran Lasry Logo"
                          className="h-7 w-auto object-contain filter invert"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <span className="text-white font-serif tracking-widest text-xs uppercase font-medium">TIRAN LASRY</span>
                      </div>
                      <span className="text-[11px] font-mono text-amber-300 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full">
                        Custom Lighting Studio
                      </span>
                    </div>

                    <div className="my-auto py-6">
                      <div className="mb-3 max-w-xs">
                        <img
                          src="https://tiranlasry.com/images/Figma/Tiran_lasry_slogen.png"
                          alt="Tiran Lasry Slogan"
                          className="h-10 sm:h-12 w-auto object-contain filter invert opacity-95"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-white mb-2 font-serif tracking-tight">
                        גופי תאורה אדריכליים בעבודת יד
                      </div>
                      <p className="text-xs sm:text-sm text-stone-300 max-w-lg leading-relaxed">
                        עיצוב וייצור גופי תאורה על-זמניים לאדריכלים ולמעצבי פנים. שילוב בין עץ טבעי, פליז ומתכות בעיבוד אישי, מותאם לחללים פרטיים ומסחריים.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-800">
                      <span className="text-[11px] px-3 py-1 rounded-full bg-stone-800 text-stone-200 border border-stone-700">
                        צמודי תקרה (Ceiling)
                      </span>
                      <span className="text-[11px] px-3 py-1 rounded-full bg-stone-800 text-stone-200 border border-stone-700">
                        גופי קיר (Wall)
                      </span>
                      <span className="text-[11px] px-3 py-1 rounded-full bg-stone-800 text-stone-200 border border-stone-700">
                        גופים תלויים (Pendant)
                      </span>
                      <span className="text-[11px] px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium">
                        הזמנות Tailor-Made
                      </span>
                    </div>
                  </div>
                </div>

                {/* Live Site Preview Overlay Pill */}
                <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>עסק פעיל: המזמרה 7, נס ציונה</span>
                  <a
                    href="https://tiranlasry.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1"
                  >
                    פתח אתר מלא <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
