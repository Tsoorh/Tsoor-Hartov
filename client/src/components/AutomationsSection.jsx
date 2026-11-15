import React, { useState } from 'react';
import { Zap, MessageSquare, Database, Receipt, Smartphone, CheckCircle2, Play, Check } from 'lucide-react';

export default function AutomationsSection({ content, lang }) {
  const { automationsFlow } = content;
  const isRtl = lang === 'he';

  const [simulationActive, setSimulationActive] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const runSimulation = () => {
    if (simulationActive) return;
    setSimulationActive(true);
    setActiveStep(1);

    setTimeout(() => setActiveStep(2), 1200);
    setTimeout(() => setActiveStep(3), 2400);
    setTimeout(() => setActiveStep(4), 3600);
    setTimeout(() => {
      setSimulationActive(false);
    }, 4800);
  };

  const stepIcons = [
    Smartphone,
    MessageSquare,
    Zap,
    Database
  ];

  return (
    <section id="automations" className="py-24 bg-[#0a0d15] border-y border-slate-800/80 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>{isRtl ? 'אוטומציות ומערכות מותאמות אישית' : 'Custom Automations & Systems'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            {automationsFlow.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {automationsFlow.subtitle}
          </p>

          {/* Interactive Simulation Button */}
          <div className="mt-6">
            <button
              onClick={runSimulation}
              disabled={simulationActive}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                simulationActive
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 cursor-wait'
                  : 'bg-teal-500 hover:bg-teal-400 text-white shadow-lg shadow-teal-500/25 hover:scale-105'
              }`}
            >
              {simulationActive ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
                  <span>{isRtl ? 'הדמיית אוטומציה בפעולה...' : 'Simulation Running...'}</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isRtl ? 'לחצו להדמיית זרימת אוטומציה חיה' : 'Click to Simulate Live Automation Flow'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 4-Step Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {automationsFlow.steps.map((st, idx) => {
            const Icon = stepIcons[idx] || Zap;
            const stepNumber = idx + 1;
            const isHighlighted = simulationActive && activeStep === stepNumber;
            const isCompleted = simulationActive && activeStep > stepNumber;

            return (
              <div
                key={idx}
                className={`p-6 rounded-3xl border transition-all duration-500 relative flex flex-col justify-between ${
                  isHighlighted
                    ? 'bg-teal-950/40 border-teal-400 shadow-xl shadow-teal-500/30 scale-105 -translate-y-2'
                    : isCompleted
                    ? 'bg-slate-900/80 border-teal-500/40'
                    : 'bg-slate-900/50 border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                        isHighlighted || isCompleted
                          ? 'bg-teal-500 text-white'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`font-mono text-xs font-bold px-2.5 py-1 rounded-full ${
                        isHighlighted || isCompleted
                          ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      שלב {st.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {st.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                {isHighlighted && (
                  <div className="mt-4 pt-3 border-t border-teal-500/30 text-[11px] font-semibold text-teal-300 flex items-center gap-1.5 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                    <span>{isRtl ? 'פעולה מתבצעת כעת אוטומטית...' : 'Action executing automatically...'}</span>
                  </div>
                )}
                {isCompleted && (
                  <div className="mt-4 pt-3 border-t border-teal-500/30 text-[11px] font-semibold text-teal-400 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>{isRtl ? 'הושלם ב-0.2 שניות' : 'Completed in 0.2s'}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional Systems Mention */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-start">
            <h4 className="text-base sm:text-lg font-bold text-white">
              {isRtl ? 'צריכים מערכת פנים מותאמת אישית לעסק?' : 'Need a custom internal business system?'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              {isRtl
                ? 'פיתוח דשבורדים, מערכות ניהול לקוחות, התממשקות ל-Monday, חשבונית ירוקה/מורנינג, סליקת אשראי והתראות SMS.'
                : 'Custom dashboards, CRM synchronization, automated invoicing, payment webhooks, and SMS triggers.'}
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs sm:text-sm font-semibold border border-slate-700 transition-all hover:scale-105"
          >
            {isRtl ? 'ספרו לי על המערכת שלכם' : 'Tell me about your system'}
          </a>
        </div>
      </div>
    </section>
  );
}
