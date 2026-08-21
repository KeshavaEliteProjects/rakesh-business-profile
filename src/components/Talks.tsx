import { Mic, ChevronRight } from 'lucide-react';

const topics = [
  { title: 'Future of Robotics', category: 'Keynote', desc: 'Where robotics is headed — autonomous systems, collaborative robots, and the impact on industry and society.' },
  { title: 'Artificial Intelligence', category: 'Technical', desc: 'Demystifying AI — real-world applications, practical implementations, and the future of intelligent machines.' },
  { title: 'Industry 5.0', category: 'Keynote', desc: 'The next industrial revolution — human-centric manufacturing, resilience, and sustainable automation.' },
  { title: 'Robotics in Education', category: 'Education', desc: 'Why hands-on robotics education transforms learning and career outcomes for engineering students.' },
  { title: 'Career Opportunities in AI', category: 'Career', desc: 'Navigating the AI career landscape — skills, opportunities, and how to position yourself for the future.' },
  { title: 'Embedded Systems Mastery', category: 'Technical', desc: 'From microcontrollers to production systems — practical embedded systems development and deployment.' },
  { title: 'ROS & ROS2', category: 'Workshop', desc: 'Hands-on introduction to the Robot Operating System — programming, simulation, and real hardware integration.' },
  { title: 'Entrepreneurship for Engineers', category: 'Startup', desc: 'From engineer to entrepreneur — product thinking, founding a startup, and building technology companies.' },
  { title: 'Product Development', category: 'Startup', desc: 'The engineering approach to building products — from idea validation to market-ready solutions.' },
  { title: 'Startup Journey', category: 'Startup', desc: 'Lessons from founding Keshava Elite Projects — building a tech company from scratch as an engineer.' },
];

const categoryColor: Record<string, string> = {
  Keynote: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  Technical: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
  Education: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  Career: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  Workshop: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  Startup: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
};

export default function Talks() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="talks" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-navy-950" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-cyan-500/3 rounded-full blur-[80px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="inline-block text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-3">
            Speaking
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Talks & <span className="text-gradient">Workshops</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base">
            Sharing knowledge, inspiring engineers, and building the next generation of robotics and AI professionals through talks, workshops, and training sessions.
          </p>
          <div className="section-divider w-24 mx-auto mt-6" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {topics.map((t) => (
            <div key={t.title} className="glass-card rounded-2xl p-5 group">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-cyan-400/10 flex items-center justify-center flex-none group-hover:bg-cyan-400/20 transition-colors">
                  <Mic className="w-4 h-4 text-cyan-400" />
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${categoryColor[t.category] || 'text-slate-400 bg-slate-400/10 border-slate-400/20'}`}>
                  {t.category}
                </span>
              </div>
              <h3 className="font-display font-bold text-white text-sm mb-2 group-hover:text-cyan-400 transition-colors">
                {t.title}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center reveal">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 glass rounded-2xl px-8 py-6 border border-cyan-400/10">
            <div className="text-center sm:text-left">
              <p className="text-white font-semibold text-sm">Invite Rakesh to Speak</p>
              <p className="text-slate-400 text-xs mt-0.5">Available for conferences, colleges, workshops & corporate events</p>
            </div>
            <button
              onClick={scrollToContact}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-sm font-semibold hover:bg-cyan-400/20 transition-all whitespace-nowrap"
            >
              Book a Session
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
