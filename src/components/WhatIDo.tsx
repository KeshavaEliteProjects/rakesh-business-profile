import { Cpu, Brain, Wifi, CircuitBoard, Factory, GraduationCap, BookOpen, Rocket, Users } from 'lucide-react';

const services = [
  {
    icon: Cpu,
    title: 'Robotics Engineering',
    desc: 'Design and development of autonomous robots, robotic arms, and mobile platforms for industrial and educational use.',
    color: 'from-cyan-400/10 to-cyan-400/5',
    border: 'border-cyan-400/15',
    iconBg: 'bg-cyan-400/10',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Brain,
    title: 'Artificial Intelligence',
    desc: 'Building AI-powered systems including computer vision, object detection, facial recognition, and smart automation.',
    color: 'from-sky-400/10 to-sky-400/5',
    border: 'border-sky-400/15',
    iconBg: 'bg-sky-400/10',
    iconColor: 'text-sky-400',
  },
  {
    icon: Wifi,
    title: 'Internet of Things (IoT)',
    desc: 'Connected device ecosystems, sensor networks, real-time monitoring, and intelligent automation for smart environments.',
    color: 'from-blue-400/10 to-blue-400/5',
    border: 'border-blue-400/15',
    iconBg: 'bg-blue-400/10',
    iconColor: 'text-blue-400',
  },
  {
    icon: CircuitBoard,
    title: 'Embedded Systems',
    desc: 'Custom firmware, microcontroller development, RTOS, and hardware-software co-design for robotics and automation.',
    color: 'from-indigo-400/10 to-indigo-400/5',
    border: 'border-indigo-400/15',
    iconBg: 'bg-indigo-400/10',
    iconColor: 'text-indigo-400',
  },
  {
    icon: Factory,
    title: 'Industry 5.0 Solutions',
    desc: 'Human-robot collaboration frameworks, smart manufacturing, digital twins, and next-generation factory automation.',
    color: 'from-teal-400/10 to-teal-400/5',
    border: 'border-teal-400/15',
    iconBg: 'bg-teal-400/10',
    iconColor: 'text-teal-400',
  },
  {
    icon: GraduationCap,
    title: 'STEM Education',
    desc: 'Hands-on robotics and engineering programs for schools, colleges, and institutions fostering practical technical skills.',
    color: 'from-emerald-400/10 to-emerald-400/5',
    border: 'border-emerald-400/15',
    iconBg: 'bg-emerald-400/10',
    iconColor: 'text-emerald-400',
  },
  {
    icon: BookOpen,
    title: 'Engineering Curriculum',
    desc: 'Designing and delivering structured engineering curricula, lab setups, and learning kits for academic institutions.',
    color: 'from-green-400/10 to-green-400/5',
    border: 'border-green-400/15',
    iconBg: 'bg-green-400/10',
    iconColor: 'text-green-400',
  },
  {
    icon: Rocket,
    title: 'Startup & Product Dev',
    desc: 'End-to-end product development from concept to launch — strategy, engineering, UX, and go-to-market execution.',
    color: 'from-orange-400/10 to-orange-400/5',
    border: 'border-orange-400/15',
    iconBg: 'bg-orange-400/10',
    iconColor: 'text-orange-400',
  },
  {
    icon: Users,
    title: 'Technology Consulting',
    desc: 'Advisory services for organizations adopting robotics, AI, and automation to solve real business challenges.',
    color: 'from-amber-400/10 to-amber-400/5',
    border: 'border-amber-400/15',
    iconBg: 'bg-amber-400/10',
    iconColor: 'text-amber-400',
  },
];

export default function WhatIDo() {
  return (
    <section id="what-i-do" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-navy-900/60" />
      <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-30" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/3 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="inline-block text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-3">
            Expertise
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            What I <span className="text-gradient">Do</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base">
            From building autonomous robots to designing AI systems and educating the next generation of engineers — here's where I create real impact.
          </p>
          <div className="section-divider w-24 mx-auto mt-6" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {services.map((s) => (
            <div
              key={s.title}
              className={`glass-card rounded-2xl p-6 bg-gradient-to-br ${s.color} border ${s.border} group cursor-default`}
            >
              <div className={`w-11 h-11 rounded-xl ${s.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <s.icon className={`w-5 h-5 ${s.iconColor}`} />
              </div>
              <h3 className="font-display font-bold text-white text-base mb-2">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
