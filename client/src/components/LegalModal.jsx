import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  Printer,
  Shield,
  Lock,
  Scale,
  Copy,
  Check,
  Phone,
  Mail,
  Calendar,
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { legalContent } from '../data/legalContent';

export default function LegalModal({
  isOpen,
  onClose,
  activeTab = 'accessibility',
  setActiveTab,
  lang = 'he'
}) {
  const isRtl = lang === 'he';
  const data = legalContent[lang] || legalContent.he;
  const modalRef = useRef(null);
  const previouslyFocusedElementRef = useRef(null);
  const [copiedCoordinator, setCopiedCoordinator] = useState(false);

  // Focus trap & Escape listener & Scroll lock
  useEffect(() => {
    if (!isOpen) return;

    // Save previous active element to restore focus on close
    previouslyFocusedElementRef.current = document.activeElement;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus the modal container
    if (modalRef.current) {
      modalRef.current.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Focus trapping
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocusedElementRef.current && previouslyFocusedElementRef.current.focus) {
        previouslyFocusedElementRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyCoordinator = () => {
    const textToCopy = `רכז נגישות ופניות הציבור - הרטוב פיתוח אתרים | טלפון: 050-5935609 | מייל: tsoor.hartov@gmail.com`;
    navigator.clipboard?.writeText(textToCopy);
    setCopiedCoordinator(true);
    setTimeout(() => setCopiedCoordinator(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const tabsConfig = [
    {
      id: 'accessibility',
      label: data.tabs.accessibility.label,
      badge: data.tabs.accessibility.badge,
      icon: Shield
    },
    {
      id: 'privacy',
      label: data.tabs.privacy.label,
      badge: data.tabs.privacy.badge,
      icon: Lock
    },
    {
      id: 'terms',
      label: data.tabs.terms.label,
      badge: data.tabs.terms.badge,
      icon: Scale
    }
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-dialog-title"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-4xl bg-[#0d1322] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto focus:outline-none"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0a0f1d] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 id="legal-dialog-title" className="text-base sm:text-lg font-bold text-white tracking-tight">
                {lang === 'he' ? 'מידע משפטי, נגישות ופרטיות' : 'Legal, Accessibility & Privacy'}
              </h2>
              <p className="text-xs text-slate-400">
                Tsoorhartov.com • {lang === 'he' ? 'שקיפות ושוויון זכויות מלא' : 'Full Transparency & Equal Rights'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              aria-label={data.actions.print}
              title={data.actions.print}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              aria-label={data.actions.close}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs Bar */}
        <div
          role="tablist"
          aria-label={lang === 'he' ? 'מסמכים משפטיים' : 'Legal Documents'}
          className="flex border-b border-slate-800 bg-[#0c1220] px-4 sm:px-6 gap-2 sm:gap-3 overflow-x-auto scrollbar-none shrink-0"
        >
          {tabsConfig.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-controls={`panel-${tab.id}`}
                aria-selected={isActive}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (typeof window !== 'undefined') {
                    window.history.replaceState(null, '', `#${tab.id}`);
                  }
                }}
                className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none ${
                  isActive
                    ? 'border-teal-400 text-teal-400 bg-teal-500/10'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span
                  className={`hidden md:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    isActive
                      ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 text-slate-300 text-sm leading-relaxed">
          {/* TAB 1: ACCESSIBILITY */}
          {activeTab === 'accessibility' && (
            <div
              role="tabpanel"
              id="panel-accessibility"
              aria-labelledby="tab-accessibility"
              className="space-y-6 animate-fadeIn"
            >
              {/* Header Box */}
              <div className="p-5 sm:p-6 rounded-2xl bg-teal-950/20 border border-teal-500/30">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <span className="text-xs font-bold text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/30">
                    תקן ישראלי ת"י 5568 ברמה AA • WCAG 2.1
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-teal-400" />
                    <span>{lang === 'he' ? 'עדכון אחרון:' : 'Last updated:'} {data.accessibility.lastUpdated}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                  {data.accessibility.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {data.accessibility.intro}
                </p>
                <p className="text-xs text-teal-300/90 mt-3 pt-3 border-t border-teal-500/20 leading-relaxed">
                  {data.accessibility.standardsNote}
                </p>
              </div>

              {/* Adjustments Grid */}
              <div className="space-y-4">
                <h4 className="text-base font-bold text-white">
                  {data.accessibility.featuresTitle}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.accessibility.features.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-lg bg-teal-500/15 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-white text-xs sm:text-sm mb-1">
                          {item.title}
                        </div>
                        <div className="text-xs text-slate-400 leading-relaxed">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accessibility Coordinator Box */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-700/80 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <Shield className="w-4 h-4 text-teal-400" />
                      <span>{data.accessibility.coordinatorTitle}</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      {data.accessibility.coordinatorDesc}
                    </p>
                  </div>

                  <button
                    onClick={handleCopyCoordinator}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors shrink-0 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
                  >
                    {copiedCoordinator ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">{data.actions.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-teal-400" />
                        <span>{data.actions.copyCoordinator}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="text-[11px] text-slate-400 mb-0.5">
                      {lang === 'he' ? 'רכז נגישות ומפתח האתר:' : 'Accessibility Coordinator:'}
                    </div>
                    <div className="text-sm font-bold text-white">
                      {data.accessibility.coordinator.name}
                    </div>
                    <div className="text-[11px] text-teal-400 font-medium">
                      {data.accessibility.coordinator.role}
                    </div>
                  </div>

                  <a
                    href="tel:0505935609"
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-teal-500/50 transition-colors group"
                  >
                    <div className="text-[11px] text-slate-400 mb-0.5 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-teal-400" />
                      <span>{lang === 'he' ? 'טלפון / WhatsApp:' : 'Phone / WhatsApp:'}</span>
                    </div>
                    <div className="text-sm font-bold text-white font-mono group-hover:text-teal-300">
                      050-593-5609
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {lang === 'he' ? 'שיחות, WhatsApp ו-SMS' : 'Calls, WhatsApp & SMS'}
                    </div>
                  </a>

                  <a
                    href="mailto:tsoorhartov@gmail.com"
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-teal-500/50 transition-colors group"
                  >
                    <div className="text-[11px] text-slate-400 mb-0.5 flex items-center gap-1">
                      <Mail className="w-3 h-3 text-teal-400" />
                      <span>{lang === 'he' ? 'דוא"ל לפניות נגישות:' : 'Email Address:'}</span>
                    </div>
                    <div className="text-xs font-bold text-white font-mono group-hover:text-teal-300 truncate">
                      tsoorhartov@gmail.com
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {lang === 'he' ? 'מענה מהיר תוך 2 ימי עסקים' : 'Response within 2 business days'}
                    </div>
                  </a>
                </div>
              </div>

              {/* Physical Accessibility */}
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
                <h5 className="font-semibold text-white text-xs mb-1">
                  {data.accessibility.physicalTitle}
                </h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {data.accessibility.physicalDesc}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div
              role="tabpanel"
              id="panel-privacy"
              aria-labelledby="tab-privacy"
              className="space-y-6 animate-fadeIn"
            >
              {/* Header Box */}
              <div className="p-5 sm:p-6 rounded-2xl bg-sky-950/20 border border-sky-500/30">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/30">
                    חוק הגנת הפרטיות, התשמ"א-1981
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    <span>{lang === 'he' ? 'עדכון אחרון:' : 'Last updated:'} {data.privacy.lastUpdated}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                  {data.privacy.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {data.privacy.intro}
                </p>
              </div>

              {/* Data Minimization Section */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-sky-400" />
                  <span>{data.privacy.dataCollectionTitle}</span>
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {data.privacy.dataCollectionDesc}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {data.privacy.collectedItems.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Purpose and No-Sharing Guarantee */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <h4 className="text-sm font-bold text-white">
                    {data.privacy.purposeTitle}
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-400 leading-relaxed">
                    {data.privacy.purposes.map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                  <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>{data.privacy.noSharingTitle}</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {data.privacy.noSharingDesc}
                  </p>
                </div>
              </div>

              {/* Cookies & Analytics */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-white">
                  {data.privacy.technologiesTitle}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {data.privacy.technologiesDesc}
                </p>
              </div>

              {/* User Rights under Israeli Law */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-white">
                  {data.privacy.rightsTitle}
                </h4>
                <p className="text-xs text-slate-400">
                  {data.privacy.rightsDesc}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {data.privacy.rights.map((r, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="font-semibold text-white text-xs mb-1">
                        {r.title}
                      </div>
                      <div className="text-xs text-slate-400 leading-relaxed">
                        {r.desc}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-2 text-xs text-teal-300 font-medium">
                  {data.privacy.rightsAction}
                </div>
              </div>

              {/* Security */}
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
                <h5 className="font-semibold text-white text-xs mb-1">
                  {data.privacy.securityTitle}
                </h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {data.privacy.securityDesc}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: TERMS OF USE */}
          {activeTab === 'terms' && (
            <div
              role="tabpanel"
              id="panel-terms"
              aria-labelledby="tab-terms"
              className="space-y-6 animate-fadeIn"
            >
              {/* Header Box */}
              <div className="p-5 sm:p-6 rounded-2xl bg-indigo-950/20 border border-indigo-500/30">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/30">
                    תנאי שימוש והסכם גלישה
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{lang === 'he' ? 'עדכון אחרון:' : 'Last updated:'} {data.terms.lastUpdated}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                  {data.terms.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {data.terms.intro}
                </p>
              </div>

              {/* Scope & Nature */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-white">
                  {data.terms.scopeTitle}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {data.terms.scopeDesc}
                </p>
              </div>

              {/* Intellectual Property */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Scale className="w-4 h-4 text-indigo-400" />
                  <span>{data.terms.ipTitle}</span>
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {data.terms.ipDesc}
                </p>
              </div>

              {/* Limitation of Liability */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-white">
                  {data.terms.liabilityTitle}
                </h4>
                <div className="space-y-2.5">
                  {data.terms.liability.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                      <div className="font-semibold text-white text-xs mb-1">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-400 leading-relaxed">
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Changes & Jurisdiction */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
                  <h5 className="font-semibold text-white text-xs mb-1">
                    {data.terms.changesTitle}
                  </h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {data.terms.changesDesc}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
                  <h5 className="font-semibold text-white text-xs mb-1">
                    {data.terms.jurisdictionTitle}
                  </h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {data.terms.jurisdictionDesc}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Bar */}
        <div className="px-6 py-4 border-t border-slate-800 bg-[#0a0f1d] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-400">
            Tsoorhartov.com • {lang === 'he' ? 'כל הזכויות שמורות להרטוב פיתוח אתרים' : 'All rights reserved to Hartov Web Development'}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-semibold text-xs sm:text-sm transition-colors focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
            >
              {data.actions.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
