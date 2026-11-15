import React, { useState } from 'react';
import { Layers, Sliders, CheckCircle2, ArrowRight, ArrowLeft, Eye, Sparkles } from 'lucide-react';

export default function TemplatesShowcase({ lang }) {
  const isRtl = lang === 'he';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const templates = [
    {
      id: 'luxury-studio',
      category: isRtl ? 'סטודיו לעיצוב, נגרות ואדריכלות' : 'Design Studio & Architecture',
      title: isRtl ? 'תבנית סטודיו פרימיום (בסגנון טירן לסרי)' : 'Luxury Studio Template (Tiran Lasry style)',
      description: isRtl
        ? 'אתר קטלוג מרהיב לחברות יצרניות, מעצבי מוצר, נגרות עילית ותאורה. מיקוד ביוקרה, פרזנטציה ויזואלית ותיאום פגישות עם אדריכלים.'
        : 'Showcase catalog tailored for manufacturers, artisanal creators, and high-end architects. Focus on visual luxury and custom quote requests.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
      customizableOptions: isRtl
        ? ['התאמת פלטת צבעים ופונטים', 'קטלוג פריטים אינטראקטיבי', 'טופס הצעת מחיר ל-WhatsApp', 'דף גלריית פרויקטים מודולרי']
        : ['Custom color palette & typography', 'Interactive product catalog', 'WhatsApp quote funnel', 'Modular project gallery'],
      demoTag: isRtl ? 'התאמה מלאה' : 'Fully Customizable'
    },
    {
      id: 'professional-services',
      category: isRtl ? 'עורכי דין, רואי חשבון ויועצים' : 'Law, Accounting & Advisory',
      title: isRtl ? 'תבנית אוטוריטה ויועצים עסקיים' : 'Authority & Professional Advisory',
      description: isRtl
        ? 'מערכת דיגיטלית שמשדרת ביטחון מקסימלי: פרופיל שותפים, תקדימים, בלוג מאמרים מקצועיים ומערכת זימון פגישות אוטומטית.'
        : 'Trust-building portal featuring partner profiles, case victories, professional articles, and automated appointment scheduling.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
      customizableOptions: isRtl
        ? ['חיבור יומן Google / Calendly', 'שאלון אבחון לקוח ראשוני', 'הטמעת המלצות לקוחות', 'אזור הורדת מסמכים ומדריכים']
        : ['Google Calendar sync', 'Client intake questionnaire', 'Client testimonials engine', 'Lead-magnet resource hub'],
      demoTag: isRtl ? 'התאמה מלאה' : 'Fully Customizable'
    },
    {
      id: 'aesthetic-clinic',
      category: isRtl ? 'רפואה פרטית, קליניקות ואסתטיקה' : 'Medical & Aesthetic Clinics',
      title: isRtl ? 'תבנית קליניקה ומנוע קמפיינים' : 'High-Conversion Clinic Engine',
      description: isRtl
        ? 'אתר שנבנה במיוחד למענה מהיר על קמפיינים ממומנים ברשתות: גלריית לפני/אחרי, הסברים על הטיפולים, ופתיחת שיחת WhatsApp בלחיצה אחת.'
        : 'Engineered specifically for high ROAS social media advertising: before/after galleries, treatment guides, and instant WhatsApp chat.',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80',
      customizableOptions: isRtl
        ? ['התראת SMS / וואטסאפ לצוות', 'סליידר תמונות לפני/אחרי', 'דפי נחיתה נפרדים לכל קמפיין', 'אינטגרציה ל-Meta Pixel']
        : ['SMS / WhatsApp lead ping', 'Before/After interactive slider', 'Modular ad landing pages', 'Meta & TikTok pixel sync'],
      demoTag: isRtl ? 'התאמה מלאה' : 'Fully Customizable'
    }
  ];

  const [activeTab, setActiveTab] = useState(templates[0].id);
  const currentTemplate = templates.find((t) => t.id === activeTab) || templates[0];

  return (
    <section className="py-20 bg-[#0a0e17] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-3">
            <Sliders className="w-3.5 h-3.5" />
            <span>{isRtl ? 'קאסטום מלא • מובייל ומחשב • צומח עם העסק' : '100% Custom • Mobile & PC • Scales with Business'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
            {isRtl
              ? 'לא תבנית מדף נוקשה — אלא ארכיטקטורת Custom שמתרחבת בכל שלב'
              : 'Zero Rigid Templates — 100% Custom Built to Scale'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {isRtl
              ? 'היתרון המרכזי של האתרים שלי: הם לא נבנים מתבניות מדף מוגבלות. כל אתר נבנה בקאסטום מלא, מותאם בקפדנות למובייל ולמחשב, ומאפשר להוסיף בכל שלב עמודים, מערכות ואוטומציות נוספות — בדיוק בקצב שהעסק שלך מתרחב וגדל.'
              : 'The core advantage: you are never locked into a generic off-the-shelf template. Every site is built 100% custom, optimized for mobile & desktop, and can be expanded with new features, pages, and systems at any stage as your business scales.'}
          </p>
        </div>

        {/* Industry Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {templates.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => setActiveTab(tpl.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === tpl.id
                  ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/25 scale-105'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {tpl.category}
            </button>
          ))}
        </div>

        {/* Selected Template Card */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 text-xs font-semibold border border-teal-500/30">
              <Sparkles className="w-3 h-3" />
              <span>{currentTemplate.demoTag}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              {currentTemplate.title}
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {currentTemplate.description}
            </p>

            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                {isRtl ? 'דוגמאות להתאמות אישיות שנעשה עבורכם:' : 'Custom modifications we make for your brand:'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentTemplate.customizableOptions.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>{opt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-teal-500/20 transition-all hover:scale-105"
              >
                <span>{isRtl ? 'אני רוצה התאמה אישית בסגנון הזה' : 'I want a custom site in this style'}</span>
                <ArrowIcon className="w-4 h-4" />
              </a>
              <span className="text-xs text-slate-400">
                {isRtl ? '* שינויים והרחבות נוספות מתומחרות בשקיפות' : '* Additional scope modifications priced transparently'}
              </span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl group">
              <img
                src={currentTemplate.image}
                alt={currentTemplate.title}
                className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-6">
                <div className="w-full flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-teal-400 uppercase">
                      {isRtl ? 'ארכיטקטורת React + מודולרי' : 'Modular React Architecture'}
                    </div>
                    <div className="text-base font-bold text-white">
                      {currentTemplate.title}
                    </div>
                  </div>
                  <a
                    href="#contact"
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 transition-all"
                    title="Request Demo"
                  >
                    <Eye className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
