import React, { useState } from 'react';
import { Layers, Sliders, CheckCircle2, ArrowRight, ArrowLeft, Eye, Sparkles } from 'lucide-react';

export default function TemplatesShowcase({ lang }) {
  const isRtl = lang === 'he';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const formats = [
    {
      id: 'luxury-studio',
      category: isRtl ? 'סטודיו לעיצוב, נגרות ואדריכלות' : 'Design Studio & Architecture',
      title: isRtl ? 'פורמט סטודיו פרימיום (בהשראת פרויקט טירן לסרי)' : 'Luxury Studio Format (Inspired by Tiran Lasry)',
      description: isRtl
        ? 'אתר קטלוג מרהיב לחברות יצרניות, מעצבי מוצר, נגרות עילית ותאורה. מיקוד ביוקרה, פרזנטציה ויזואלית מוקפדת ותיאום פניות מהיר עם אדריכלים.'
        : 'Showcase catalog tailored for manufacturers, artisanal creators, and high-end architects. Focus on visual luxury and custom quote requests.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
      customizableOptions: isRtl
        ? ['התאמת פלטת צבעים, טיפוגרפיה ושפה מותגית', 'קטלוג פריטים אינטראקטיבי המציג חומרי גלם', 'משפך בקשת הצעת מחיר ישירות ל-WhatsApp', 'דף גלריית פרויקטים מודולרי שמתרחב בקלות']
        : ['Custom color palette & brand typography', 'Interactive product catalog displaying materials', 'Direct WhatsApp quote request funnel', 'Modular project gallery ready to scale'],
      demoTag: isRtl ? 'ארכיטקטורה מותאמת אישית' : 'Custom Architecture'
    },
    {
      id: 'professional-services',
      category: isRtl ? 'עורכי דין, רואי חשבון ויועצים' : 'Law, Accounting & Advisory',
      title: isRtl ? 'פורמט אוטוריטה ותיאום פגישות' : 'Authority & Professional Advisory Format',
      description: isRtl
        ? 'מערכת דיגיטלית שמשדרת ביטחון מקסימלי וסמכות מקצועית: פרופיל שותפים, תקדימים, מאמרים מקצועיים ומערכת זימון פגישות אוטומטית.'
        : 'Trust-building portal featuring partner profiles, case victories, professional articles, and automated appointment scheduling.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
      customizableOptions: isRtl
        ? ['חיבור יומן Google / Calendly לפגישות', 'שאלון סינון ואבחון לקוח ראשוני', 'הטמעת המלצות לקוחות ואמינות', 'אזור הורדת מסמכים ומדריכים ייעודיים']
        : ['Google Calendar / Calendly booking sync', 'Client intake and qualification quiz', 'Verified client testimonials engine', 'Resource & documentation download hub'],
      demoTag: isRtl ? 'ארכיטקטורה מותאמת אישית' : 'Custom Architecture'
    },
    {
      id: 'aesthetic-clinic',
      category: isRtl ? 'רפואה פרטית, קליניקות ואסתטיקה' : 'Medical & Aesthetic Clinics',
      title: isRtl ? 'פורמט קליניקה ומנוע קמפיינים' : 'High-Conversion Clinic & Campaigns Format',
      description: isRtl
        ? 'אתר שנבנה במיוחד למענה מהיר על קמפיינים ממומנים ברשתות: גלריית לפני/אחרי, הסברים על הטיפולים, ופתיחת שיחת WhatsApp בלחיצה אחת.'
        : 'Engineered specifically for high ROAS social media advertising: before/after galleries, treatment guides, and instant WhatsApp chat.',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80',
      customizableOptions: isRtl
        ? ['התראת WhatsApp מיידית לצוות הקליניקה', 'סליידר תמונות לפני/אחרי אינטראקטיבי', 'דפי נחיתה ייעודיים לכל קמפיין ממומן', 'אינטגרציה ל-Meta Pixel ו-Conversion API']
        : ['Instant WhatsApp lead ping to clinic staff', 'Interactive Before/After image slider', 'Dedicated modular ad landing pages', 'Meta Pixel & Conversion API integration'],
      demoTag: isRtl ? 'ארכיטקטורה מותאמת אישית' : 'Custom Architecture'
    }
  ];

  const [activeTab, setActiveTab] = useState(formats[0].id);
  const currentFormat = formats.find((t) => t.id === activeTab) || formats[0];

  return (
    <section className="py-20 bg-[#0a0e17] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-3">
            <Sliders className="w-3.5 h-3.5" />
            <span>{isRtl ? 'ארכיטקטורת Custom מתקדמת • ללא מערכות סגורות' : 'Custom Architecture • Zero Closed Platforms'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
            {isRtl
              ? 'לעבור את תקרת הזכוכית של Wix ו-WordPress'
              : 'Escape the Glass Ceiling of Wix & WordPress'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {isRtl
              ? 'במקום להיתקע במערכות סגורות שמגבילות את הביצועים – ארכיטקטורת React & Node.js מאפשרת להתחיל היום מפורמט מנצח וקטלוג מהיר וממיר, ולהלביש עליו בהמשך מחשבוני מחיר, פורטלים לאדריכלים ואוטומציות, בלי לבנות מחדש לעולם.'
              : 'Instead of hitting the wall of closed builder platforms, custom React & Node.js allows you to launch an ultra-fast catalog site today and bolt on pricing calculators, architect portals, and automations later without rebuilding.'}
          </p>
        </div>

        {/* Industry Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {formats.map((fmt) => (
            <button
              key={fmt.id}
              onClick={() => setActiveTab(fmt.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === fmt.id
                  ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/25 scale-105'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {fmt.category}
            </button>
          ))}
        </div>

        {/* Selected Format Card */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 text-xs font-semibold border border-teal-500/30">
              <Sparkles className="w-3 h-3" />
              <span>{currentFormat.demoTag}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              {currentFormat.title}
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {currentFormat.description}
            </p>

            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                {isRtl ? 'רכיבים ומערכות הניתנים להרחבה:' : 'Modular Expandable Capabilities:'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentFormat.customizableOptions.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>{opt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-teal-500/25 transition-all hover:scale-105"
              >
                <span>{isRtl ? 'אני רוצה אפיון בסגנון הזה' : 'I want a tailored site in this format'}</span>
                <ArrowIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative group">
              <img
                src={currentFormat.image}
                alt={currentFormat.title}
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex items-end p-6">
                <div className="text-xs text-slate-300">
                  <span className="font-bold text-white">{currentFormat.category}</span>
                  <span className="mx-2">•</span>
                  <span>{isRtl ? 'קוד מותאם אישית מלא ב-React' : '100% Custom React Code'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
