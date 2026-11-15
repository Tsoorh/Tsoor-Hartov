import React from 'react';
import { Laptop, Sliders, Zap, ShieldCheck, Smartphone, Globe, ArrowRight, ArrowLeft } from 'lucide-react';

export default function ServicesGrid({ content, lang }) {
  const { services } = content;
  const isRtl = lang === 'he';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const iconMap = {
    Laptop: Laptop,
    Smartphone: Smartphone,
    Sliders: Sliders,
    Zap: Zap,
    ShieldCheck: ShieldCheck,
    Globe: Globe
  };

  return (
    <section id="services" className="py-24 bg-[#0b0f19] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            {services.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.list.map((srv) => {
            const Icon = iconMap[srv.icon] || Laptop;
            return (
              <div
                key={srv.id}
                className="group p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-teal-500/40 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between glow-card"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl group-hover:bg-teal-500/10 transition-colors pointer-events-none" />

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-teal-300 transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                    {srv.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-teal-400 group-hover:text-teal-300"
                  >
                    <span>{isRtl ? 'התייעץ לגבי שירות זה' : 'Inquire about this service'}</span>
                    <ArrowIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <span className="text-[11px] text-slate-400 font-mono">
                    {srv.id === 'custom-web' && (isRtl ? '100% קאסטום React' : '100% Custom React')}
                    {srv.id === 'business-tools' && (isRtl ? 'מחשבונים וכלים' : 'Calculators & Tools')}
                    {srv.id === 'domain-emails' && (isRtl ? 'Google Workspace' : 'Google Workspace')}
                    {srv.id === 'automations-systems' && (isRtl ? 'WhatsApp & CRM' : 'WhatsApp & CRM')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
