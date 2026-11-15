import React, { useState } from 'react';
import { Send, MessageSquare, Phone, Mail, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export default function ContactSection({ content, lang }) {
  const { contact } = content;
  const isRtl = lang === 'he';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    businessType: '',
    currentWebsite: '',
    needs: [contact.needsOptions[0]],
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleNeed = (option) => {
    if (formData.needs.includes(option)) {
      setFormData({
        ...formData,
        needs: formData.needs.filter((item) => item !== option)
      });
    } else {
      setFormData({
        ...formData,
        needs: [...formData.needs, option]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setErrorMessage(isRtl ? 'נא למלא שם ומספר טלפון תקינים' : 'Please provide at least your name and phone number');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
    let delivered = false;

    console.log('[LEAD DISPATCH] API_BASE configured:', API_BASE || '(none - using local /api/leads)');

    // 1. Try Render Backend API (if VITE_API_URL is configured or relative proxy)
    try {
      const targetUrl = API_BASE ? `${API_BASE}/api/leads` : '/api/leads';
      console.log('[LEAD DISPATCH] Submitting lead to:', targetUrl);

      const controller = new AbortController();
      // 35s timeout to allow Render free-tier cold start if sleeping
      const timeoutId = setTimeout(() => controller.abort(), 35000);

      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      console.log('[LEAD DISPATCH] Server response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('[LEAD DISPATCH] Server response data:', data);
        if (data.emailSent) {
          delivered = true;
          console.log('[LEAD DISPATCH] Email successfully sent via backend server!');
        } else {
          console.warn('[LEAD DISPATCH] Server received lead, but emailSent is false:', data.emailMethod);
        }
      } else {
        console.warn('[LEAD DISPATCH] Server responded with error status:', response.status);
      }
    } catch (apiErr) {
      console.warn('[LEAD DISPATCH] Backend API unavailable or timed out, triggering instant direct fallback...', apiErr);
    }

    // 2. High-reliability fallback: if backend didn't send email or is sleeping, dispatch directly via FormSubmit
    if (!delivered) {
      console.log('[LEAD DISPATCH] Triggering direct FormSubmit fallback...');
      try {
        const fsRes = await fetch('https://formsubmit.co/ajax/tsoor.hartov@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `🔥 ליד חדש מהאתר: ${formData.name} (${formData.phone})`,
            _captcha: 'false',
            _template: 'table',
            name: formData.name,
            phone: formData.phone,
            email: formData.email || 'לא צוין',
            businessType: formData.businessType || 'כללי',
            currentWebsite: formData.currentWebsite || 'אין',
            needs: Array.isArray(formData.needs) ? formData.needs.join(', ') : formData.needs,
            message: formData.message || 'אין הודעה נוספת',
            submittedAt: new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' })
          })
        });
        const fsData = await fsRes.json();
        console.log('[LEAD DISPATCH] FormSubmit result:', fsData);
        if (fsData.success === 'true' || fsData.success === true) {
          delivered = true;
        } else if (fsData.message && fsData.message.includes('Activation')) {
          console.warn('[LEAD DISPATCH] FormSubmit is pending email activation! Please check your Gmail (including Spam).');
        }
      } catch (fallbackErr) {
        console.error('[LEAD DISPATCH] Direct fallback error:', fallbackErr);
      }
    }

    setSubmitted(true);
    setSubmitting(false);
  };

  const whatsappMessage = encodeURIComponent(
    isRtl
      ? `היי צור, ראיתי את האתר שלך ואשמח לשמוע פרטים על בניית אתר/אוטומציות לעסק שלי.`
      : `Hi Tsoor, I saw your site and would like to consult about website development and automations for my business.`
  );

  const directWhatsappUrl = `https://wa.me/972505935609?text=${whatsappMessage}`;

  const submittedWhatsappUrl = `https://wa.me/972505935609?text=${encodeURIComponent(
    isRtl
      ? `היי צור, השארתי כרגע פרטים באתר:\nשם: ${formData.name}\nטלפון: ${formData.phone}${formData.businessType ? `\nתחום: ${formData.businessType}` : ''}\nאשמח שנדבר!`
      : `Hi Tsoor, I just submitted an inquiry on your site:\nName: ${formData.name}\nPhone: ${formData.phone}\nLooking forward to speaking!`
  )}`;

  return (
    <section id="contact" className="py-24 bg-[#0b0f19] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isRtl ? 'בואו נדבר תכלס' : 'Let’s Connect'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            {contact.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto">
          {/* Direct WhatsApp Callout Box (Left / Right) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-emerald-950/20 border border-emerald-500/30 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between h-full shadow-xl">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6">
                  <MessageSquare className="w-7 h-7" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  {contact.directWhatsappTitle}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {contact.directWhatsappDesc}
                </p>

                <div className="space-y-3 pt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{isRtl ? 'מענה ישיר מצור (ללא מזכירות או בוטים מסורבלים)' : 'Direct response from Tsoor (no bot loops)'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{isRtl ? 'אפיון ראשוני ללא התחייבות' : 'No-obligation initial consultation'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{isRtl ? 'אתרים מותאמים אישית, כלים דיגיטליים ואוטומציות' : 'Custom Web Platforms, Business Tools & Automations'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <div className="mb-2 text-center text-xs text-slate-400 font-mono">
                  {isRtl ? 'טלפון ישיר: 050-593-5609' : 'Direct line: +972-50-593-5609'}
                </div>
                <a
                  href={directWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-xl shadow-[#25D366]/30 transition-all hover:scale-105 active:scale-95"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 64 64">
                    <path fill="#25D366" d="M32 2C15.432 2 2 15.432 2 32c0 5.293 1.378 10.274 3.791 14.604L2 62l15.86-4.152A29.835 29.835 0 0 0 32 62c16.568 0 30-13.432 30-30S48.568 2 32 2z"/>
                    <path fill="#FFFFFF" d="M47.79 38.835c-.792-.397-4.686-2.312-5.411-2.576-.726-.264-1.255-.396-1.784.397-.528.792-2.046 2.576-2.508 3.104-.462.529-.924.594-1.716.198-.792-.396-3.344-1.232-6.37-3.93-2.355-2.099-3.945-4.693-4.407-5.485-.462-.792-.049-1.22.347-1.614.357-.356.792-.924 1.188-1.386.396-.462.528-.792.792-1.32.264-.528.132-.99-.066-1.386-.198-.396-1.784-4.298-2.443-5.883-.643-1.545-1.298-1.334-1.783-1.36-.462-.022-.99-.026-1.518-.026-.528 0-1.386.198-2.112.99-.726.792-2.772 2.706-2.772 6.6 0 3.894 2.838 7.656 3.234 8.184.396.528 5.584 8.528 13.528 11.956 1.89.816 3.364 1.303 4.514 1.666 1.897.604 3.624.519 4.988.315 1.523-.227 4.686-1.914 5.346-3.762.66-1.848.66-3.432.462-3.762-.198-.33-.726-.528-1.518-.924z"/>
                  </svg>
                  <span>{contact.directWhatsappBtn}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form Box */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center mx-auto mb-4 border border-teal-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {isRtl ? 'הפנייה התקבלה בהצלחה!' : 'Inquiry Received Successfully!'}
                </h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  {contact.successMsg}
                </p>
                <div className="pt-4">
                  <a
                    href={submittedWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 text-white font-semibold text-xs sm:text-sm hover:bg-teal-400 transition-colors"
                  >
                    <span>{isRtl ? 'שלח הודעה גם בוואטסאפ לזירוז' : 'Speed up response via WhatsApp'}</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {contact.nameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={contact.namePlaceholder}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-teal-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {contact.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={contact.phonePlaceholder}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-teal-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {contact.emailLabel}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={contact.emailPlaceholder}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-teal-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {contact.businessTypeLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      placeholder={contact.businessTypePlaceholder}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-teal-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Multiple Needs Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    {contact.needsLabel}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {contact.needsOptions.map((opt, i) => {
                      const isChecked = formData.needs.includes(opt);
                      return (
                        <div
                          key={i}
                          onClick={() => toggleNeed(opt)}
                          className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-colors ${
                            isChecked
                              ? 'bg-teal-950/40 border-teal-500/60 text-white font-medium'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <span>{opt}</span>
                          <span
                            className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] ${
                              isChecked ? 'bg-teal-500 text-white' : 'border border-slate-700'
                            }`}
                          >
                            {isChecked && '✓'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {contact.messageLabel}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={contact.messagePlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-teal-500 transition-colors"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 text-white font-bold text-sm shadow-xl shadow-teal-500/25 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? contact.submittingBtn : contact.submitBtn}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
