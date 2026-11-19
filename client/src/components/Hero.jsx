import React, { useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Calculator } from 'lucide-react';
import gsap from 'gsap';
import HeroCanvasBackground from './HeroCanvasBackground';

export default function Hero({ content, lang }) {
  const isRtl = lang === 'he';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const heroRef = useRef(null);

  useEffect(() => {
    const root = heroRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const isMobile = window.innerWidth < 768;
      const yDist = isMobile ? 16 : 24;

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      tl.fromTo(
        '[data-hero="badge"]',
        { autoAlpha: 0, y: 12, scale: 0.96 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, clearProps: 'transform,opacity,visibility' }
      )
        .fromTo(
          '[data-hero="headline"]',
          { autoAlpha: 0, y: yDist },
          { autoAlpha: 1, y: 0, duration: 0.72, clearProps: 'transform,opacity,visibility' },
          '-=0.35'
        )
        .fromTo(
          '[data-hero="subheadline"]',
          { autoAlpha: 0, y: yDist - 4 },
          { autoAlpha: 1, y: 0, duration: 0.65, clearProps: 'transform,opacity,visibility' },
          '-=0.45'
        )
        .fromTo(
          '[data-hero="cta"]',
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.58, stagger: 0.08, clearProps: 'transform,opacity,visibility' },
          '-=0.42'
        )
        .fromTo(
          '[data-hero="stat"]',
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.58, stagger: 0.08, clearProps: 'transform,opacity,visibility' },
          '-=0.32'
        );

      // Refined numeric counter animations for "0.8s" and "100%"
      const statValues = root.querySelectorAll('[data-stat-value]');
      statValues.forEach((el) => {
        const raw = el.getAttribute('data-stat-value') || '';
        const match = raw.match(/^(\d+(?:\.\d+)?)(.*)$/);
        if (!match) return;

        const target = parseFloat(match[1]);
        const suffix = match[2] || '';
        const decimals = match[1].includes('.') ? match[1].split('.')[1].length : 0;
        const counter = { val: 0 };

        gsap.to(counter, {
          val: target,
          duration: 1.15,
          delay: 0.45,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${counter.val.toFixed(decimals)}${suffix}`;
          }
        });
      });

      // Gentle ambient drift on radial glow orbs
      gsap.to('[data-hero="glow-1"]', {
        y: 18,
        x: 12,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      gsap.to('[data-hero="glow-2"]', {
        y: -16,
        x: -10,
        duration: 8.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, root);

    return () => mm.revert();
  }, [lang]);

  return (
    <section ref={heroRef} className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Lightweight Interactive Canvas Constellation Background */}
      <HeroCanvasBackground />

      {/* Background radial glows and grid pattern */}
      <div
        data-hero="glow-1"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none -z-10"
      />
      <div
        data-hero="glow-2"
        className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none -z-10"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Availability Status Badge */}
          <div
            data-hero="badge"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs sm:text-sm font-medium mb-8 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            <span>{content.hero.badge}</span>
          </div>

          {/* Main Headline */}
          <h1
            data-hero="headline"
            className="text-3xl sm:text-5xl lg:text-6xl font-bold font-hebrew text-white leading-tight mb-6"
          >
            <span>{content.hero.headlineStart} </span>
            <span className="bg-gradient-to-r from-teal-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
              {content.hero.headlineAccent}
            </span>
            {content.hero.headlineEnd ? <span> {content.hero.headlineEnd}</span> : null}
          </h1>

          {/* Subheadline */}
          <p
            data-hero="subheadline"
            className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto mb-10"
          >
            {content.hero.subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a
              data-hero="cta"
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 text-white font-semibold text-sm sm:text-base shadow-xl shadow-teal-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <span>{content.hero.ctaPrimary}</span>
              <ArrowIcon className="w-4 h-4" />
            </a>

            <a
              data-hero="cta"
              href="#case-study"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/70 font-medium text-sm sm:text-base transition-all hover:border-teal-500/40 active:scale-95"
            >
              <ExternalLink className="w-4 h-4 text-teal-400" />
              <span>{content.hero.ctaSecondary}</span>
            </a>

            <a
              data-hero="cta"
              href="#pricing"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/40 hover:bg-slate-800/80 text-teal-300 border border-teal-500/20 text-xs sm:text-sm font-medium transition-all active:scale-95"
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
                data-hero="stat"
                className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm hover:border-teal-500/30 transition-all hover:-translate-y-1"
              >
                <div
                  data-stat-value={stat.value}
                  className="text-2xl sm:text-3xl font-extrabold text-teal-400 mb-1 font-mono tracking-tight"
                >
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
