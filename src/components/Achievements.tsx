import { Trophy, Star, BookOpen, Users, Building2, Lightbulb } from 'lucide-react';

const achievements = [
  {
    icon: Building2,
    title: 'Founded Keshava Elite Projects',
    year: '2022',
    desc: 'Established KEP in September 2022 as a technology company focused on robotics, AI, and engineering education.',
    accent: 'border-cyan-400/25 bg-cyan-400/5',
    iconBg: 'bg-cyan-400/10',
    iconColor: 'text-cyan-400',
  },
  {
    icon: BookOpen,
    title: 'Robotics & STEM Programs',
    year: 'Ongoing',
    desc: 'Built and delivered hands-on robotics and STEM programs for educational institutions — equipping students with practical engineering skills.',
    accent: 'border-sky-400/25 bg-sky-400/5',
    iconBg: 'bg-sky-400/10',
    iconColor: 'text-sky-400',
  },
  {
    icon: Lightbulb,
    title: 'AI, Robotics & SaaS Products',
    year: 'Ongoing',
    desc: 'Developed multiple technology product concepts including KEP Labs Simulator, GetFilePilot, and an ERP platform for educational institutions.',
    accent: 'border-blue-400/25 bg-blue-400/5',
    iconBg: 'bg-blue-400/10',
    iconColor: 'text-blue-400',
  },
  {
    icon: Users,
    title: 'Workshops & Training Programs',
    year: 'Ongoing',
    desc: 'Delivered workshops, internship programs, and technical training sessions in robotics, AI, embedded systems, and entrepreneurship.',
    accent: 'border-teal-400/25 bg-teal-400/5',
    iconBg: 'bg-teal-400/10',
    iconColor: 'text-teal-400',
  },
  {
    icon: Star,
    title: 'Institutional Partnerships',
    year: 'Ongoing',
    desc: 'Established active partnerships with schools and colleges to integrate engineering technology programs into their academic offerings.',
    accent: 'border-emerald-400/25 bg-emerald-400/5',
    iconBg: 'bg-emerald-400/10',
    iconColor: 'text-emerald-400',
  },
  {
    icon: Trophy,
    title: 'Technology Entrepreneurship',
    year: '2022–Present',
    desc: 'Leading KEP as Founder & CEO — combining technical expertise with entrepreneurial vision to build impactful technology products.',
    accent: 'border-amber-400/25 bg-amber-400/5',
    iconBg: 'bg-amber-400/10',
    iconColor: 'text-amber-400',
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-16 sm:py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-navy-900/60" />
      <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20" />
      <div className="absolute top-1/3 left-0 w-64 h-64 bg-cyan-500/4 rounded-full blur-[80px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14 lg:mb-16 reveal">
          <span className="inline-block text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-3">
            Milestones
          </span>
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Key <span className="text-gradient">Achievements</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Building from the ground up — milestones that mark the journey from engineering passion to entrepreneurial execution.
          </p>
          <div className="section-divider w-24 mx-auto mt-6" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {achievements.map((a) => (
            <div
              key={a.title}
              className={`glass-card rounded-2xl p-5 sm:p-6 border ${a.accent} group`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`w-11 h-11 rounded-xl ${a.iconBg} flex items-center justify-center flex-none group-hover:scale-110 transition-transform`}>
                  <a.icon className={`w-5 h-5 ${a.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 mb-1">
                    <h3 className="font-display font-bold text-white text-sm leading-tight">{a.title}</h3>
                    <span className={`flex-none px-2 py-0.5 rounded-full glass-light text-xs font-semibold ${a.iconColor} border border-white/5`}>
                      {a.year}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">{a.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
