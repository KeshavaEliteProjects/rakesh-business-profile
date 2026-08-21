import { useEffect, useRef, useState } from 'react';
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

const HERO_IMAGE = 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb';

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Decorative particle count is a straight cost on low-end phones, so it
  // tracks viewport size and the reduce-motion preference.
  const [particleCount, setParticleCount] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const small = window.matchMedia('(max-width: 767px)');

    const apply = () => {
      setParticleCount(reduced.matches ? 0 : small.matches ? 18 : 60);
    };

    apply();
    reduced.addEventListener('change', apply);
    small.addEventListener('change', apply);
    return () => {
      reduced.removeEventListener('change', apply);
      small.removeEventListener('change', apply);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    // The network animation is pure decoration — skip it entirely for users
    // who asked for reduced motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    type Node = { x: number; y: number; vx: number; vy: number };

    let animFrameId = 0;
    let nodes: Node[] = [];
    let width = 0;
    let height = 0;
    let linkDistance = 120;
    let onScreen = true;
    let running = false;

    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;

      // Back the canvas at device resolution so the dots aren't blurry on
      // phone screens, but cap DPR at 2 — 3x costs 2.25x the fill for no
      // visible gain on a field of 1.5px dots.
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Link-drawing is O(n²). A fixed 50 nodes means the same 1,225 distance
      // checks per frame on a phone as on a desktop, so scale with area.
      const count = Math.round(Math.min(50, Math.max(12, (width * height) / 24000)));
      linkDistance = width < 640 ? 90 : 120;

      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          // Compare squared distances; Math.hypot per pair was the hot path.
          if (distSq < linkDistance * linkDistance) {
            const alpha = (1 - Math.sqrt(distSq) / linkDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 211, 238, 0.3)';
        ctx.fill();
      }

      animFrameId = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      running = true;
      animFrameId = requestAnimationFrame(draw);
    };

    const stop = () => {
      running = false;
      if (animFrameId) cancelAnimationFrame(animFrameId);
      animFrameId = 0;
    };

    const sync = () => {
      if (onScreen && !document.hidden) start();
      else stop();
    };

    seed();
    sync();

    // On mobile, showing/hiding the URL bar fires resize and changes the
    // element height. Re-seeding on every one of those makes the field jump,
    // so only a width change or a large height change rebuilds the scene.
    let lastWidth = canvas.offsetWidth;
    let lastHeight = canvas.offsetHeight;
    let resizeTimer = 0;

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const w = canvas.offsetWidth;
        const h = canvas.offsetHeight;
        if (w === lastWidth && Math.abs(h - lastHeight) < 120) return;
        lastWidth = w;
        lastHeight = h;
        seed();
      }, 150);
    };

    // Stop burning frames once the hero is scrolled past — this page is long.
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 }
    );
    observer.observe(section);

    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', sync);

    return () => {
      stop();
      window.clearTimeout(resizeTimer);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-navy-950" />
      <div className="absolute inset-0 bg-grid-pattern bg-[size:28px_28px] sm:bg-[size:40px_40px]" />
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900/80 via-navy-950 to-navy-950" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500/5 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-80 sm:h-80 bg-electric-500/5 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(600px,120vw)] h-[min(600px,120vw)] bg-cyan-400/3 rounded-full blur-[120px]" />

      {/* Network canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full opacity-60"
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {PARTICLES.slice(0, particleCount).map((p) => (
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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20 sm:pb-16">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 items-center">
          {/* Left: Text */}
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-light border border-cyan-400/20 text-cyan-400 text-[0.65rem] xs:text-xs font-medium tracking-widest uppercase mb-5 sm:mb-6 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse flex-none" />
              Founder &amp; CEO — Keshava Elite Projects
            </div>

            <h1 className="font-display text-[1.75rem] xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.12] sm:leading-[1.08] tracking-tight mb-5 sm:mb-6 animate-fade-in-up">
              <span className="block text-white">Building the</span>
              <span className="block text-gradient glow-text">Future of</span>
              <span className="block text-white">Robotics, AI</span>
              <span className="block text-cyan-400">&amp; Industry 5.0</span>
            </h1>

            <p className="text-slate-300 text-sm xs:text-base sm:text-lg leading-relaxed max-w-xl mb-7 sm:mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Hi, I'm <span className="text-white font-semibold">Rakesh Veerapaneni</span> — Founder &amp; CEO of{' '}
              <span className="text-cyan-400 font-semibold">Keshava Elite Projects (KEP)</span>, Robotics Engineer, and Technology Entrepreneur passionate about Robotics, Artificial Intelligence, Embedded Systems, IoT, and STEM Education.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-12 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
              <button
                onClick={() => scrollToId('projects')}
                className="group flex items-center justify-center gap-2 px-6 min-h-[48px] rounded-xl bg-cyan-400 text-navy-950 font-bold text-sm tracking-wide hover:bg-cyan-300 active:bg-cyan-300 transition-all duration-200 shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40"
              >
                View My Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToId('contact')}
                className="flex items-center justify-center gap-2 px-6 min-h-[48px] rounded-xl glass-light border border-cyan-400/30 text-cyan-400 font-semibold text-sm tracking-wide hover:bg-cyan-400/10 active:bg-cyan-400/10 hover:border-cyan-400/50 transition-all duration-200"
              >
                Let's Connect
              </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
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
              {/* Outer rings sit 40–80px outside the card. There isn't room for
                  that on a phone, and clipping them looks like a bug — so the
                  orbit decoration is desktop-only. */}
              <div className="hidden sm:block absolute inset-0 rounded-full border border-cyan-400/10 animate-spin-slow" style={{ margin: '-40px' }} aria-hidden="true" />
              <div className="hidden sm:block absolute inset-0 rounded-full border border-cyan-400/5 animate-spin-slow" style={{ margin: '-80px', animationDirection: 'reverse', animationDuration: '30s' }} aria-hidden="true" />

              {/* Orbit dots */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <div
                  key={i}
                  aria-hidden="true"
                  className="hidden sm:block absolute w-2 h-2 rounded-full bg-cyan-400/40 animate-spin-slow"
                  style={{
                    top: 'calc(50% - 1px)',
                    left: 'calc(50% - 1px)',
                    margin: '-80px',
                    transformOrigin: '81px 1px',
                    transform: `rotate(${angle}deg)`,
                    animationDuration: '30s',
                    animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
                  }}
                />
              ))}

              {/* Central card */}
              <div className="relative w-[min(17rem,74vw)] h-[min(17rem,74vw)] sm:w-80 sm:h-80 rounded-2xl overflow-hidden glass glow-border animate-float">
                <img
                  src={`${HERO_IMAGE}&w=600`}
                  srcSet={`${HERO_IMAGE}&w=400 400w, ${HERO_IMAGE}&w=600 600w, ${HERO_IMAGE}&w=900 900w`}
                  sizes="(max-width: 640px) 74vw, 320px"
                  alt=""
                  width={600}
                  height={600}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-4 sm:p-6 text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-cyan-400/10 border-2 border-cyan-400/30 flex items-center justify-center mb-2 sm:mb-3">
                    <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
                  </div>
                  <p className="font-display font-bold text-white text-sm">Rakesh Veerapaneni</p>
                  <p className="text-cyan-400 text-xs font-medium mt-0.5">Robotics Engineer &amp; Entrepreneur</p>
                </div>
              </div>

              {/* Floating badges — pulled in tight on mobile so they stay
                  inside the viewport next to a full-width card. */}
              <div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-6 glass px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border border-cyan-400/20 text-[0.65rem] sm:text-xs font-semibold text-cyan-400 animate-float whitespace-nowrap" style={{ animationDelay: '-2s' }}>
                <Zap className="w-3 h-3 inline mr-1" />
                Industry 5.0
              </div>
              <div className="absolute -bottom-3 -left-2 sm:-bottom-4 sm:-left-6 glass px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border border-cyan-400/20 text-[0.65rem] sm:text-xs font-semibold text-cyan-400 animate-float whitespace-nowrap" style={{ animationDelay: '-4s' }}>
                <Brain className="w-3 h-3 inline mr-1" />
                AI &amp; Robotics
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => scrollToId('about')}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 w-11 h-11 flex items-center justify-center text-slate-500 hover:text-cyan-400 transition-colors animate-bounce z-10"
        aria-label="Scroll to About section"
      >
        <ChevronDown className="w-6 h-6" />
      </button>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-navy-950 to-transparent pointer-events-none" />
    </section>
  );
}
