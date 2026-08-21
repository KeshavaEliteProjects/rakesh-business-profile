import { BookOpen, FileText } from 'lucide-react';

const publications = [
  {
    title: 'Robotics Education in India',
    topic: 'The state, challenges, and opportunities for hands-on robotics education in Indian academic institutions and the path to building a skilled engineering workforce.',
    area: 'Education',
    type: 'Article',
  },
  {
    title: 'Future of Industry 5.0',
    topic: 'An exploration of Industry 5.0 principles — human-robot collaboration, sustainability, resilience, and what the next industrial era means for engineers and businesses.',
    area: 'Industry 5.0',
    type: 'Article',
  },
  {
    title: 'AI for Smart Manufacturing',
    topic: 'How artificial intelligence is transforming manufacturing — from predictive maintenance and quality control to adaptive production and intelligent supply chains.',
    area: 'AI & Manufacturing',
    type: 'Article',
  },
  {
    title: 'Embedded Systems Trends',
    topic: 'Key trends shaping embedded systems development: edge AI, RISC-V, real-time OS, power efficiency, and the convergence of IoT with intelligent hardware.',
    area: 'Embedded Systems',
    type: 'Article',
  },
  {
    title: 'Future of STEM Learning',
    topic: 'Reimagining STEM education for the next generation — project-based learning, robotics integration, simulation tools, and building practical problem-solvers.',
    area: 'STEM Education',
    type: 'Article',
  },
  {
    title: 'Robotics Research Insights',
    topic: 'Current frontiers in robotics research: autonomous navigation, manipulation dexterity, human-robot interaction, and the convergence of AI with physical systems.',
    area: 'Robotics',
    type: 'Article',
  },
];

const areaColor: Record<string, string> = {
  Education: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  'Industry 5.0': 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  'AI & Manufacturing': 'text-sky-400 bg-sky-400/10 border-sky-400/20',
  'Embedded Systems': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'STEM Education': 'text-teal-400 bg-teal-400/10 border-teal-400/20',
  Robotics: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
};

export default function Publications() {
  return (
    <section id="publications" className="relative py-16 sm:py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-navy-900/60" />
      <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/3 rounded-full blur-[80px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14 lg:mb-16 reveal">
          <span className="inline-block text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-3">
            Writing
          </span>
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Publications & <span className="text-gradient">Articles</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Sharing insights and perspectives on robotics, AI, engineering education, and technology trends.
          </p>
          <div className="section-divider w-24 mx-auto mt-6" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 stagger-children">
          {publications.map((pub) => (
            <div key={pub.title} className="glass-card rounded-2xl p-5 sm:p-6 group flex flex-col">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-cyan-400/10 flex items-center justify-center flex-none group-hover:bg-cyan-400/20 transition-colors">
                  <FileText className="w-4 h-4 text-cyan-400" />
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${areaColor[pub.area] || 'text-slate-400 bg-slate-400/10 border-slate-400/20'}`}>
                  {pub.area}
                </span>
              </div>

              <h3 className="font-display font-bold text-white text-sm mb-3 group-hover:text-cyan-400 transition-colors leading-snug">
                {pub.title}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed flex-1">{pub.topic}</p>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-8 sm:mt-10 text-center reveal">
          <div className="inline-flex items-center gap-2 text-slate-500 text-xs">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Publication topics from source content. Reach out via contact for full articles and insights.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
