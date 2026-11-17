import React from 'react';
import { ArrowLeft, ArrowRight, Zap, ExternalLink, Calculator, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Hero({ content, lang }) {
  const isRtl = lang === 'he';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background radial glows and grid pattern */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs sm:text-sm font-medium mb-8 animate-pulse shadow-sm">
            <span className="w-2 h-2 rounded-full bg-teal-400"></span>
            <span>{content.hero.badge}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-hebrew text-white leading-tight mb-6">
            <span>{content.hero.headlineStart} </span>
            <span className="bg-gradient-to-r from-teal-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
              {content.hero.headlineAccent}
            </span>{' '}
            <span>{content.hero.headlineEnd}</span>
          </h1>

          {/* Subheadline with Tsoor's personal identity */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto mb-10">
            {content.hero.subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 text-white font-semibold text-sm sm:text-base shadow-xl shadow-teal-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <span>{content.hero.ctaPrimary}</span>
              <ArrowIcon className="w-4 h-4" />
            </a>

            <a
              href="#case-study"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/70 font-medium text-sm sm:text-base transition-all hover:border-teal-500/40"
            >
              <ExternalLink className="w-4 h-4 text-teal-400" />
              <span>{content.hero.ctaSecondary}</span>
            </a>

            <a
              href="#pricing"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/40 hover:bg-slate-800/80 text-teal-300 border border-teal-500/20 text-xs sm:text-sm font-medium transition-all"
            >
              <Calculator className="w-4 h-4" />
              <span>{content.hero.ctaEstimate}</span>
            </a>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-start">
            {content.hero.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm hover:border-teal-500/30 transition-all hover:-translate-y-1"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-teal-400 mb-1 font-mono tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-400 leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
