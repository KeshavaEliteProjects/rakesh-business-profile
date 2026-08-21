import { ArrowRight, School, Building2, FlaskConical, Rocket, Users, Landmark, Globe, Cpu } from 'lucide-react';

const partners = [
  { icon: School, label: 'Schools', desc: 'K-12 robotics & STEM programs' },
  { icon: Building2, label: 'Colleges & Universities', desc: 'Engineering curriculum & labs' },
  { icon: Cpu, label: 'Industries', desc: 'Automation & AI consulting' },
  { icon: Rocket, label: 'Startups', desc: 'Product development & mentoring' },
  { icon: FlaskConical, label: 'Research Labs', desc: 'Joint R&D initiatives' },
  { icon: Users, label: 'Investors', desc: 'Scaling KEP\'s technology products' },
  { icon: Landmark, label: 'Government', desc: 'Policy & STEM initiatives' },
  { icon: Globe, label: 'Technology Partners', desc: 'Co-building innovative solutions' },
];

export default function Collaborate() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="collaborate" className="relative py-16 sm:py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-navy-900/80" />
      <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-25" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 reveal">
          <span className="inline-block text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-3">
            Partnership
          </span>
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Let's <span className="text-gradient">Collaborate</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            The best breakthroughs happen through collaboration. Whether you're an institution, startup, or innovator — there's potential for something great together.
          </p>
          <div className="section-divider w-24 mx-auto mt-6" />
        </div>

        {/* Partners grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-12 stagger-children">
          {partners.map((p) => (
            <div
              key={p.label}
              className="glass-card rounded-2xl p-4 text-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-400/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-cyan-400/20 group-hover:scale-110 transition-all">
                <p.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="font-display font-bold text-white text-xs mb-1">{p.label}</h3>
              <p className="text-slate-500 text-xs">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA card */}
        <div className="max-w-3xl mx-auto reveal">
          <div className="relative glass rounded-2xl p-6 sm:p-8 lg:p-10 text-center border border-cyan-400/15 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-sky-400/5" />
            <div className="relative">
              <h3 className="font-display font-bold text-white text-xl xs:text-2xl sm:text-3xl mb-4">
                Ready to Build Something <span className="text-gradient">Extraordinary?</span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-7 sm:mb-8 max-w-xl mx-auto">
                If you share a passion for robotics, AI, or engineering education — or if you're looking for a technology partner with deep expertise and entrepreneurial drive — let's start a conversation.
              </p>
              <button
                onClick={scrollToContact}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 min-h-[52px] rounded-xl bg-cyan-400 text-navy-950 font-bold text-sm tracking-wide hover:bg-cyan-300 active:bg-cyan-300 transition-all duration-200 shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40"
              >
                Start the Conversation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
