import React from 'react';
import { Award, GraduationCap, Server, Briefcase, Truck } from 'lucide-react';

export default function CredentialsRibbon({ content, lang }) {
  const isRtl = lang === 'he';

  const icons = [
    GraduationCap,
    Award,
    Server,
    Briefcase,
    Truck
  ];

  return (
    <div className="border-y border-slate-800/80 bg-slate-950/70 py-4 backdrop-blur-md relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-4 sm:gap-6 text-center">
          {content.credentialsBar.map((item, idx) => {
            const Icon = icons[idx] || Award;
            return (
              <div
                key={idx}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/30 transition-all hover:scale-105"
              >
                <div className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="text-start">
                  <div className="text-xs font-bold text-white leading-tight">
                    {item.label}
                  </div>
                  <div className="text-[10px] text-teal-300/80 font-mono">
                    {item.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
