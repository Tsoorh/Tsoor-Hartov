require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
let nodemailer;
try {
  nodemailer = require('nodemailer');
} catch (e) {
  nodemailer = null;
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Transporter helper for email notifications
const createTransporter = () => {
  if (!nodemailer) return null;
  const user = process.env.SMTP_USER || process.env.ADMIN_EMAIL;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    family: 4, // Force IPv4 to prevent cloud IPv6 DNS/connection hangs
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
    auth: {
      user,
      pass
    }
  });
};

// Email validation helper
const isValidEmail = (emailStr) => {
  return typeof emailStr === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr.trim());
};

// Async non-blocking lead email notification
const sendLeadNotificationAsync = async (lead) => {
  const { name, phone, email, businessType, currentWebsite, needs, message } = lead;
  const adminEmail = process.env.ADMIN_EMAIL || 'tsoor.hartov@gmail.com';
  const transporter = createTransporter();
  let emailSent = false;

  const rawDigits = (phone || '').replace(/[^0-9]/g, '');
  const waDigits = rawDigits.startsWith('972') ? rawDigits : rawDigits.replace(/^0/, '972');
  const waLink = `https://wa.me/${waDigits}?text=${encodeURIComponent(`היי ${name}, צור הרטוב כאן בקשר לפנייתך באתר!`)}`;
  const validEmail = isValidEmail(email) ? email.trim() : null;

  const subject = `פנייה חדשה מהאתר: ${name} (${phone}) - ${businessType || 'עסק'}`;

  const plainText = [
    `פנייה חדשה התקבלה באתר:`,
    `----------------------------------------`,
    `שם הלקוח: ${name}`,
    `טלפון: ${phone}`,
    validEmail ? `אימייל: ${validEmail}` : `אימייל: לא צוין`,
    `תחום עיסוק: ${businessType || 'לא צוין'}`,
    currentWebsite ? `אתר קיים: ${currentWebsite}` : null,
    `מעוניין ב: ${Array.isArray(needs) ? needs.join(', ') : needs}`,
    message ? `הודעה:\n${message}` : null,
    `----------------------------------------`,
    `מענה מהיר ב-WhatsApp: ${waLink}`,
    `תאריך ושעה: ${new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' })}`
  ].filter(Boolean).join('\n');

  if (transporter) {
    const mailOptions = {
      from: `"צור הרטוב - אתר" <${process.env.SMTP_USER || adminEmail}>`,
      to: adminEmail,
      replyTo: validEmail || undefined,
      subject,
      text: plainText,
      html: `
        <div dir="rtl" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #0f172a; color: #f8fafc; padding: 25px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
          <div style="border-bottom: 2px solid #14b8a6; padding-bottom: 12px; margin-bottom: 18px;">
            <h2 style="color: #14b8a6; margin: 0 0 6px 0; font-size: 22px;">פנייה חדשה מהאתר</h2>
            <p style="color: #94a3b8; margin: 0; font-size: 13px;">התקבל בתאריך: ${new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' })}</p>
          </div>

          <div style="background: #1e293b; padding: 18px; border-radius: 8px; margin-bottom: 18px; border: 1px solid #334155;">
            <h3 style="color: #f1f5f9; margin-top: 0; font-size: 16px; border-bottom: 1px solid #334155; padding-bottom: 6px;">פרטי הפנייה</h3>
            <p style="margin: 8px 0; font-size: 14px;"><strong>שם הלקוח:</strong> ${name}</p>
            <p style="margin: 8px 0; font-size: 14px;"><strong>טלפון:</strong> <a href="tel:${phone}" style="color: #38bdf8; text-decoration: none;">${phone}</a></p>
            ${validEmail ? `<p style="margin: 8px 0; font-size: 14px;"><strong>אימייל:</strong> <a href="mailto:${validEmail}" style="color: #38bdf8; text-decoration: none;">${validEmail}</a></p>` : ''}
            <p style="margin: 8px 0; font-size: 14px;"><strong>תחום עיסוק:</strong> ${businessType || 'לא צוין'}</p>
            ${currentWebsite ? `<p style="margin: 8px 0; font-size: 14px;"><strong>אתר קיים:</strong> <a href="${currentWebsite}" target="_blank" style="color: #38bdf8;">${currentWebsite}</a></p>` : ''}
            <p style="margin: 8px 0; font-size: 14px;"><strong>מעוניין ב:</strong> ${Array.isArray(needs) ? needs.join(', ') : needs}</p>
            ${message ? `<div style="margin-top: 12px; padding: 10px; background: #0f172a; border-radius: 6px; border-right: 3px solid #14b8a6; font-size: 13px;"><strong>הודעה:</strong><br/>${message.replace(/\n/g, '<br/>')}</div>` : ''}
          </div>

          <div style="text-align: center; margin-top: 20px;">
            <a href="${waLink}" target="_blank" style="background: #25D366; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block; margin-left: 8px; font-size: 14px;">
              מענה מהיר ב-WhatsApp
            </a>
            <a href="tel:${phone}" style="background: #0284c7; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 14px;">
              חייג ללקוח
            </a>
          </div>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      emailSent = true;
      console.log(`[EMAIL DISPATCH] Lead email sent to ${adminEmail} via SMTP successfully.`);
    } catch (mailErr) {
      console.error('[EMAIL ERROR] Failed to send email via SMTP:', mailErr.message);
    }
  } else {
    console.log('[LEAD NOTIFICATION] SMTP not configured on server; client-side FormSubmit delivers email directly to inbox.');
  }

  return emailSent;
};

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
    academic: 'B.Sc',
    certifications: ['Coding Academy Full-Stack Certified', 'Information Systems Expert', 'Project Manager', 'Logistics & Supply Chain Specialist'],
    title: 'מומחה מערכות מידע, מנהל פרויקטים ומפתח Full-Stack מוסמך Coding Academy (בעל תואר B.Sc)',
    titleEn: 'Information Systems Expert, Project Manager & Coding Academy Certified Full-Stack Developer (B.Sc)',
    specialties: ['כלי AI מתקדמים לעיצוב ובניית כלים', 'לוגיסטיקה ושרשרת אספקה', 'בניית אתרי פרימיום מותאמים אישית לעסקים', 'אוטומציות WhatsApp ו-CRM', 'ניהול פרויקטים'],
    location: 'ישראל (עבודה עם עסקים בכל הארץ)',
    phone: '050-593-5609',
    email: 'contact@tsoorhartov.com',
    whatsappMessage: 'היי צור, ראיתי את האתר שלך ואשמח לשמוע פרטים על בניית אתר/אוטומציות לעסק שלי.'
  },
  pricingModel: {
    showExactPricing: true,
    setupPackage: {
      name: 'הקמת האתר: ארכיטקטורת Custom מלאה ב-React ו-Node.js',
      nameEn: 'Platform Setup: 100% Custom React & Node.js Architecture',
      oneTimeSetupILS: 10000,
      setupNote: 'תשלום חד-פעמי להקמת נכס דיגיטלי עצמאי, מהיר ומאובטח ללא מערכות סגורות',
      included: [
        'פיתוח Custom מלא בקוד עצמאי (React / Node.js) ללא נעילה במערכות סגורות',
        'התאמה רספונסיבית מוקפדת למובייל ולמחשב (0.8s מהירות טעינה)',
        'הזרמת תמונות ומדיה מהירה בענן (CDN מנוהל)',
        'חיבור מהיר ל-WhatsApp וכפתורי יצירת קשר ממוקדי המרה',
        'חיבור דומיין אישי, תעודת SSL ואבטחת DNS מלאה',
        'מקצה שיפורים ממוקד לאחר העלייה לאוויר (Fine-Tuning)'
      ]
    },
    retainerTiers: [
      {
        id: 'essential',
        name: 'מסלול תשתית ושקט טכני',
        nameEn: 'Essential Ops',
        monthlyILS: 450,
        features: [
          'אחסון ענן מהיר וייעודי + רשת CDN גלובלית',
          'תעודת אבטחה SSL וגיבויים יומיים אוטומטיים',
          'ניטור זמינות 24/7 ותיקון תקלות תשתית ובאגים',
          'התראות לידים ישירות למייל ולוואטסאפ'
        ],
        extraHoursRateILS: 250
      },
      {
        id: 'managed',
        name: 'מסלול ניהול מלא בראש שקט',
        nameEn: 'All-Inclusive Managed',
        badge: 'הבחירה המשתלמת והמומלצת',
        monthlyILS: 800,
        features: [
          'כולל את כל מרכיבי מסלול התשתית (450 ₪)',
          'עד שעתיים חודשיות של עדכוני תוכן וקטלוג ישירות דרך WhatsApp (שווי 500 ₪)',
          'מענה ותמיכה בוואטסאפ בעדיפות גבוהה (תוך יום עסקים אחד)',
          'דוח ביצועים ותנועת גולשים חודשי מרוכז'
        ]
      }
    ],
    antiLockInGuarantee: 'הדומיין, התמונות, הטקסטים וכל נתוני הלקוחות שייכים לכם ב-100%. ניתן לעבור בין מסלולים או לסיים התקשרות בכל עת בהתראה של 30 יום מראש ולקבל ייצוא מלא של כל הנכסים והנתונים ללא שום קנסות.',
    addons: [
      { id: 'business-tools', name: 'מחשבוני הצעות מחיר וכלים דיגיטליים אינטראקטיביים', priceILS: 2500, recurringILS: 150, desc: 'מחשבונים חכמים ושאלוני סינון ייעודיים לעסק שמזרימים לידים בשלים' },
      { id: 'domain-emails', name: 'דומיין מותאם אישית ותיבות דוא״ל עסקיות יוקרתיות', priceILS: 1200, recurringILS: 80, desc: 'רישום דומיין, הגדרת תיבות מייל ב-Google Workspace / 365, חתימות מעוצבות ואבטחת SPF/DKIM' },
      { id: 'lead-alerts', name: 'התראות לידים מיידיות לוואטסאפ (050-593-5609)', priceILS: 1500, recurringILS: 100, desc: 'קבלת הודעת WhatsApp מיידית לנייד עם כל פרטי הליד והצרכים שלו תוך 5 שניות' },
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
  const baseSetup = servicesData.pricingModel.setupPackage.oneTimeSetupILS;
  const baseMonthly = servicesData.pricingModel.retainerTiers[1].monthlyILS;

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

// 5. Submit Lead / Contact Form (Instant <50ms response, async background dispatch)
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
    try {
      fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), 'utf-8');
    } catch (writeErr) {
      console.warn('Could not write leads file (read-only environment):', writeErr.message);
    }

    console.log(`[AUTOMATION TRIGGER] New Lead Received: ${name} (${phone}) - Business: ${businessType}`);

    // Asynchronously dispatch email notification in the background (Non-blocking)
    sendLeadNotificationAsync(newLead).catch((dispatchErr) => {
      console.error('[BG NOTIFICATION ERROR]', dispatchErr.message);
    });

    // Respond immediately to the client (< 50ms)
    return res.status(201).json({
      success: true,
      message: 'הפנייה התקבלה בהצלחה! צור יחזור אליך בהקדם.',
      leadId: newLead.id
    });
  } catch (err) {
    console.error('Error saving lead:', err);
    return res.status(500).json({
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
