import { Cpu, Mail, Globe, Linkedin, ArrowUpCircle } from 'lucide-react';

const footerNav = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Publications', href: '#publications' },
  { label: 'Talks', href: '#talks' },
  { label: 'Collaborate', href: '#collaborate' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Mail, label: 'Email', href: 'mailto:hello@rakeshveerapaneni.com' },
  { icon: Globe, label: 'Website', href: 'https://www.rakeshveerapaneni.com' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/rakeshveerapaneni' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-navy-950 border-t border-white/5">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="font-display font-bold text-white">
                Rakesh Veerapaneni
              </span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed mb-4">
              Robotics Engineer, AI Innovator, and Founder & CEO of Keshava Elite Projects (KEP). Building the future of Robotics, AI & Industry 5.0.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg glass-light border border-white/5 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Navigation</h4>
            <div className="grid grid-cols-2 gap-1">
              {footerNav.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-slate-500 text-xs hover:text-cyan-400 transition-colors py-1"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <div className="space-y-2">
              <a
                href="mailto:hello@rakeshveerapaneni.com"
                className="flex items-center gap-2 text-slate-500 text-xs hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400/50" />
                hello@rakeshveerapaneni.com
              </a>
              <a
                href="https://www.rakeshveerapaneni.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-500 text-xs hover:text-cyan-400 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400/50" />
                www.rakeshveerapaneni.com
              </a>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="border-t border-white/5 pt-8 mb-8">
          <blockquote className="text-center">
            <p className="text-slate-400 text-sm italic">
              "Innovation begins with curiosity, grows through experimentation, and creates impact through execution."
            </p>
            <footer className="text-slate-600 text-xs mt-2">— Rakesh Veerapaneni</footer>
          </blockquote>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Rakesh Veerapaneni. All rights reserved. |{' '}
            <a
              href="https://kep.co.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              Keshava Elite Projects (KEP)
            </a>
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-slate-600 text-xs hover:text-cyan-400 transition-colors group"
            aria-label="Back to top"
          >
            Back to top
            <ArrowUpCircle className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
