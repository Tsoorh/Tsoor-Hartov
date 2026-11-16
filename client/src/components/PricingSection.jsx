import React, { useState } from 'react';
import { Check, ShieldCheck, Sparkles, Plus, Calculator, ArrowRight, ArrowLeft, Clock, Zap, FileCode, CheckCircle2 } from 'lucide-react';

export default function PricingSection({ content, lang, onSelectPackage }) {
  const { pricing } = content;
  const isRtl = lang === 'he';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // View Mode: 'transparent' or 'custom'
  const [viewMode, setViewMode] = useState('transparent');

  // Interactive Add-ons Calculator state
  const addons = [
    {
      id: 'business-tools',
      name: isRtl ? 'מחשבוני הצעות מחיר וכלים דיגיטליים אינטראקטיביים' : 'Interactive Quote Calculators & Digital Business Tools',
      desc: isRtl ? 'בניית מחשבונים ייעודיים לעסק שלך (עלויות, אפיון פרויקט, שאלון סינון חכם) המזרימים לידים בשלים' : 'Custom quote engines and interactive project scoping quizzes',
      setupILS: 2500,
      monthlyILS: 150
    },
    {
      id: 'lead-alerts',
      name: isRtl ? 'התראות לידים מיידיות לוואטסאפ ולמייל' : 'Instant Lead Alerts to WhatsApp & Email',
      desc: isRtl ? 'קבלת הודעת WhatsApp מיידית לנייד עם כל פרטי הליד והצרכים שלו תוך 5 שניות' : 'Immediate WhatsApp ping with lead details and requirements within 5 seconds',
      setupILS: 1500,
      monthlyILS: 100
    },
    {
      id: 'crm-sync',
      name: isRtl ? 'חיבור CRM מלא (Monday / Airtable)' : 'CRM Sync (Monday / HubSpot / Airtable)',
      desc: isRtl ? 'סנכרון נתונים אוטומטי של כל ליד ומעקב סטטוס' : 'Direct sync of customer leads into your CRM database',
      setupILS: 2000,
      monthlyILS: 150
    },
    {
      id: 'invoicing',
      name: isRtl ? 'סליקת אשראי והפקת חשבונית אוטומטית' : 'Automated Invoicing & Payments',
      desc: isRtl ? 'חיבור למורנינג/חשבונית ירוקה ומשולם ישירות' : 'Auto-invoicing with Morning/Green Invoice webhooks',
      setupILS: 2200,
      monthlyILS: 100
    },
    {
      id: 'multilingual',
      name: isRtl ? 'אתר דו-לשוני מלא (עברית ואנגלית)' : 'Full Bilingual Setup (Hebrew & English)',
      desc: isRtl ? 'ממשק RTL ו-LTR מלא עם מתג שפות מהיר' : 'Full RTL and LTR support with instant language switch',
      setupILS: 2800,
      monthlyILS: 100
    },
    {
      id: 'domain-emails',
      name: isRtl ? 'דומיין מותאם ותיבות דוא״ל עסקיות יוקרתיות' : 'Custom Domain & Executive Business Inboxes',
      desc: isRtl ? 'רישום דומיין (.co.il / .com), הגדרת תיבות מייל ב-Google Workspace / 365, חתימות מעוצבות ואבטחת SPF/DKIM' : 'Domain registration, branded business inboxes (Google Workspace/365), custom signature & SPF/DKIM security',
      setupILS: 1200,
      monthlyILS: 80
    }
  ];

  const [selectedAddons, setSelectedAddons] = useState([]);

  const toggleAddon = (id) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((item) => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const baseSetup = 10000;
  const baseMonthly = 800;

  const totalAddonSetup = selectedAddons.reduce((sum, id) => {
    const addon = addons.find((a) => a.id === id);
    return sum + (addon ? addon.setupILS : 0);
  }, 0);

  const totalAddonMonthly = selectedAddons.reduce((sum, id) => {
    const addon = addons.find((a) => a.id === id);
    return sum + (addon ? addon.monthlyILS : 0);
  }, 0);

  const finalSetup = baseSetup + totalAddonSetup;
  const finalMonthly = baseMonthly + totalAddonMonthly;

  return (
    <section id="pricing" className="py-24 bg-[#0b0f19] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isRtl ? 'שקיפות מלאה ללא כבילה' : '100% Transparency & No Lock-In'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            {pricing.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {pricing.subtitle}
          </p>

          {/* Toggle between Transparent Plans and Custom Estimator */}
          <div
            role="tablist"
            aria-label={isRtl ? 'בחירת תצוגת מחירים' : 'Pricing View Selection'}
            className="mt-8 inline-flex items-center p-1 bg-slate-900 border border-slate-800 rounded-2xl shadow-inner"
          >
            <button
              role="tab"
              aria-selected={viewMode === 'transparent'}
              onClick={() => setViewMode('transparent')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none ${
                viewMode === 'transparent'
                  ? 'bg-gradient-to-r from-teal-500 to-sky-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {pricing.viewTransparent}
            </button>
            <button
              role="tab"
              aria-selected={viewMode === 'custom'}
              onClick={() => setViewMode('custom')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none ${
                viewMode === 'custom'
                  ? 'bg-gradient-to-r from-teal-500 to-sky-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>{pricing.viewCustom}</span>
            </button>
          </div>
        </div>

        {/* View 1: Standard Transparent Plans (10K Setup + 450 vs 800 Retainer) */}
        {viewMode === 'transparent' && (
          <div className="max-w-5xl mx-auto space-y-10">
            {/* 1. Setup Card */}
            <div className="relative rounded-3xl bg-slate-900/80 border border-slate-800 p-8 sm:p-10 shadow-2xl backdrop-blur-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 px-3 py-1 rounded-md mb-2">
                    <FileCode className="w-3.5 h-3.5" />
                    <span>{pricing.setupHeader}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {isRtl ? 'פיתוח אתר מותאם אישית מאפס' : '100% Custom Platform Architecture'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                    {isRtl
                      ? 'הקמת נכס דיגיטלי ב-React & Node.js, ללא מערכות סגורות ותוספים כבדים, עם מהירות שיא של 0.8s והתאמה מושלמת למובייל ולמחשב.'
                      : 'Bespoke React & Node.js engineering, zero closed platform limits, 0.8s speed, and pixel-perfect mobile responsiveness.'}
                  </p>
                </div>

                <div className="text-start md:text-end shrink-0 bg-slate-950/70 p-4 sm:p-6 rounded-2xl border border-slate-800">
                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                    {pricing.setupPrice}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {pricing.setupSub}
                  </div>
                </div>
              </div>

              {/* Setup Deliverables List */}
              <div className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {pricing.setupFeatures.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-300">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Monthly Retainer Options (Side-by-Side Anchoring) */}
            <div>
              <div className="text-center max-w-2xl mx-auto mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {pricing.retainerTitle}
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                {/* Tier 1: Essential Ops (450 ILS) */}
                <div className="p-7 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                        {pricing.tier1.nameEn}
                      </span>
                    </div>

                    <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      {pricing.tier1.name}
                    </h4>

                    <p className="text-xs text-slate-400 leading-relaxed mb-6">
                      {pricing.tier1.desc}
                    </p>

                    <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-slate-800">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                        {pricing.tier1.price}
                      </span>
                      <span className="text-xs text-slate-400">
                        {pricing.tier1.sub}
                      </span>
                    </div>

                    <div className="space-y-3 mb-8">
                      {pricing.tier1.features.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <Check className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          <span className={item.startsWith('*') ? 'text-amber-300/80 italic' : ''}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href="#contact"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm border border-slate-700 transition-all"
                  >
                    <span>{pricing.tier1.btnText}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </a>
                </div>

                {/* Tier 2: All-Inclusive Managed (800 ILS - Recommended) */}
                <div className="p-7 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-teal-500/60 flex flex-col justify-between relative shadow-2xl shadow-teal-950/50 glow-teal">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/15 rounded-full blur-2xl pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono text-teal-400 uppercase tracking-wider">
                        {pricing.tier2.nameEn}
                      </span>
                      <span className="text-[11px] font-bold text-teal-300 bg-teal-500/20 px-2.5 py-0.5 rounded-full border border-teal-500/40">
                        {pricing.tier2.badge}
                      </span>
                    </div>

                    <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      {pricing.tier2.name}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed mb-6">
                      {pricing.tier2.desc}
                    </p>

                    <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-slate-800">
                      <span className="text-3xl sm:text-4xl font-extrabold text-teal-400 font-mono">
                        {pricing.tier2.price}
                      </span>
                      <span className="text-xs text-slate-400">
                        {pricing.tier2.sub}
                      </span>
                      <span className="mr-3 text-[11px] text-teal-300/90 font-medium bg-teal-950/60 px-2 py-0.5 rounded border border-teal-500/30">
                        {isRtl ? 'תוספת 350 ₪ בלבד לחודש' : 'Only +₪350 difference'}
                      </span>
                    </div>

                    <div className="space-y-3 mb-8">
                      {pricing.tier2.features.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                          <span className={idx === 1 ? 'font-semibold text-teal-200' : ''}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href="#contact"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-teal-500/25 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <span>{pricing.tier2.btnText}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* 3. Anti-Lock-In Guarantee Box */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm">
                <div className="font-bold text-white mb-1">
                  {pricing.antiLockIn.title}
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {pricing.antiLockIn.text}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* View 2: Custom Estimator & Add-ons Calculator */}
        {viewMode === 'custom' && (
          <div className="max-w-4xl mx-auto bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl">
            <div className="mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {pricing.calculatorTitle}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                {pricing.calculatorSubtitle}
              </p>
            </div>

            {/* Addons Selection Grid */}
            <div className="space-y-3 mb-8">
              {addons.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    role="checkbox"
                    tabIndex={0}
                    aria-checked={isSelected}
                    onClick={() => toggleAddon(addon.id)}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        toggleAddon(addon.id);
                      }
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none ${
                      isSelected
                        ? 'bg-teal-950/30 border-teal-500/60 shadow-md'
                        : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${
                          isSelected
                            ? 'bg-teal-500 border-teal-500 text-white'
                            : 'border-slate-700 bg-slate-900'
                        }`}
                        aria-hidden="true"
                      >
                        {isSelected && <Check className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {addon.name}
                        </div>
                        <div className="text-xs text-slate-400">
                          {addon.desc}
                        </div>
                      </div>
                    </div>

                    <div className="text-end shrink-0">
                      <div className="text-sm font-bold text-teal-400 font-mono">
                        +{addon.setupILS.toLocaleString()} ₪
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {addon.monthlyILS > 0 ? `+${addon.monthlyILS} ₪/חודש` : 'ללא עלות חודשית נוספת'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Calculated Output Box */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-start">
                <div className="text-xs text-slate-400">
                  {isRtl ? 'הערכת השקעה כוללת (הקמה 10,000 ₪ + ריטיינר ניהול 800 ₪ + תוספות שנבחרו):' : 'Estimated Total (Setup ₪10,000 + Managed ₪800 + Selected Addons):'}
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    {finalSetup.toLocaleString()} ₪
                  </span>
                  <span className="text-sm text-teal-400 font-mono font-semibold">
                    + {finalMonthly.toLocaleString()} ₪ / {isRtl ? 'חודש' : 'month'}
                  </span>
                </div>
              </div>

              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-sky-600 text-white font-semibold text-xs sm:text-sm hover:scale-105 transition-all shadow-lg shadow-teal-500/25"
              >
                <span>{isRtl ? 'בקש הצעת מחיר מדויקת לאפיון זה' : 'Request Proposal for this Scope'}</span>
                <ArrowIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
