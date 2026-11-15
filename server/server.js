const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Path to store leads locally
const leadsFilePath = path.join(__dirname, 'data', 'leads.json');

// Ensure data folder and file exist
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}
if (!fs.existsSync(leadsFilePath)) {
  fs.writeFileSync(leadsFilePath, JSON.stringify([], null, 2), 'utf-8');
}

// Portfolio Projects Data
const portfolioProjects = [
  {
    id: 'tiran-lasry',
    title: 'טירן לסרי - גופי תאורה בעבודת יד',
    titleEn: 'Tiran Lasry - Handmade Lighting Fixtures',
    category: 'אתר בוטיק וקטלוג יוקרתי',
    categoryEn: 'Luxury Boutique & Catalog Showcase',
    url: 'https://tiranlasry.com',
    displayUrl: 'tiranlasry.com',
    description: 'אתר תדמית וקטלוג מרהיב למותג גופי תאורה אדריכליים בעבודת יד. האתר תוכנן במיוחד להעברת חוויית פרימיום, מיקוד באדריכלים ומעצבי פנים, ומערכת איסוף פניות חכמה שממירה מתעניינים להזמנות ייצור.',
    descriptionEn: 'Showcase catalog & brand website for custom architectural lighting studio. Tailored for interior designers and high-end architects with lead capture flow.',
    metrics: [
      { label: 'זמן טעינה', value: '0.8s' },
      { label: 'עלייה בפניות איכותיות', value: '+140%' },
      { label: 'עיצוב מותאם אישית', value: '100%' }
    ],
    features: [
      'גלריית פרויקטים אינטראקטיבית וקלה לעדכון',
      'טופס אפיון והצעת מחיר אישית ישירות ל-WhatsApp',
      'חוויית משתמש מותאמת לסמארטפון ולרשתות חברתיות',
      'SEO אופטימלי לדירוג גבוה בגוגל'
    ],
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Custom Design', 'Catalog', 'High Performance', 'SMB Lead Engine']
  },
  {
    id: 'law-consulting',
    title: 'משרד עורכי דין וייעוץ עסקי',
    titleEn: 'Advocacy & Business Legal Advisory',
    category: 'אתר תדמית ואוטוריטה',
    categoryEn: 'Authority & Practice Growth Site',
    url: '#',
    displayUrl: 'law-firm-template.demo',
    description: 'מערכת דיגיטלית מלאה למשרדי מקצועות חופשיים: זימון פגישות מקוון, בלוג מאמרים משפטיים, הצגת תקדימים וחיבור אוטומטי למערכת CRM.',
    descriptionEn: 'Authority-building portal for legal and business consultants with appointment scheduling and CRM sync.',
    metrics: [
      { label: 'תיאום פגישות ישיר', value: '24/7' },
      { label: 'זמן חיסכון שבועי', value: '8 שעות' }
    ],
    features: [
      'תיאום פגישות אוטומטי מול יומן Google/Outlook',
      'שאלון סינון לקוחות ראשוני חכם',
      'כרטיס ביקור דיגיטלי משולב'
    ],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    tags: ['Booking System', 'Authority', 'CRM Integration']
  },
  {
    id: 'health-clinic',
    title: 'קליניקה לרפואה אסתטית ובריאות',
    titleEn: 'Aesthetic Clinic & Wellness Center',
    category: 'אתר שירותים וקמפיינים ממירים',
    categoryEn: 'Conversion Landing & Clinic Engine',
    url: '#',
    displayUrl: 'clinic-aesthetic.demo',
    description: 'אתר ממיר במיוחד המיועד לקמפיינים ממומנים באינסטגרם וטיקטוק. כולל דפי נחיתה ייעודיים לכל טיפול, המלצות לפני/אחרי, ומענה מהיר בוואטסאפ.',
    descriptionEn: 'High-converting medical and wellness website engineered for Meta/TikTok advertising with before/after showcases.',
    metrics: [
      { label: 'יחס המרה בקמפיינים', value: '8.4%' },
      { label: 'מהירות תגובה לליד', value: '< 1 דקה' }
    ],
    features: [
      'דפי נחיתה מודולריים לקמפיינים ברשתות חברתיות',
      'מעקב פיקסלים ואנליטיקס מתקדם (Meta, Google, TikTok)',
      'התראת WhatsApp מיידית לצוות הקליניקה עם כל ליד חדש'
    ],
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    tags: ['Social Ad Funnels', 'WhatsApp Automation', 'High Conversion']
  }
];

