import React from 'react';
import { XCircle, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

export default function ValueProps({ content, lang }) {
  const { problemSolution } = content;

  return (
    <section className="py-20 bg-[#0d121f] border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
            {problemSolution.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {problemSolution.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Common Problems Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-red-950/20 border border-red-500/20 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-200">
                    {lang === 'he' ? 'אתרים סטנדרטיים בשוק (סוכנויות ותבניות מדף)' : 'Standard Market Templates & Agencies'}
                  </h3>
                  <p className="text-xs text-red-300/70">
                    {lang === 'he' ? 'למה רוב בעלי העסקים מתאכזבים בסוף' : 'Why most business owners end up frustrated'}
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {problemSolution.problems.map((prob, i) => (
                  <div key={i} className="flex items-start gap-3.5">
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-slate-200 mb-1">
                        {prob.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {prob.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-red-500/20 text-xs text-red-400/80 italic">
              {lang === 'he' ? 'תוצאה: השקעתם אלפי שקלים, והטלפון עדיין לא מצלצל.' : 'Result: Thousands spent, zero real phone calls.'}
            </div>
          </div>

          {/* Tsoor's Solution Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-teal-950/25 border border-teal-500/30 relative overflow-hidden flex flex-col justify-between shadow-xl shadow-teal-950/40">
            <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-teal-200">
                    {lang === 'he' ? 'הפיתוח' : 'Bespoke Engineering'}
                  </h3>
                  <p className="text-xs text-teal-300/80">
                    {lang === 'he' ? 'אתרים שנבנים במיוחד להמרת קמפיינים וסגירת עסקאות' : 'Engineered specifically for conversions & sales'}
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {problemSolution.solutions.map((sol, i) => (
                  <div key={i} className="flex items-start gap-3.5">
                    <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-white mb-1">
                        {sol.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {sol.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-teal-500/30 text-xs text-teal-300 font-medium">
              {lang === 'he' ? 'תוצאה: אתר שמשדר יוקרה מיידית ומזרים פניות ישר ל-WhatsApp.' : 'Result: Instant luxury authority and hot leads directly to your WhatsApp.'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
