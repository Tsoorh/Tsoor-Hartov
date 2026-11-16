import React, { useState } from 'react';
import { ExternalLink, Check, Smartphone, Monitor, Sparkles, ArrowUpRight, Globe, Layout } from 'lucide-react';

export default function CaseStudyTiran({ content, lang }) {
  const { caseStudy } = content;
  const isRtl = lang === 'he';
  const [deviceMode, setDeviceMode] = useState('desktop'); // desktop or mobile
  const [viewType, setViewType] = useState('showcase'); // 'showcase' (authentic design) or 'live' (live iframe)

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

          <div className="flex flex-wrap items-center gap-3">
            {/* Live site link */}
            <a
              href={caseStudy.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold border border-slate-700 transition-all hover:scale-105 shadow-sm"
            >
              <span>{isRtl ? 'ביקור באתר החי (tiranlasry.com)' : 'Visit Live Site (tiranlasry.com)'}</span>
              <ArrowUpRight className="w-4 h-4 text-teal-400" />
            </a>

            {/* Viewport switch for preview */}
            <div
              role="group"
              aria-label={isRtl ? 'בחירת תצוגת מסך' : 'Device Preview Mode'}
              className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1"
            >
              <button
                onClick={() => setDeviceMode('desktop')}
                aria-label={isRtl ? 'תצוגת מחשב' : 'Desktop View'}
                aria-pressed={deviceMode === 'desktop'}
                className={`p-1.5 rounded-lg text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none ${
                  deviceMode === 'desktop'
                    ? 'bg-teal-500 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={isRtl ? 'תצוגת מחשב' : 'Desktop View'}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceMode('mobile')}
                aria-label={isRtl ? 'תצוגת מובייל' : 'Mobile View'}
                aria-pressed={deviceMode === 'mobile'}
                className={`p-1.5 rounded-lg text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none ${
                  deviceMode === 'mobile'
                    ? 'bg-teal-500 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={isRtl ? 'תצוגת מובייל' : 'Mobile View'}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Case Study Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl glow-card">
          {/* Details & Copy */}
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
                {isRtl ? 'דגשי הפיתוח והעיצוב:' : 'Key Engineering & Design Highlights:'}
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
                - {caseStudy.clientName}
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

          {/* Authentic Interactive Preview Mockup Window */}
          <div className="lg:col-span-7 flex justify-center w-full">
            <div
              className={`transition-all duration-300 w-full ${
                deviceMode === 'mobile' ? 'max-w-[340px]' : 'max-w-full'
              }`}
            >
              {/* Mockup Frame Header */}
              <div className="bg-slate-950 border border-slate-800 rounded-t-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
                </div>

                {/* Clickable URL Bar */}
                <a
                  href="https://tiranlasry.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-md bg-slate-900 hover:bg-slate-850 border border-slate-800 text-[11px] font-mono text-slate-300 hover:text-teal-300 flex items-center gap-1.5 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping"></span>
                  <span>https://tiranlasry.com</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>

                {/* View Type Toggle (Showcase vs Live Iframe) */}
                <div
                  role="group"
                  aria-label={isRtl ? 'סוג תצוגה' : 'View Mode'}
                  className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-[10px]"
                >
                  <button
                    onClick={() => setViewType('showcase')}
                    aria-pressed={viewType === 'showcase'}
                    aria-label={isRtl ? 'תצוגת גלריה' : 'Showcase View'}
                    className={`px-2 py-1 rounded-md font-semibold transition-all flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none ${
                      viewType === 'showcase'
                        ? 'bg-teal-500 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Layout className="w-3 h-3" />
                    <span>{isRtl ? 'תצוגת גלריה' : 'Showcase'}</span>
                  </button>
                  <button
                    onClick={() => setViewType('live')}
                    aria-pressed={viewType === 'live'}
                    aria-label={isRtl ? 'אתר חי אינטראקטיבי' : 'Live Iframe View'}
                    className={`px-2 py-1 rounded-md font-semibold transition-all flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none ${
                      viewType === 'live'
                        ? 'bg-teal-500 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Globe className="w-3 h-3" />
                    <span>{isRtl ? 'אתר חי אינטראקטיבי' : 'Live Iframe'}</span>
                  </button>
                </div>
              </div>

              {/* Mockup Screen Content */}
              <div className="border-x border-b border-slate-800 rounded-b-2xl overflow-hidden shadow-2xl bg-[#FAF8F5]">
                {viewType === 'live' ? (
                  /* Option A: Embedded Live Iframe */
                  <div className="relative w-full h-[480px] sm:h-[540px] bg-[#FAF8F5]">
                    <iframe
                      src="https://tiranlasry.com"
                      title="Tiran Lasry Official Website"
                      className="w-full h-full border-0"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  /* Option B: Authentic Recreation of Tiran Lasry Design */
                  <div className="w-full text-[#1e1c19] font-sans select-none overflow-hidden flex flex-col">
                    {/* Real Tiran Lasry Navbar */}
                    <div className="bg-[#FAF8F5] border-b border-[#e7e3dc] px-4 sm:px-6 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://tiranlasry.com/images/Figma/Tiran_T_Grey_Logo.png"
                          alt="Tiran Lasry"
                          className="h-6 w-auto object-contain"
                        />
                        <span className="font-serif tracking-widest text-xs uppercase font-semibold text-[#1e1c19]">
                          TIRAN LASRY
                        </span>
                      </div>
                      <div className="hidden sm:flex items-center gap-4 text-[11px] font-medium text-[#4a4742]">
                        <span className="hover:text-black cursor-pointer">צמודי תקרה</span>
                        <span className="hover:text-black cursor-pointer">גופי קיר</span>
                        <span className="hover:text-black cursor-pointer">תלויים</span>
                        <span className="hover:text-black cursor-pointer">אודות</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#8a857d] border border-[#dcd7ce] px-2 py-0.5 rounded">
                        EN | עב
                      </span>
                    </div>

                    {/* Real Hero Showcase Banner */}
                    <div className="relative h-56 sm:h-64 overflow-hidden group">
                      <img
                        src="https://tiranlasry.com/images/Figma/Living_room.png"
                        alt="Tiran Lasry Living Room Architectural Lighting"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-5 sm:p-6 text-white text-start">
                        <div className="mb-2 max-w-[200px] sm:max-w-[240px]">
                          <img
                            src="https://tiranlasry.com/images/Figma/bright_logo_horizontal.png"
                            alt="Tiran Lasry Emblem"
                            className="w-full h-auto object-contain filter drop-shadow-md"
                          />
                        </div>
                        <p className="text-xs sm:text-sm text-stone-200 max-w-md leading-relaxed drop-shadow">
                          עיצוב וייצור גופי תאורה אדריכליים בעבודת יד לאדריכלים ולמעצבי פנים.
                        </p>
                      </div>
                    </div>

                    {/* Real Category Showcase: 3 Authentic Photo Cards */}
                    <div className="p-4 sm:p-5 bg-[#FAF8F5]">
                      <div className="text-[11px] uppercase tracking-wider font-bold text-[#8a857d] mb-3">
                        קטלוג קטגוריות ראשי:
                      </div>
                      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                        {/* 1. Ceiling */}
                        <a
                          href="https://tiranlasry.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative rounded-xl overflow-hidden aspect-[4/5] bg-stone-200 border border-[#e7e3dc] shadow-sm flex flex-col justify-end p-2.5"
                        >
                          <img
                            src="https://tiranlasry.com/images/Figma/CAT_CEILING.jpg"
                            alt="צמודי תקרה"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                          <span className="relative text-[10px] sm:text-xs font-bold text-white leading-tight">
                            צמודי תקרה
                          </span>
                        </a>

                        {/* 2. Wall */}
                        <a
                          href="https://tiranlasry.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative rounded-xl overflow-hidden aspect-[4/5] bg-stone-200 border border-[#e7e3dc] shadow-sm flex flex-col justify-end p-2.5"
                        >
                          <img
                            src="https://tiranlasry.com/images/Figma/CAT_WALL.jpg"
                            alt="גופי קיר"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                          <span className="relative text-[10px] sm:text-xs font-bold text-white leading-tight">
                            גופי קיר
                          </span>
                        </a>

                        {/* 3. Pendant */}
                        <a
                          href="https://tiranlasry.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative rounded-xl overflow-hidden aspect-[4/5] bg-stone-200 border border-[#e7e3dc] shadow-sm flex flex-col justify-end p-2.5"
                        >
                          <img
                            src="https://tiranlasry.com/images/Figma/CAT_PENDANT.jpg"
                            alt="גופים תלויים"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                          <span className="relative text-[10px] sm:text-xs font-bold text-white leading-tight">
                            תלויים
                          </span>
                        </a>
                      </div>
                    </div>

                    {/* Bottom Status & Attribution Bar */}
                    <div className="px-4 py-2.5 bg-[#f2eee9] border-t border-[#e2ddd5] flex items-center justify-between text-[11px] text-[#6d6962]">
                      <span className="truncate">סטודיו פעיל: המזמרה 7, נס ציונה</span>
                      <a
                        href="https://tiranlasry.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#966b3b] hover:text-[#7a542b] font-bold flex items-center gap-1 shrink-0"
                      >
                        מעבר לאתר המלא ↗
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
