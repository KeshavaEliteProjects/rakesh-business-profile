import { useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown, Cpu, Brain, Zap, Globe } from 'lucide-react';

const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  opacity: Math.random() * 0.4 + 0.1,
  duration: Math.random() * 20 + 15,
  delay: Math.random() * -20,
}));

const stats = [
  { icon: Cpu, label: 'Robotics Engineer', value: 'Founder & CEO' },
  { icon: Brain, label: 'AI & CV Innovator', value: 'KEP' },
  { icon: Zap, label: 'Industry 5.0', value: 'Specialist' },
  { icon: Globe, label: 'STEM Education', value: 'Leader' },
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const nodes: { x: number; y: number; vx: number; vy: number }[] = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005;

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });

      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.15;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, 0.3)`;
        ctx.fill();
      });

      animFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-navy-950" />
      <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px]" />
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900/80 via-navy-950 to-navy-950" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-electric-500/5 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/3 rounded-full blur-[120px]" />

      {/* Network canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-cyan-400"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animation: `float ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-light border border-cyan-400/20 text-cyan-400 text-xs font-medium tracking-widest uppercase mb-6 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Founder & CEO — Keshava Elite Projects
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-tight mb-6 animate-fade-in-up">
              <span className="block text-white">Building the</span>
              <span className="block text-gradient glow-text">Future of</span>
              <span className="block text-white">Robotics, AI</span>
              <span className="block text-cyan-400">&amp; Industry 5.0</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Hi, I'm <span className="text-white font-semibold">Rakesh Veerapaneni</span> — Founder & CEO of{' '}
              <span className="text-cyan-400 font-semibold">Keshava Elite Projects (KEP)</span>, Robotics Engineer, and Technology Entrepreneur passionate about Robotics, Artificial Intelligence, Embedded Systems, IoT, and STEM Education.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
              <button
                onClick={scrollToProjects}
                className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-400 text-navy-950 font-bold text-sm tracking-wide hover:bg-cyan-300 transition-all duration-200 shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40"
              >
                View My Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={scrollToContact}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-light border border-cyan-400/30 text-cyan-400 font-semibold text-sm tracking-wide hover:bg-cyan-400/10 hover:border-cyan-400/50 transition-all duration-200"
              >
                Let's Connect
              </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              {stats.map((s) => (
                <div key={s.label} className="glass-light rounded-xl p-3 text-center border border-white/5">
                  <s.icon className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                  <div className="text-xs text-slate-400 leading-tight">{s.label}</div>
                  <div className="text-xs font-semibold text-cyan-400 mt-0.5">{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div className="flex items-center justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border border-cyan-400/10 animate-spin-slow" style={{ margin: '-40px' }} />
              <div className="absolute inset-0 rounded-full border border-cyan-400/5 animate-spin-slow" style={{ margin: '-80px', animationDirection: 'reverse', animationDuration: '30s' }} />

              {/* Orbit dots */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-cyan-400/40 animate-spin-slow"
                  style={{
                    top: `calc(50% - 1px)`,
                    left: `calc(50% - 1px)`,
                    margin: '-80px',
                    transformOrigin: '81px 1px',
                    transform: `rotate(${angle}deg)`,
                    animationDuration: '30s',
                    animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
                  }}
                />
              ))}

              {/* Central card */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-2xl overflow-hidden glass glow-border animate-float">
                <img
                  src="https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Robotics and AI technology"
                  className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-cyan-400/10 border-2 border-cyan-400/30 flex items-center justify-center mb-3">
                    <Cpu className="w-8 h-8 text-cyan-400" />
                  </div>
                  <p className="font-display font-bold text-white text-sm">Rakesh Veerapaneni</p>
                  <p className="text-cyan-400 text-xs font-medium mt-0.5">Robotics Engineer & Entrepreneur</p>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-6 glass px-3 py-2 rounded-xl border border-cyan-400/20 text-xs font-semibold text-cyan-400 animate-float" style={{ animationDelay: '-2s' }}>
                <Zap className="w-3 h-3 inline mr-1" />
                Industry 5.0
              </div>
              <div className="absolute -bottom-4 -left-6 glass px-3 py-2 rounded-xl border border-cyan-400/20 text-xs font-semibold text-cyan-400 animate-float" style={{ animationDelay: '-4s' }}>
                <Brain className="w-3 h-3 inline mr-1" />
                AI & Robotics
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-cyan-400 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" />
      </button>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-950 to-transparent" />
    </section>
  );
}
