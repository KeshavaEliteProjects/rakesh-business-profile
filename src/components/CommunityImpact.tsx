import { Heart, Lightbulb, Globe, Rocket, GraduationCap, FlaskConical, Wrench, TrendingUp } from 'lucide-react';

const impacts = [
  {
    icon: Lightbulb,
    title: 'Inspire Future Engineers',
    desc: 'Igniting curiosity and passion for technology in the next generation of engineers and innovators.',
    gradient: 'from-cyan-400/15 to-transparent',
  },
  {
    icon: Rocket,
    title: 'Promote Innovation',
    desc: 'Building a culture of creative problem-solving and practical technology innovation across communities.',
    gradient: 'from-sky-400/15 to-transparent',
  },
  {
    icon: Globe,
    title: 'Build Robotics Ecosystems',
    desc: 'Creating interconnected networks of robotics practitioners, educators, and industry professionals.',
    gradient: 'from-blue-400/15 to-transparent',
  },
  {
    icon: Heart,
    title: 'Support Startups',
    desc: 'Mentoring and enabling tech entrepreneurs to build impactful products and sustainable businesses.',
    gradient: 'from-teal-400/15 to-transparent',
  },
  {
    icon: GraduationCap,
    title: 'Train Educators',
    desc: 'Equipping teachers and faculty with modern tools, skills, and methodologies for technology education.',
    gradient: 'from-emerald-400/15 to-transparent',
  },
  {
    icon: FlaskConical,
    title: 'Encourage Research',
    desc: 'Fostering a research mindset and supporting applied research initiatives in robotics and AI.',
    gradient: 'from-green-400/15 to-transparent',
  },
  {
    icon: Wrench,
    title: 'Develop Practical Skills',
    desc: 'Bridging the gap between academic theory and industry-ready technical competencies.',
    gradient: 'from-amber-400/15 to-transparent',
  },
  {
    icon: TrendingUp,
    title: 'Drive Tech Growth',
    desc: 'Contributing to the advancement of India\'s technology landscape through engineering education and product development.',
    gradient: 'from-orange-400/15 to-transparent',
  },
];

export default function CommunityImpact() {
  return (
    <section id="community" className="relative py-16 sm:py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-navy-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(500px,120vw)] h-[min(500px,120vw)] bg-cyan-500/3 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14 lg:mb-16 reveal">
          <span className="inline-block text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-3">
            Purpose
          </span>
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Community <span className="text-gradient">Impact</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Technology is most powerful when it creates lasting positive change. Here's where I channel energy and effort for broader impact.
          </p>
          <div className="section-divider w-24 mx-auto mt-6" />
        </div>

        <div className="grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 stagger-children">
          {impacts.map((item) => (
            <div
              key={item.title}
              className={`glass-card rounded-2xl p-5 bg-gradient-to-br ${item.gradient} group`}
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-cyan-400/15 group-hover:scale-110 transition-all">
                <item.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="font-display font-bold text-white text-sm mb-2">{item.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
