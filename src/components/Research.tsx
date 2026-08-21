import { FlaskConical, Cpu, Users, Eye, Factory, Layers, Brain, Wrench, Globe, CloudCog } from 'lucide-react';

const topics = [
  { icon: Cpu, title: 'Robotics', desc: 'Autonomous systems, manipulation, navigation, and human-robot collaboration research.' },
  { icon: Brain, title: 'Artificial Intelligence', desc: 'Machine learning, deep learning, neural networks, and intelligent decision-making systems.' },
  { icon: Users, title: 'Human-Robot Interaction', desc: 'Intuitive interfaces, gesture recognition, and collaborative task execution between humans and robots.' },
  { icon: Eye, title: 'Computer Vision', desc: 'Object detection, scene understanding, 3D reconstruction, and visual perception for robotics.' },
  { icon: Factory, title: 'Industrial Automation', desc: 'Smart factories, process automation, predictive maintenance, and production optimization.' },
  { icon: Layers, title: 'Digital Twins', desc: 'Virtual models of physical systems for simulation, monitoring, and predictive analytics.' },
  { icon: FlaskConical, title: 'Embedded AI', desc: 'Deploying AI algorithms on resource-constrained embedded hardware for real-time applications.' },
  { icon: Wrench, title: 'Smart Manufacturing', desc: 'AI-driven quality control, adaptive production, and connected manufacturing systems.' },
  { icon: Globe, title: 'Industry 5.0', desc: 'Human-centric manufacturing integrating sustainability, resilience, and advanced robotics.' },
  { icon: CloudCog, title: 'Robotics-as-a-Service', desc: 'Cloud-native robotics platforms delivering robot capabilities on-demand as scalable services.' },
];

export default function Research() {
  return (
    <section id="research" className="relative py-16 sm:py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-navy-950" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/4 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14 lg:mb-16 reveal">
          <span className="inline-block text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-3">
            Innovation
          </span>
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Research & <span className="text-gradient">Innovation</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Exploring the frontiers of technology to build solutions that don't yet exist — spanning robotics, AI, and intelligent systems.
          </p>
          <div className="section-divider w-24 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 stagger-children">
          {topics.map((t) => (
            <div
              key={t.title}
              className="glass-card rounded-2xl p-4 sm:p-5 text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-400/10 border border-cyan-400/15 flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-400/20 group-hover:border-cyan-400/35 transition-all">
                <t.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="font-display font-bold text-white text-sm mb-2">{t.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Research philosophy */}
        <div className="mt-10 sm:mt-16 max-w-4xl mx-auto reveal">
          <div className="glass rounded-2xl p-5 sm:p-8 border border-cyan-400/10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-cyan-400/5" />
            <div className="relative">
              <FlaskConical className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
              <h3 className="font-display font-bold text-white text-lg sm:text-xl mb-3">Research Philosophy</h3>
              <p className="text-slate-300 text-sm leading-relaxed max-w-2xl mx-auto">
                My approach to research is grounded in practical impact. Every investigation, prototype, and experiment is driven by the question: <span className="text-cyan-400 font-semibold">"How does this create real value for people, industries, or society?"</span> From theoretical exploration to working deployments — research should move the world forward.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
