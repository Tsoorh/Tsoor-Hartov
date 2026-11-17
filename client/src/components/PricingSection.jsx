import React, { useState } from 'react';
import {
  Check,
  ShieldCheck,
  Sparkles,
  Calculator,
  ArrowRight,
  ArrowLeft,
  FileCode,
  CheckCircle2,
  Layers,
  CreditCard,
  MessageSquare
} from 'lucide-react';

export default function PricingSection({ content, lang, onSelectPackage }) {
  const { pricing } = content;
  const isRtl = lang === 'he';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // View Mode: 'transparent' or 'custom'
  const [viewMode, setViewMode] = useState('transparent');

  // Foundation Project Choice in Calculator: 'landing' or 'full'
  const [selectedBase, setSelectedBase] = useState('full');
  const [selectedRetainer, setSelectedRetainer] = useState('tier2'); // 'tier1' (350) or 'tier2' (750)

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

  const baseSetup = selectedBase === 'landing' ? 2500 : 8500;
  const baseMonthly =
    selectedBase === 'landing'
      ? 150
      : selectedRetainer === 'tier1'
      ? 350
      : 750;

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

  const whatsappMessage = encodeURIComponent(
    isRtl
      ? `היי צור, ביצעתי הערכה במחשבון האתר: בסיס ${
          selectedBase === 'landing' ? 'דף נחיתה (החל מ-2,500 ₪)' : 'אתר מלא (החל מ-8,500 ₪)'
        }, עם ריטיינר חודשי של ${baseMonthly} ₪, וסך הכל ${finalSetup.toLocaleString()} ₪ הקמה ו-${finalMonthly.toLocaleString()} ₪ חודשי (לפני מע״מ). אשמח שנדבר על אפיון הפרויקט.`
      : `Hi Tsoor, I used the calculator on your website: Base ${
          selectedBase === 'landing' ? 'Landing Page' : 'Full Custom Site'
        }, with ${baseMonthly} ILS monthly retainer, total setup around ${finalSetup.toLocaleString()} ILS and ${finalMonthly.toLocaleString()} ILS/mo. I'd love to discuss scoping.`
  );

  const whatsappUrl = `https://wa.me/972505935609?text=${whatsappMessage}`;

  return (
    <section id="pricing" className="py-24 bg-[#0b0f19] relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isRtl ? 'עוגן תמחור שקוף • ללא כבילה' : 'Transparent Anchor Pricing • Zero Lock-In'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            {pricing.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {pricing.subtitle}
          </p>

          {/* View Toggle */}
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

        {/* VAT & Payment Terms Notification Banner */}
        <div className="max-w-5xl mx-auto mb-10 p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-teal-300 font-semibold">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            <span>{pricing.vatNote}</span>
          </div>
          <div className="text-slate-400 text-center sm:text-end">
            <span className="text-slate-300 font-medium">{pricing.paymentTermsTitle}</span>{' '}
            {pricing.paymentTermsDesc}
          </div>
        </div>

        {/* VIEW 1: TRANSPARENT ANCHOR PACKAGES (LANDING PAGE & FULL CUSTOM PLATFORM) */}
        {viewMode === 'transparent' && (
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* PACKAGE 1: LANDING PAGE (החל מ-2,500 ₪) */}
              <div className="lg:col-span-5 p-7 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all glow-card">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-teal-300 bg-teal-500/15 px-3 py-1 rounded-full border border-teal-500/30">
                      {pricing.packageLanding.badge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">One-Page</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">
                    {pricing.packageLanding.title}
                  </h3>

                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                      {pricing.packageLanding.price}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mb-6 pb-6 border-b border-slate-800">
                    {pricing.packageLanding.priceSub}
                  </div>

                  {/* Minor Monthly Maintenance Callout */}
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 mb-6">
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-xs font-bold text-teal-400">
                        {isRtl ? 'תחזוקה ואחסון ענן קל:' : 'Maintenance & Cloud Hosting:'}
                      </span>
                      <span className="text-sm font-bold text-white font-mono">
                        {pricing.packageLanding.monthlyMaintenanceText}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {pricing.packageLanding.monthlyMaintenanceDesc}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {pricing.packageLanding.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={`https://wa.me/972505935609?text=${encodeURIComponent(
                    isRtl
                      ? 'היי צור, אשמח לקבל פרטים ולאפיין דף נחיתה ממיר (החל מ-2,500 ₪) לעסק שלי.'
                      : 'Hi Tsoor, I would like to scope a bespoke landing page (starting from ₪2,500) for my business.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm border border-slate-700 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 text-teal-400" />
                  <span>{pricing.packageLanding.btnText}</span>
                </a>
              </div>

              {/* PACKAGE 2: FULL CUSTOM PLATFORM (החל מ-8,500 ₪ + 350/750 RETAINERS) */}
              <div className="lg:col-span-7 p-7 sm:p-9 rounded-3xl bg-slate-900/90 border-2 border-teal-500/60 flex flex-col justify-between relative shadow-2xl shadow-teal-950/50 glow-teal">
                <div className="absolute top-0 right-0 w-60 h-60 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-teal-300 bg-teal-500/20 px-3 py-1 rounded-full border border-teal-500/40">
                      {pricing.packageFull.badge}
                    </span>
                    <span className="text-xs font-mono text-teal-400 uppercase tracking-wider">
                      {isRtl ? 'המומלץ והמבוקש ביותר' : 'Recommended Architecture'}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                    {pricing.packageFull.title}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl sm:text-5xl font-black text-teal-400 font-mono">
                      {pricing.packageFull.price}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 mb-6 pb-6 border-b border-slate-800">
                    {pricing.packageFull.priceSub}
                  </div>

                  {/* Retainer Selection Cards Inside Package 2 */}
                  <div className="space-y-2 mb-6">
                    <div className="text-xs font-bold text-white uppercase tracking-wider">
                      {pricing.retainerTitle}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {/* Retainer 1: 350 */}
                      <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs text-white">{pricing.tier1.name}</span>
                          <span className="font-mono text-xs font-extrabold text-teal-400">
                            {pricing.tier1.price}{pricing.tier1.sub}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug">
                          {pricing.tier1.desc}
                        </p>
                      </div>

                      {/* Retainer 2: 750 (Managed) */}
                      <div className="p-3.5 rounded-2xl bg-teal-950/40 border border-teal-500/40 shadow-inner">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs text-teal-200">{pricing.tier2.name}</span>
                          <span className="font-mono text-xs font-extrabold text-teal-300">
                            {pricing.tier2.price}{pricing.tier2.sub}
                          </span>
                        </div>
                        <p className="text-[11px] text-teal-300/80 leading-snug">
                          {isRtl ? 'כולל עד שעתיים חודשיות לעדכוני תוכן בוואטסאפ' : 'Includes 2hrs/mo updates via WhatsApp'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Core Features */}
                  <div className="space-y-3 mb-8">
                    {pricing.packageFull.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={`https://wa.me/972505935609?text=${encodeURIComponent(
                    isRtl
                      ? 'היי צור, ראיתי את מסלול האתר המותאם אישית (החל מ-8,500 ₪) ואשמח לתאם שיחת אפיון לעסק שלי.'
                      : 'Hi Tsoor, I am interested in your full bespoke platform package (starting from ₪8,500) and would like to scope it for my business.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-teal-500/25 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{pricing.packageFull.btnText}</span>
                  <ArrowIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Anti-Lock-In Guarantee Box */}
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

        {/* VIEW 2: CUSTOM ESTIMATOR & ADD-ONS CALCULATOR */}
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

            {/* Step 1: Choose Foundation Project Base */}
            <div className="mb-8 p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
              <div className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                {isRtl ? 'שלב 1: בחירת בסיס הפרויקט' : 'Step 1: Choose Project Foundation'}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedBase('landing')}
                  className={`p-4 rounded-xl border text-start transition-all focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none ${
                    selectedBase === 'landing'
                      ? 'bg-teal-950/40 border-teal-500/60 shadow-md'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-white">
                      {isRtl ? 'דף נחיתה ממיר (One-Page)' : 'Landing Page'}
                    </span>
                    <span className="text-xs font-mono font-bold text-teal-400">2,500 ₪</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {isRtl ? '+ 150 ₪/חודש תחזוקת שרת ודומיין' : '+ ₪150/mo cloud hosting & domain'}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedBase('full')}
                  className={`p-4 rounded-xl border text-start transition-all focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none ${
                    selectedBase === 'full'
                      ? 'bg-teal-950/40 border-teal-500/60 shadow-md'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-white">
                      {isRtl ? 'אתר מותאם אישית מלא ומערכות' : 'Full Custom Platform'}
                    </span>
                    <span className="text-xs font-mono font-bold text-teal-400">8,500 ₪</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {isRtl ? '+ בחירת ריטיינר (350 ₪ או 750 ₪)' : '+ Retainer choice (₪350 or ₪750)'}
                  </div>
                </button>
              </div>

              {/* If Full Platform is selected, show Retainer choice */}
              {selectedBase === 'full' && (
                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-3">
                  <span className="text-xs text-slate-400">
                    {isRtl ? 'מסלול ליווי מבוקש:' : 'Retainer:'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedRetainer('tier1')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                      selectedRetainer === 'tier1'
                        ? 'bg-teal-500 text-white border-teal-500'
                        : 'bg-slate-900 text-slate-300 border-slate-700'
                    }`}
                  >
                    {isRtl ? 'תשתית ושקט טכני (350 ₪)' : 'Essential (₪350)'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRetainer('tier2')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                      selectedRetainer === 'tier2'
                        ? 'bg-teal-500 text-white border-teal-500'
                        : 'bg-slate-900 text-slate-300 border-slate-700'
                    }`}
                  >
                    {isRtl ? 'ניהול מלא בראש שקט (750 ₪ - מומלץ)' : 'Managed (₪750 - Recommended)'}
                  </button>
                </div>
              )}
            </div>

            {/* Step 2: Add-ons Selection Grid */}
            <div className="mb-8 space-y-3">
              <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-2">
                {isRtl ? 'שלב 2: תוספות, מחשבונים ומערכות מתקדמות' : 'Step 2: Add-ons & Modular Capabilities'}
              </div>

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
                  {isRtl
                    ? `הערכת השקעה כוללת (בסיס ${baseSetup.toLocaleString()} ₪ + תחזוקה ${baseMonthly} ₪ + ${selectedAddons.length} תוספות):`
                    : `Estimated Total (Base ₪${baseSetup.toLocaleString()} + Retainer ₪${baseMonthly} + ${selectedAddons.length} Addons):`}
                </div>
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    {finalSetup.toLocaleString()} ₪
                  </span>
                  <span className="text-sm text-teal-400 font-mono font-semibold">
                    + {finalMonthly.toLocaleString()} ₪ / {isRtl ? 'חודש' : 'month'}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    ({isRtl ? 'לפני מע״מ' : 'excl. VAT'})
                  </span>
                </div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 text-white font-semibold text-xs sm:text-sm hover:scale-105 transition-all shadow-lg shadow-teal-500/25"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{isRtl ? 'שליחת אפיון זה לוואטסאפ של צור' : 'Send Estimate to WhatsApp'}</span>
                <ArrowIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
