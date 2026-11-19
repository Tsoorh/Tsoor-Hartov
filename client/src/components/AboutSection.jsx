import React from 'react';
import { GraduationCap, Award, Server, Truck, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function AboutSection({ content, lang }) {
  const { about } = content;
  const isRtl = lang === 'he';

  const badgeIcons = [
    GraduationCap,
    Award,
    Server,
    Truck
  ];

  return (
    <section id="about" className="py-24 bg-[#0a0d15] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Profile Card & Credential Badges */}
          <div data-animate="fade-up" className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-2xl backdrop-blur-xl relative overflow-hidden glow-card">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Profile Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-teal-500 via-sky-500 to-indigo-600 p-[2px] shadow-lg shadow-teal-500/20">
                  <div className="w-full h-full rounded-2xl bg-slate-950 flex flex-col items-center justify-center text-white">
                    <span className="text-2xl font-black tracking-tight">TS</span>
                    <span className="text-[9px] font-mono text-teal-400 uppercase">DEV</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-white">
                    {lang === 'he' ? 'צור הרטוב' : 'Tsoor Hartov'}
                  </h3>
                  <p className="text-xs font-semibold text-teal-400">
                    {lang === 'he' ? 'מומחה מערכות מידע • ארכיטקט ומפתח Full-Stack' : 'Information Systems Expert • Web & Systems Architect'}
                  </p>
                  <div className="inline-flex items-center gap-1 mt-1 text-[11px] text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                    <span>{lang === 'he' ? 'זמין לפרויקטים חדשים' : 'Accepting new projects'}</span>
                  </div>
                </div>
              </div>

              {/* 4 Core Pillars of Tsoor's Expertise */}
              <div className="space-y-3 pt-2">
                {about.badgesList.map((badge, idx) => {
                  const Icon = badgeIcons[idx] || Sparkles;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3 hover:border-teal-500/40 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">
                          {badge.title}
                        </div>
                        <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                          {badge.subtitle}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 text-center">
                <span className="text-xs text-slate-400">
                  {lang === 'he' ? 'פיתוח אתרי פרימיום, כלים דיגיטליים ומערכות לעסקים' : 'Engineering bespoke websites, digital tools & business systems'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Why this matters for SMBs */}
          <div data-animate="fade-up" className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              {about.title}
            </h2>

            <p className="text-sm sm:text-base text-teal-300/90 font-medium leading-relaxed">
              {about.tagline}
            </p>

            <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {about.story.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Core Values Grid */}
            <div data-animate-stagger className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {about.values.map((val, idx) => (
                <div
                  key={idx}
                  data-animate-item
                  className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-teal-500/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      {val.label}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