// Services and Packages Data
const servicesData = {
  profile: {
    name: 'צור הרטוב',
    nameEn: 'Tsoor Hartov',
    age: 30,
    academic: 'B.Sc',
    certifications: ['Coding Academy Full-Stack Certified', 'Information Systems Expert', 'Project Manager', 'Logistics & Supply Chain Specialist'],
    title: 'מומחה מערכות מידע, מנהל פרויקטים ומפתח Full-Stack מוסמך Coding Academy (בעל תואר B.Sc)',
    titleEn: 'Information Systems Expert, Project Manager & Coding Academy Certified Full-Stack Developer (B.Sc)',
    specialties: ['כלי AI מתקדמים לעיצוב ובניית כלים', 'לוגיסטיקה ושרשרת אספקה', 'בניית אתרי פרימיום לעסקים בקאסטום', 'אוטומציות WhatsApp ו-CRM', 'ניהול פרויקטים'],
    location: 'ישראל (עבודה עם עסקים בכל הארץ)',
    phone: '050-593-5609',
    email: 'contact@tsoorhartov.com',
    whatsappMessage: 'היי צור, ראיתי את האתר שלך ואשמח לשמוע פרטים על בניית אתר/אוטומציות לעסק שלי.'
  },
  pricingModel: {
    showExactPricing: true, // Toggleable by Tsoor
    basePackage: {
      name: 'חבילת הדגל: אתר Custom מלא + שותף עיצובי וטכנולוגי',
      nameEn: 'The Flagship Business Package: 100% Custom Build & Design Partner',
      oneTimeSetupILS: 10000,
      monthlyMaintenanceILS: 800,
      setupNote: 'תשלום חד-פעמי להקמת ארכיטקטורת Custom מלאה למובייל ולמחשב (ללא תבניות מדף מוגבלות)',
      maintenanceNote: 'ליווי שוטף, אבטחה, אחסון פרימיום, והצעות שוטפות יזומות לשדרוג הנראות והתאמה לעסק',
      included: [
        'פיתוח Custom מלא בקוד עצמאי (React / Node.js) — ללא נעילה בתבניות סגורות',
        'דגש פיתוח קפדני על התאמה מושלמת למובייל ולמחשב (0.8s מהירות)',
        'יכולת הרחבה בלתי מוגבלת: הוספת עמודים, מערכות ופונקציות בכל שלב עם גדילת העסק',
        'קשר שוטף לאחר העלייה לאוויר והצעות יזומות מצור לשדרוג ורענון העיצוב',
        'אפיון מערכות מידע ומחקר מתחרים מעמיק ע״י מנהל פרויקטים (B.Sc)',
        'חיבור מהיר ל-WhatsApp וכפתורי יצירת קשר ממוקדי המרה',
        'אופטימיזציה מלאה לפרסום ממומן ברשתות חברתיות (Facebook, Instagram, TikTok)',
        'תשתית SEO מתקדמת לדירוג בגוגל',
        'בחירת כתובת דומיין מותאמת אישית (.co.il / .com) + חיבור DNS ותעודת SSL',
        'אפשרות שדרוג למערך תיבות דוא״ל עסקיות יוקרתיות (Google Workspace / 365)',
        'תחזוקה חודשית: גיבויים שוטפים, עדכוני אבטחה ושקט נפשי מתמיד'
      ]
    },
    customChangesPolicy: 'האתר נבנה בקאסטום ומאפשר הוספת פיצ׳רים ומודולים בכל עת. שינויים והרחבות מורכבות מעבר לאפיון הבסיס (כגון מערכות ייעודיות נוספות או אוטומציות מורכבות) יתומחרו בנפרד בשקיפות מלאה.',
    addons: [
      { id: 'ai-tools', name: 'כלי AI מתקדמים (עיצוב ומחשבונים אינטראקטיביים לעסק)', priceILS: 2500, recurringILS: 150, desc: 'שילוב כלי AI מובילים לעיצוב נכסים דיגיטליים, מחשבונים חכמים וכלים ייעודיים לעסק' },
      { id: 'domain-emails', name: 'דומיין מותאם אישית ותיבות דוא״ל עסקיות יוקרתיות', priceILS: 1200, recurringILS: 80, desc: 'רישום דומיין, הגדרת תיבות מייל ב-Google Workspace / 365, חתימות מעוצבות ואבטחת SPF/DKIM' },
      { id: 'lead-alerts', name: 'התראות לידים מיידיות לוואטסאפ (050-593-5609)', priceILS: 1500, recurringILS: 100, desc: 'קבלת הודעת WhatsApp מיידית לנייד עם כל פרטי הליד והצרכים שלו' },
      { id: 'crm-sync', name: 'חיבור למערכת CRM (Monday, Airtable, HubSpot)', priceILS: 2000, recurringILS: 150, desc: 'סנכרון מלא של כל הלידים והלקוחות ישירות למערכת הניהול שלך' },
      { id: 'invoicing', name: 'הפקת חשבוניות אוטומטית (סליקה וחשבונית ירוקה/מורנינג)', priceILS: 2200, recurringILS: 100, desc: 'הלקוח משלם והחשבונית נשלחת אליו מיידית למייל ללא מגע יד אדם' },
      { id: 'multilingual', name: 'אתר דו-לשוני מלא (עברית ואנגלית)', priceILS: 2800, recurringILS: 100, desc: 'ממשק RTL ו-LTR מלא עם מתג שפות מהיר' }
    ]
  }
};

