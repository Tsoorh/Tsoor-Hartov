import React, { useState, useEffect } from 'react';
import { Phone, Globe, Menu, X, Shield } from 'lucide-react';

export default function Navbar({ lang, setLang, content, onOpenLegal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isRtl = lang === 'he';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#case-study', label: content.nav.caseStudies },
    { href: '#services', label: content.nav.services },
    { href: '#automations', label: content.nav.automations },
    { href: '#pricing', label: content.nav.pricing },
    { href: '#social-kit', label: content.nav.socialKit },
    { href: '#about', label: content.nav.about },
  ];

  const whatsappUrl = `https://wa.me/972505935609?text=${encodeURIComponent(
    isRtl
      ? 'היי צור, ראיתי את האתר שלך ואשמח לשמוע פרטים על בניית אתר/אוטומציות לעסק שלי.'
      : 'Hi Tsoor, I saw your website and would like to hear more about web development and automations for my business.'
  )}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0b0f19]/95 backdrop-blur-md border-b border-slate-800/80 shadow-2xl py-2.5 sm:py-3'
          : 'bg-[#0b0f19]/80 backdrop-blur-sm sm:bg-transparent py-3 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-14">
          
          {/* Brand & Logo (Right in RTL, Left in LTR) */}
          <a
            href="#"
            className="flex items-center gap-3 shrink-0 group focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none rounded-xl"
            aria-label={`${content.nav.brand} - ${content.nav.tagline}`}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-sky-500 flex items-center justify-center shadow-lg shadow-teal-500/20 font-black text-white text-lg shrink-0 group-hover:scale-105 transition-transform">
              TS
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-extrabold text-base sm:text-lg text-white leading-none tracking-tight group-hover:text-teal-400 transition-colors">
                {content.nav.brand}
              </span>
              <span className="text-[11px] text-teal-400 font-medium leading-none mt-1 hidden sm:block">
                {content.nav.tagline}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Center, >= 1024px) */}
          <nav aria-label={isRtl ? 'ניווט ראשי' : 'Main Navigation'} className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors py-1 leading-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none rounded-md"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons (Left in RTL, Right in LTR) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Quick Accessibility Button (Desktop) */}
            <button
              onClick={() => onOpenLegal && onOpenLegal('accessibility')}
              aria-label={isRtl ? 'הצהרת נגישות (תקן 5568 AA)' : 'Accessibility Statement (IS 5568 AA)'}
              title={isRtl ? 'הצהרת נגישות' : 'Accessibility Statement'}
              className="h-9 w-9 rounded-xl border border-slate-700/80 bg-slate-800/60 hover:bg-slate-800 text-teal-400 hover:text-teal-300 transition-all flex items-center justify-center shrink-0 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
            >
              <Shield className="w-4 h-4" />
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'he' ? 'en' : 'he')}
              aria-label={lang === 'he' ? 'החלף שפה לאנגלית' : 'Switch language to Hebrew'}
              title={lang === 'he' ? 'Switch to English' : 'מעבר לעברית'}
              className="h-9 px-3 rounded-xl border border-slate-700/80 bg-slate-800/60 hover:bg-slate-800 text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center gap-1.5 shrink-0 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
            >
              <Globe className="w-3.5 h-3.5 text-teal-400" />
              <span>{lang === 'he' ? 'EN' : 'עברית'}</span>
            </button>

            {/* Official WhatsApp Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={isRtl ? 'פנייה ישירה לוואטסאפ של צור הרטוב' : 'Chat with Tsoor on WhatsApp'}
              className="h-9 px-3 sm:px-3.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] text-xs font-bold transition-all hover:scale-105 flex items-center justify-center gap-1.5 shrink-0 shadow-sm shadow-[#25D366]/10 focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:outline-none"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 64 64" style={{ display: 'block' }}>
                <path fill="#25D366" d="M32 2C15.432 2 2 15.432 2 32c0 5.293 1.378 10.274 3.791 14.604L2 62l15.86-4.152A29.835 29.835 0 0 0 32 62c16.568 0 30-13.432 30-30S48.568 2 32 2z"/>
                <path fill="#FFFFFF" d="M47.79 38.835c-.792-.397-4.686-2.312-5.411-2.576-.726-.264-1.255-.396-1.784.397-.528.792-2.046 2.576-2.508 3.104-.462.529-.924.594-1.716.198-.792-.396-3.344-1.232-6.37-3.93-2.355-2.099-3.945-4.693-4.407-5.485-.462-.792-.049-1.22.347-1.614.357-.356.792-.924 1.188-1.386.396-.462.528-.792.792-1.32.264-.528.132-.99-.066-1.386-.198-.396-1.784-4.298-2.443-5.883-.643-1.545-1.298-1.334-1.783-1.36-.462-.022-.99-.026-1.518-.026-.528 0-1.386.198-2.112.99-.726.792-2.772 2.706-2.772 6.6 0 3.894 2.838 7.656 3.234 8.184.396.528 5.584 8.528 13.528 11.956 1.89.816 3.364 1.303 4.514 1.666 1.897.604 3.624.519 4.988.315 1.523-.227 4.686-1.914 5.346-3.762.66-1.848.66-3.432.462-3.762-.198-.33-.726-.528-1.518-.924z"/>
              </svg>
              <span className="hidden sm:inline">{content.nav.whatsappCta}</span>
            </a>

            {/* Desktop Consultation CTA */}
            <a
              href="#contact"
              className="hidden lg:inline-flex h-9 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 text-white text-xs font-bold shadow-md shadow-teal-500/25 transition-all hover:scale-105 items-center gap-1.5 shrink-0 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{content.nav.contact}</span>
            </a>

            {/* Mobile Menu Hamburger Button (< 1024px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'סגור תפריט ניווט' : 'פתח תפריט ניווט'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
              className="lg:hidden h-9 w-9 rounded-xl bg-slate-800/80 border border-slate-700/80 text-slate-200 hover:text-white transition-colors flex items-center justify-center shrink-0 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Dropdown Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-menu"
            role="region"
            aria-label={isRtl ? 'תפריט ניווט במובייל' : 'Mobile Navigation Menu'}
            className="lg:hidden mt-3 border-t border-slate-800 bg-[#0d1322]/98 rounded-2xl p-4 space-y-3 shadow-2xl backdrop-blur-xl border border-slate-800/80"
          >
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-semibold text-slate-200 hover:text-teal-400 hover:bg-slate-800/50 px-3 py-2.5 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
                >
                  {link.label}
                </a>
              ))}

              {/* Mobile Accessibility Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenLegal) onOpenLegal('accessibility');
                }}
                className="w-full flex items-center gap-2 text-sm font-semibold text-teal-400 hover:bg-slate-800/50 px-3 py-2.5 rounded-xl transition-colors text-start focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
              >
                <Shield className="w-4 h-4" />
                <span>{isRtl ? 'הצהרת נגישות (AA)' : 'Accessibility Statement (AA)'}</span>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] text-white text-sm font-bold shadow-lg shadow-[#25D366]/25 transition-all focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 64 64">
                  <path fill="#25D366" d="M32 2C15.432 2 2 15.432 2 32c0 5.293 1.378 10.274 3.791 14.604L2 62l15.86-4.152A29.835 29.835 0 0 0 32 62c16.568 0 30-13.432 30-30S48.568 2 32 2z"/>
                  <path fill="#FFFFFF" d="M47.79 38.835c-.792-.397-4.686-2.312-5.411-2.576-.726-.264-1.255-.396-1.784.397-.528.792-2.046 2.576-2.508 3.104-.462.529-.924.594-1.716.198-.792-.396-3.344-1.232-6.37-3.93-2.355-2.099-3.945-4.693-4.407-5.485-.462-.792-.049-1.22.347-1.614.357-.356.792-.924 1.188-1.386.396-.462.528-.792.792-1.32.264-.528.132-.99-.066-1.386-.198-.396-1.784-4.298-2.443-5.883-.643-1.545-1.298-1.334-1.783-1.36-.462-.022-.99-.026-1.518-.026-.528 0-1.386.198-2.112.99-.726.792-2.772 2.706-2.772 6.6 0 3.894 2.838 7.656 3.234 8.184.396.528 5.584 8.528 13.528 11.956 1.89.816 3.364 1.303 4.514 1.666 1.897.604 3.624.519 4.988.315 1.523-.227 4.686-1.914 5.346-3.762.66-1.848.66-3.432.462-3.762-.198-.33-.726-.528-1.518-.924z"/>
                </svg>
                <span>{isRtl ? 'שיחה ישירה בוואטסאפ (050-593-5609)' : 'WhatsApp (050-593-5609)'}</span>
              </a>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-sky-600 text-white text-sm font-bold shadow-lg shadow-teal-500/20 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                <Phone className="w-4 h-4" />
                <span>{content.nav.contact}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
