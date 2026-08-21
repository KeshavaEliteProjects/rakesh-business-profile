import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

const experiences = [
  {
    role: 'Founder & CEO',
    company: 'Keshava Elite Projects (KEP)',
    period: 'September 2022 – Present',
    location: 'India',
    type: 'Full-time',
    current: true,
    responsibilities: [
      'Technology Strategy & Roadmap',
      'Product Development & R&D',
      'Robotics Research & Innovation',
      'Institutional Partnerships',
      'Engineering Training Programs',
      'Business Development',
      'Team Leadership & Culture',
    ],
    description:
      'Founded and lead Keshava Elite Projects — a technology company building robotics, AI, and SaaS products while delivering engineering education and training programs to schools, colleges, and industries.',
  },
  {
    role: 'Chief Technology Officer (CTO)',
    company: 'Ugyan Edu Tech Pvt. Ltd.',
    period: 'Prior Experience',
    location: 'India',
    type: 'Full-time',
    current: false,
    responsibilities: [
      'Robotics Education Strategy',
      'AI Integration into Curriculum',
      'Product Strategy & Development',
    ],
    description:
      'Led technology and product strategy for an ed-tech company focused on robotics education, driving AI integration and curriculum development for institutional clients.',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-16 sm:py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-navy-950" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-cyan-500/3 rounded-full blur-[80px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14 lg:mb-16 reveal">
          <span className="inline-block text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-3">
            Career
          </span>
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <div className="section-divider w-24 mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/30 via-cyan-400/20 to-transparent" />

            <div className="space-y-8 sm:space-y-10">
              {experiences.map((exp, i) => (
                <div key={i} className="relative flex gap-4 sm:gap-8 lg:gap-12 reveal">
                  {/* Timeline dot */}
                  <div className="flex-none relative z-10">
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center ${
                        exp.current
                          ? 'bg-cyan-400/10 border-2 border-cyan-400/50 glow-border'
                          : 'bg-navy-800/80 border border-slate-600/30'
                      }`}
                    >
                      <Briefcase className={`w-5 h-5 sm:w-6 sm:h-6 ${exp.current ? 'text-cyan-400' : 'text-slate-400'}`} />
                    </div>
                    {exp.current && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 glass-card rounded-2xl p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="font-display font-bold text-white text-base sm:text-lg lg:text-xl">{exp.role}</h3>
                        <p className="text-cyan-400 font-semibold text-sm mt-0.5">{exp.company}</p>
                      </div>
                      {exp.current && (
                        <span className="flex-none px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-xs font-semibold">
                          Current
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-slate-400 text-xs">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </span>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed mb-5">{exp.description}</p>

                    <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
                      {exp.responsibilities.map((r) => (
                        <div key={r} className="flex items-start gap-2 text-xs text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-cyan-400/70 flex-none" />
                          {r}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
