import { Target, Eye } from 'lucide-react';

const ABOUT_IMAGE =
  'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb';

export default function About() {
  return (
    <section id="about" className="relative py-16 sm:py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-navy-950" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/3 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16 reveal">
          <span className="inline-block text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-3">
            My Journey
          </span>
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="section-divider w-24 mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* Left: Image + accent */}
          <div className="reveal-left">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden glow-border aspect-[4/3]">
                <img
                  src={`${ABOUT_IMAGE}&w=800`}
                  srcSet={`${ABOUT_IMAGE}&w=500 500w, ${ABOUT_IMAGE}&w=800 800w, ${ABOUT_IMAGE}&w=1200 1200w`}
                  sizes="(max-width: 1023px) 100vw, 560px"
                  alt="Technology and engineering workspace"
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-navy-950/80 via-navy-950/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                  <div className="glass rounded-xl px-4 py-3">
                    <p className="text-cyan-400 text-xs font-semibold tracking-wide">Keshava Elite Projects (KEP)</p>
                    <p className="text-white text-sm font-bold mt-0.5">Founded September 2022</p>
                  </div>
                </div>
              </div>

              {/* Accent bar */}
              <div className="hidden lg:block absolute -left-4 top-8 bottom-8 w-1 rounded-full bg-gradient-to-b from-cyan-400/0 via-cyan-400/60 to-cyan-400/0" />
            </div>
          </div>

          {/* Right: Content */}
          <div className="reveal-right space-y-6">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-4">
                Engineering the Intersection of Technology & Impact
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                I'm a Robotics Engineer and entrepreneur on a mission to make advanced technology accessible, practical, and impactful. My work spans Robotics, Artificial Intelligence, Embedded Systems, IoT, Engineering Education, Intelligent Automation, and Technology Products.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
                As the Founder & CEO of <span className="text-cyan-400 font-semibold">Keshava Elite Projects (KEP)</span>, I lead a team focused on building real-world robotics and AI solutions while developing the next generation of engineering talent through hands-on education and training.
              </p>
            </div>

            {/* Expertise tags */}
            <div className="flex flex-wrap gap-2">
              {['Robotics', 'Artificial Intelligence', 'Computer Vision', 'Embedded Systems', 'IoT', 'Industry 5.0', 'ROS / ROS2', 'STEM Education'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full glass-light border border-cyan-400/15 text-xs font-medium text-slate-300 hover:border-cyan-400/40 hover:text-cyan-400 transition-all cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Vision & Mission */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="glass-card rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-cyan-400/10 flex items-center justify-center">
                    <Eye className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-white font-semibold text-sm">Vision</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  To build globally recognized technology products that transform education, automation, and intelligent robotics while inspiring future innovators.
                </p>
              </div>

              <div className="glass-card rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-cyan-400/10 flex items-center justify-center">
                    <Target className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-white font-semibold text-sm">Mission</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Empowering students, educators, and industries through practical technology, innovation, and engineering excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