// Routes
// 1. Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Tsoor Hartov Business Website API'
  });
});

// 2. Portfolio Projects
app.get('/api/portfolio', (req, res) => {
  res.json({
    success: true,
    projects: portfolioProjects
  });
});

// 3. Services and Pricing
app.get('/api/services', (req, res) => {
  res.json({
    success: true,
    data: servicesData
  });
});

// 4. Interactive Estimate Calculator
app.post('/api/estimate', (req, res) => {
  const { selectedAddons = [], customNeeds = '', maintenanceMonths = 12 } = req.body;
  const baseSetup = servicesData.pricingModel.basePackage.oneTimeSetupILS;
  const baseMonthly = servicesData.pricingModel.basePackage.monthlyMaintenanceILS;

  let addonSetupTotal = 0;
  let addonMonthlyTotal = 0;

  servicesData.pricingModel.addons.forEach(addon => {
    if (selectedAddons.includes(addon.id)) {
      addonSetupTotal += addon.priceILS;
      addonMonthlyTotal += (addon.recurringILS || 0);
    }
  });

  const totalSetup = baseSetup + addonSetupTotal;
  const totalMonthly = baseMonthly + addonMonthlyTotal;
  const annualTotal = totalSetup + (totalMonthly * maintenanceMonths);

  res.json({
    success: true,
    summary: {
      baseSetupILS: baseSetup,
      baseMonthlyILS: baseMonthly,
      addonsSetupILS: addonSetupTotal,
      addonsMonthlyILS: addonMonthlyTotal,
      totalSetupILS: totalSetup,
      totalMonthlyILS: totalMonthly,
      estimatedAnnualTotalILS: annualTotal,
      currency: 'ILS (₪)'
    }
  });
});

// 5. Submit Lead / Contact Form
app.post('/api/leads', (req, res) => {
  try {
    const { name, phone, email, businessType, currentWebsite, needs, budget, message, referralSource } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        error: 'נא למלא לפחות שם ומספר טלפון תקינים'
      });
    }

    const newLead = {
      id: 'lead_' + Date.now(),
      createdAt: new Date().toISOString(),
      name,
      phone,
      email: email || '',
      businessType: businessType || 'כללי / עסק קטן-בינוני',
      currentWebsite: currentWebsite || '',
      needs: needs || ['בניית אתר חדש'],
      budget: budget || 'סטנדרטי (10,000 ₪ + תחזוקה)',
      message: message || '',
      referralSource: referralSource || 'אתר ראשי / רשתות חברתיות',
      status: 'new'
    };

    // Read existing leads
    let leads = [];
    try {
      const fileData = fs.readFileSync(leadsFilePath, 'utf-8');
      leads = JSON.parse(fileData);
    } catch (readErr) {
      leads = [];
    }

    leads.unshift(newLead);
    fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), 'utf-8');

    // Simulate automation trigger: In production, this triggers WhatsApp API, Telegram bot, or Webhook to CRM
    console.log(`[AUTOMATION TRIGGER] New Lead Received: ${name} (${phone}) - Business: ${businessType}`);

    res.status(201).json({
      success: true,
      message: 'הפנייה התקבלה בהצלחה! צור הרטוב יחזור אליך בהקדם.',
      leadId: newLead.id
    });
  } catch (err) {
    console.error('Error saving lead:', err);
    res.status(500).json({
      success: false,
      error: 'אירעה שגיאה בשמירת הפנייה. נסה שוב או פנה ישירות בוואטסאפ.'
    });
  }
});

// 6. Get Leads (Admin / Tsoor view)
app.get('/api/leads', (req, res) => {
  try {
    const fileData = fs.readFileSync(leadsFilePath, 'utf-8');
    const leads = JSON.parse(fileData);
    res.json({
      success: true,
      count: leads.length,
      leads
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to read leads' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Tsoor Hartov Backend Server running on port ${PORT}`);
  console.log(`👉 Health check: http://localhost:${PORT}/api/health`);
  console.log(`👉 Leads API: http://localhost:${PORT}/api/leads`);
});
