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

export default function App() {
  // Default language is Hebrew
  const [lang, setLang] = useState('he');
  const content = siteContent[lang];

  useEffect(() => {
    // Dynamic RTL/LTR adjustment
    const isRtl = lang === 'he';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* Top Fixed Header */}
      <Navbar lang={lang} setLang={setLang} content={content} />

      {/* Main Content Sections */}
      <main className="flex-1">
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

      {/* Floating Elements */}
      <WhatsAppFloat lang={lang} />

      {/* Global Footer */}
      <Footer content={content} lang={lang} setLang={setLang} />
    </div>
  );
}
