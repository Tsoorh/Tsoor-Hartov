import React, { useState } from 'react';
import { Share2, Instagram, Facebook, Linkedin, MessageCircle, Sparkles, Check, ArrowUpRight } from 'lucide-react';

export default function SocialMarketingPreview({ content, lang }) {
  const { socialMarketing } = content;
  const isRtl = lang === 'he';

  const [activePlatform, setActivePlatform] = useState('instagram');

  return (
    <section id="social-kit" dir={isRtl ? 'rtl' : 'ltr'} className="py-24 bg-[#0a0e18] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-3">
            <Share2 className="w-3.5 h-3.5" />
            <span>{isRtl ? 'שיווק ממומן ואורגני ברשתות' : 'Built for Social Advertising'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            {socialMarketing.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {socialMarketing.subtitle}
          </p>
        </div>

        {/* 4 Pillars of Social Optimization */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {socialMarketing.channels.map((chan, i) => (
            <div
              key={i}
              dir={isRtl ? 'rtl' : 'ltr'}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-sm font-bold text-white ${isRtl ? 'text-right' : 'text-left'}`}>
                    {chan.name}
                  </span>
                  <span
                    dir="ltr"
                    className="text-[10px] font-mono text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/30 text-left shrink-0 inline-flex items-center tracking-normal whitespace-nowrap"
                  >
                    {chan.badge}
                  </span>
                </div>
                <p className={`text-xs sm:text-sm text-slate-300 leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`}>
                  {chan.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Social Media Previewer */}
        <div className="max-w-4xl mx-auto bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {socialMarketing.previewTitle}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {isRtl
                  ? 'בחרו פלטפורמה כדי לראות את התצוגה המקדימה העשירה (OpenGraph / Share Card):'
                  : 'Select a platform to preview the rich OpenGraph share card:'}
              </p>
            </div>

            {/* Platform Switcher */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActivePlatform('instagram')}
                className={`p-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  activePlatform === 'instagram'
                    ? 'bg-pink-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Instagram className="w-4 h-4" />
                <span className="hidden sm:inline">Instagram</span>
              </button>
              <button
                onClick={() => setActivePlatform('whatsapp')}
                className={`p-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  activePlatform === 'whatsapp'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </button>
              <button
                onClick={() => setActivePlatform('facebook')}
                className={`p-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  activePlatform === 'facebook'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Facebook className="w-4 h-4" />
                <span className="hidden sm:inline">Facebook</span>
              </button>
              <button
                onClick={() => setActivePlatform('linkedin')}
                className={`p-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  activePlatform === 'linkedin'
                    ? 'bg-sky-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Linkedin className="w-4 h-4" />
                <span className="hidden sm:inline">LinkedIn</span>
              </button>
            </div>
          </div>

          {/* Render Preview Card based on Platform */}
          <div className="flex justify-center">
            {activePlatform === 'instagram' && (
              <div className="w-full max-w-md bg-black border border-slate-800 rounded-3xl p-4 shadow-2xl text-slate-100 font-sans">
                {/* Simulated Instagram Post / Story Card */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 p-[2px]">
                      <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center font-bold text-xs text-white">
                        TS
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-tight">tsoor.hartov</div>
                      <div className="text-[10px] text-slate-400">Sponsored • Sponsored Ads</div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">•••</span>
                </div>

                <div className="rounded-2xl overflow-hidden border border-slate-800 relative aspect-video mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"
                    alt="Instagram Ad Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                    <div className="text-xs font-bold text-white">
                      פרויקט טירן לסרי - מותג תאורה יוקרתי
                    </div>
                  </div>
                </div>

                <div className="p-2 bg-slate-900/90 rounded-xl flex items-center justify-between border border-slate-800">
                  <div className={isRtl ? 'text-right' : 'text-left'}>
                    <div dir="ltr" className="text-[11px] text-teal-400 font-mono text-left">tsoorhartov.com</div>
                    <div className="text-xs font-bold text-white">רוצים אתר שמוכר לעסק שלכם?</div>
                  </div>
                  <span dir="ltr" className="px-3 py-1 rounded-lg bg-teal-500 text-white text-xs font-bold shrink-0 text-left">
                    Learn More
                  </span>
                </div>
              </div>
            )}

            {activePlatform === 'whatsapp' && (
              <div className="w-full max-w-md bg-[#0b141a] border border-slate-800 rounded-3xl p-5 shadow-2xl text-slate-100 font-sans">
                <div className="text-xs text-emerald-400 font-semibold mb-2 flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4" />
                  <span>כרטיס שיתוף ב-WhatsApp:</span>
                </div>
                <div className="bg-[#1f2c34] rounded-2xl overflow-hidden border border-slate-700/60 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                    alt="WhatsApp Share Card"
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-3.5">
                    <div dir="ltr" className="text-[11px] text-teal-400 font-mono text-left">tsoorhartov.com</div>
                    <div className={`text-sm font-bold text-white mt-0.5 ${isRtl ? 'text-right' : 'text-left'}`}>
                      צור הרטוב | אתרי פרימיום ואוטומציות לעסקים
                    </div>
                    <p className={`text-xs text-slate-300 mt-1 line-clamp-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                      בניית אתרי קאסטום פרימיום לעסקים, כלים דיגיטליים, וחיבור ישיר לוואטסאפ ולמערכות ניהול.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activePlatform === 'facebook' && (
              <div className="w-full max-w-md bg-[#18191a] border border-slate-800 rounded-2xl p-4 shadow-2xl text-slate-100 font-sans">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs text-white">
                    TS
                  </div>
                  <div>
                    <div className="text-xs font-bold">צור הרטוב - פיתוח אתרים ואוטומציות</div>
                    <div className="text-[10px] text-slate-400">Sponsored • 🌐</div>
                  </div>
                </div>
                <div className={`text-xs text-slate-200 mb-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                  עסקים קטנים ובינוניים: הגיע הזמן לעבור את תקרת הזכוכית של אתרים כבדים. אתר קאסטום מהיר ב-0.8 שניות שמחובר ישירות לוואטסאפ שלכם.
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-[#242526]">
                  <img
                    src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"
                    alt="Facebook Feed Ad"
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-3 flex items-center justify-between">
                    <div className={isRtl ? 'text-right' : 'text-left'}>
                      <div dir="ltr" className="text-[10px] uppercase text-teal-400 font-mono text-left">tsoorhartov.com</div>
                      <div className="text-xs font-bold text-white">אתרי פרימיום מותאמים אישית לעסקים</div>
                    </div>
                    <span className="px-3 py-1 bg-slate-700 text-white rounded text-xs font-bold shrink-0">
                      הודעה
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activePlatform === 'linkedin' && (
              <div className="w-full max-w-md bg-[#1b1f23] border border-slate-800 rounded-2xl p-4 shadow-2xl text-slate-100 font-sans">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-full bg-sky-600 flex items-center justify-center font-bold text-xs text-white">
                    TS
                  </div>
                  <div>
                    <div className="text-xs font-bold">צור הרטוב | Full-Stack Architect</div>
                    <div dir="ltr" className="text-[10px] text-slate-400 text-left">Senior Web Architect & Business Systems Specialist</div>
                  </div>
                </div>
                <div dir="ltr" className="text-xs text-slate-200 mb-2 text-left">
                  How high-speed React architecture and custom lead automations increase conversion rates for Israeli SMBs by over 140%.
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-[#24292e]">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                    alt="LinkedIn Post Card"
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-3">
                    <div dir="ltr" className="text-xs font-bold text-white text-left">
                      Bespoke Web Platforms & Custom Automation Engines for Growing Businesses
                    </div>
                    <div dir="ltr" className="text-[10px] text-teal-400 mt-0.5 text-left font-mono">tsoorhartov.com • 3 min read</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
