import { useState } from 'react';
import { Mail, Globe, Linkedin, Send, CheckCircle, AlertCircle, MapPin, ChevronDown } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (!data.name.trim()) errors.name = 'Name is required.';
  if (!data.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email.';
  }
  if (!data.subject.trim()) errors.subject = 'Subject is required.';
  if (!data.message.trim()) errors.message = 'Message is required.';
  else if (data.message.trim().length < 20) errors.message = 'Message must be at least 20 characters.';
  return errors;
}

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@rakeshveerapaneni.com',
    href: 'mailto:hello@rakeshveerapaneni.com',
  },
  {
    icon: Globe,
    label: 'Website',
    value: 'www.rakeshveerapaneni.com',
    href: 'https://www.rakeshveerapaneni.com',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Connect on LinkedIn',
    href: 'https://www.linkedin.com/in/rakeshveerapaneni',
  },
  {
    icon: MapPin,
    label: 'Based in',
    value: 'India',
    href: null,
  },
];

const FIELD_ORDER: (keyof FormData)[] = ['name', 'email', 'subject', 'message'];

function fieldClass(hasError: boolean, extra = '') {
  return [
    'w-full px-4 py-3 rounded-xl bg-navy-800/60 border text-white',
    // 16px on mobile — anything smaller makes iOS Safari zoom in on focus and
    // leaves the user scrolled sideways on a page they can no longer read.
    'text-base sm:text-sm',
    'placeholder-slate-600 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all',
    hasError ? 'border-red-400/50' : 'border-white/10',
    extra,
  ]
    .filter(Boolean)
    .join(' ');
}

export default function Contact() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // On a phone the invalid field is usually scrolled off screen, so send
      // the user straight to it instead of leaving the form looking inert.
      const firstInvalid = FIELD_ORDER.find((key) => errs[key]);
      if (firstInvalid) {
        document.getElementById(`contact-${firstInvalid}`)?.focus();
      }
      return;
    }
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.location.href = `mailto:hello@rakeshveerapaneni.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="relative py-16 sm:py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-navy-950" />
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500/4 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14 lg:mb-16 reveal">
          <span className="inline-block text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-3">
            Get In Touch
          </span>
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Whether you're looking to collaborate, discuss a project, book a workshop, or simply connect — I'd love to hear from you.
          </p>
          <div className="section-divider w-24 mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 items-start">
          {/* Left: Info */}
          <div className="reveal-left space-y-6">
            <div>
              <h3 className="font-display font-bold text-white text-lg sm:text-xl mb-2">Let's Work Together</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Available for collaborations with educational institutions, industries, startups, and research organizations. Open to speaking engagements, technology consulting, and partnership discussions.
              </p>
            </div>

            <div className="space-y-3">
              {contactInfo.map((c) => (
                <div key={c.label} className="flex items-center gap-3 sm:gap-4 glass-card rounded-xl p-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-400/10 flex items-center justify-center flex-none">
                    <c.icon className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-slate-500 text-xs">{c.label}</p>
                    {c.href ? (
                      <a
                        href={c.href}
                        target={c.href.startsWith('http') ? '_blank' : undefined}
                        rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-white text-sm font-medium hover:text-cyan-400 transition-colors break-words"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <span className="text-white text-sm font-medium">{c.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick email CTA */}
            <div className="glass rounded-2xl p-5 border border-cyan-400/10">
              <p className="text-white font-semibold text-sm mb-1">Prefer direct email?</p>
              <p className="text-slate-400 text-xs mb-3">Send a message directly to Rakesh's inbox.</p>
              <a
                href="mailto:hello@rakeshveerapaneni.com"
                className="inline-flex items-center gap-2 min-h-[44px] py-2 text-cyan-400 text-sm font-semibold hover:text-cyan-300 active:text-cyan-300 transition-colors break-all"
              >
                <Mail className="w-4 h-4 flex-none" />
                hello@rakeshveerapaneni.com
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal-right">
            <div className="glass rounded-2xl p-5 sm:p-6 lg:p-8 border border-cyan-400/10">
              {status === 'success' ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                  <h3 className="font-display font-bold text-white text-lg mb-2">Message Prepared!</h3>
                  <p className="text-slate-400 text-sm mb-6 break-words">
                    Your email client should open with your message. If it didn't, please email directly at hello@rakeshveerapaneni.com
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-5 min-h-[48px] rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-sm font-semibold hover:bg-cyan-400/20 active:bg-cyan-400/20 transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-slate-400 text-xs mb-1.5">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Full name"
                        autoComplete="name"
                        enterKeyHint="next"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        className={fieldClass(!!errors.name)}
                      />
                      {errors.name && (
                        <p id="contact-name-error" role="alert" className="flex items-center gap-1 text-red-400 text-xs mt-1">
                          <AlertCircle className="w-3 h-3 flex-none" /> {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-slate-400 text-xs mb-1.5">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        autoComplete="email"
                        inputMode="email"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                        enterKeyHint="next"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        className={fieldClass(!!errors.email)}
                      />
                      {errors.email && (
                        <p id="contact-email-error" role="alert" className="flex items-center gap-1 text-red-400 text-xs mt-1">
                          <AlertCircle className="w-3 h-3 flex-none" /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-slate-400 text-xs mb-1.5">
                      Subject *
                    </label>
                    {/* appearance-none strips the native arrow, so one is drawn back in. */}
                    <div className="relative">
                      <select
                        id="contact-subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                        className={fieldClass(!!errors.subject, 'appearance-none pr-10')}
                      >
                        <option value="" className="bg-navy-900">Select a topic…</option>
                        <option value="Collaboration Opportunity" className="bg-navy-900">Collaboration Opportunity</option>
                        <option value="Speaking / Workshop Request" className="bg-navy-900">Speaking / Workshop Request</option>
                        <option value="Technology Consulting" className="bg-navy-900">Technology Consulting</option>
                        <option value="Partnership" className="bg-navy-900">Partnership</option>
                        <option value="STEM Program Inquiry" className="bg-navy-900">STEM Program Inquiry</option>
                        <option value="Investment / Funding" className="bg-navy-900">Investment / Funding</option>
                        <option value="General Inquiry" className="bg-navy-900">General Inquiry</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    </div>
                    {errors.subject && (
                      <p id="contact-subject-error" role="alert" className="flex items-center gap-1 text-red-400 text-xs mt-1">
                        <AlertCircle className="w-3 h-3 flex-none" /> {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-slate-400 text-xs mb-1.5">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell me about your project, collaboration idea, or question…"
                      enterKeyHint="enter"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      className={fieldClass(!!errors.message, 'resize-y min-h-[120px]')}
                    />
                    {errors.message && (
                      <p id="contact-message-error" role="alert" className="flex items-center gap-1 text-red-400 text-xs mt-1">
                        <AlertCircle className="w-3 h-3 flex-none" /> {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 min-h-[52px] rounded-xl bg-cyan-400 text-navy-950 font-bold text-sm tracking-wide hover:bg-cyan-300 active:bg-cyan-300 transition-all duration-200 shadow-lg shadow-cyan-400/15 hover:shadow-cyan-400/30"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
