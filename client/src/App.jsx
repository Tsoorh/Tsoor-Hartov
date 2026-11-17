import React, { useState, useEffect } from 'react';
import { siteContent } from './data/content';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CredentialsRibbon from './components/CredentialsRibbon';
import ValueProps from './components/ValueProps';
import CaseStudyTiran from './components/CaseStudyTiran';
import TemplatesShowcase from './components/TemplatesShowcase';
import ServicesGrid from './components/ServicesGrid';
import AutomationsSection from './components/AutomationsSection';
import PricingSection from './components/PricingSection';
import SocialMarketingPreview from './components/SocialMarketingPreview';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import WhatsAppFloat from './components/WhatsAppFloat';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';

export default function App() {
  // Default language is Hebrew
  const [lang, setLang] = useState('he');
  const content = siteContent[lang];

  // Ensure pure dark mode across the application
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('theme');
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Legal Modal & Deep Linking State
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [activeLegalTab, setActiveLegalTab] = useState('accessibility');

  const openLegalModal = (tab = 'accessibility') => {
    setActiveLegalTab(tab);
    setLegalModalOpen(true);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${tab}`);
    }
  };

  const closeLegalModal = () => {
    setLegalModalOpen(false);
    if (
      typeof window !== 'undefined' &&
      ['#accessibility', '#privacy', '#terms'].includes(window.location.hash)
    ) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  useEffect(() => {
    // Dynamic RTL/LTR adjustment
    const isRtl = lang === 'he';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Deep linking hash listener (#accessibility, #privacy, #terms)
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash === '#accessibility') {
        setActiveLegalTab('accessibility');
        setLegalModalOpen(true);
      } else if (hash === '#privacy') {
        setActiveLegalTab('privacy');
        setLegalModalOpen(true);
      } else if (hash === '#terms') {
        setActiveLegalTab('terms');
        setLegalModalOpen(true);
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const isRtl = lang === 'he';

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isRtl ? 'font-hebrew' : 'font-sans'
      } bg-[#0b0f19] text-slate-100 selection:bg-teal-500 selection:text-white`}
    >
      {/* Accessible Skip to Content Link (WCAG 2.4.1 Bypass Blocks) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-teal-500 focus:text-white focus:rounded-xl focus:shadow-2xl focus:font-bold focus:outline-none focus:ring-2 focus:ring-white"
      >
        {lang === 'he' ? 'דלג לתוכן המרכזי' : 'Skip to main content'}
      </a>

      {/* Top Fixed Header */}
      <Navbar
        lang={lang}
        setLang={setLang}
        content={content}
        onOpenLegal={openLegalModal}
      />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1">
        <Hero content={content} lang={lang} />
        <CredentialsRibbon content={content} lang={lang} />
        <ValueProps content={content} lang={lang} />
        <CaseStudyTiran content={content} lang={lang} />
        <TemplatesShowcase lang={lang} />
        <ServicesGrid content={content} lang={lang} />
        <AutomationsSection content={content} lang={lang} />
        <PricingSection content={content} lang={lang} />
        <SocialMarketingPreview content={content} lang={lang} />
        <AboutSection content={content} lang={lang} />
        <ContactSection content={content} lang={lang} />
      </main>

      {/* Floating WhatsApp CTA */}
      <WhatsAppFloat lang={lang} />

      {/* Global Footer */}
      <Footer
        content={content}
        lang={lang}
        setLang={setLang}
        onOpenLegal={openLegalModal}
      />

      {/* Legal & Accessibility Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={closeLegalModal}
        activeTab={activeLegalTab}
        setActiveTab={setActiveLegalTab}
        lang={lang}
      />
    </div>
  );
}
