import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Tag } from 'lucide-react';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

/** Pexels serves a resized file per `w` param — ask for one that matches the
 *  slot instead of shipping the same 600px file to every breakpoint. */
function pexels(url: string, width: number) {
  return `${url.replace(/&w=\d+/, '')}&w=${width}`;
}

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  details: string;
  tags: string[];
  image: string;
};

const projects: Project[] = [
  // Robotics
  {
    id: 1,
    title: 'Autonomous Mobile Robots',
    category: 'Robotics',
    description: 'Self-navigating mobile robots for industrial and warehouse environments using SLAM and path-planning algorithms.',
    details: 'Research and development of autonomous mobile platforms capable of navigating complex environments using simultaneous localization and mapping (SLAM), obstacle avoidance, and dynamic path planning. Suitable for warehouse automation, last-mile delivery, and inspection tasks.',
    tags: ['ROS2', 'SLAM', 'Python', 'C++', 'LiDAR'],
    image: 'https://images.pexels.com/photos/8294607/pexels-photo-8294607.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 2,
    title: 'Industrial Robotics',
    category: 'Robotics',
    description: 'Robotic arm integration and automation systems for manufacturing, pick-and-place, and quality inspection.',
    details: 'Designing and deploying robotic arm systems for industrial use cases including pick-and-place operations, assembly line automation, and quality control inspections. Integrated with PLCs, SCADA systems, and custom control software.',
    tags: ['ROS', 'Kinematics', 'PLC', 'Industrial Automation'],
    image: 'https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 3,
    title: 'Robotics Education Kits',
    category: 'Robotics',
    description: 'DIY robotics learning kits for schools and colleges covering fundamentals of programming, electronics, and mechanics.',
    details: 'Developed structured robotics education kits for K-12 and undergraduate students. Each kit includes hardware components, curriculum guides, project challenges, and an integrated learning management approach to teach robotics, programming, and engineering principles hands-on.',
    tags: ['Arduino', 'Raspberry Pi', 'STEM', 'Education'],
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 4,
    title: 'AI-Powered Robotics Platform',
    category: 'Robotics',
    description: 'An integrated robotics platform combining AI perception, autonomous decision-making, and real-time control.',
    details: 'A unified robotics platform that fuses AI perception (computer vision, object detection) with autonomous planning and low-latency hardware control. Designed for research, industrial prototyping, and educational demonstrations.',
    tags: ['AI', 'ROS2', 'Computer Vision', 'Embedded AI'],
    image: 'https://images.pexels.com/photos/8566526/pexels-photo-8566526.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  // AI & CV
  {
    id: 5,
    title: 'Face Recognition Systems',
    category: 'AI & CV',
    description: 'Real-time facial recognition for access control, attendance management, and identity verification.',
    details: 'Deployed face recognition systems using deep learning models for secure identity verification, automated attendance tracking, and physical access control. Optimized for real-time performance on edge devices.',
    tags: ['OpenCV', 'Deep Learning', 'Python', 'Edge AI'],
    image: 'https://images.pexels.com/photos/5474296/pexels-photo-5474296.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 6,
    title: 'Object Detection with YOLO',
    category: 'AI & CV',
    description: 'High-accuracy real-time object detection systems using YOLO architectures for industrial and surveillance applications.',
    details: 'Custom-trained YOLO models for specific detection tasks including industrial defect detection, safety compliance monitoring, and inventory management. Fine-tuned for both accuracy and inference speed on embedded hardware.',
    tags: ['YOLOv8', 'PyTorch', 'Python', 'TensorRT'],
    image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 7,
    title: 'AI-Powered Monitoring Solutions',
    category: 'AI & CV',
    description: 'Intelligent surveillance and process monitoring using AI to detect anomalies, safety violations, and operational events.',
    details: 'End-to-end AI monitoring solutions for industrial sites and campuses. Uses multi-camera feeds, AI analytics, and real-time alerting to enhance safety, security, and operational efficiency.',
    tags: ['Computer Vision', 'AI', 'IoT', 'Edge Deployment'],
    image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 8,
    title: 'Smart Vision Systems',
    category: 'AI & CV',
    description: 'Intelligent vision systems for automated quality control, measurement, and inspection in manufacturing.',
    details: 'Precision machine vision systems integrating AI algorithms for dimensional measurement, surface defect detection, and process quality control in manufacturing environments.',
    tags: ['Machine Vision', 'AI', 'OpenCV', 'Industrial IoT'],
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  // Embedded Systems
  {
    id: 9,
    title: 'ESP32 Development Boards',
    category: 'Embedded',
    description: 'Custom ESP32-based hardware for IoT, robotics, and automation applications with wireless connectivity.',
    details: 'Designed and developed custom ESP32-based development boards tailored for robotics and IoT applications. Features include multi-sensor integration, wireless connectivity, and motor control interfaces.',
    tags: ['ESP32', 'C/C++', 'FreeRTOS', 'IoT', 'PCB Design'],
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 10,
    title: 'Raspberry Pi Applications',
    category: 'Embedded',
    description: 'Edge computing and AI applications on Raspberry Pi for robotics, vision, and IoT projects.',
    details: 'Developed a range of Raspberry Pi-based applications including vision processing, web-based control interfaces, data logging systems, and ROS robot controllers for educational and research use.',
    tags: ['Raspberry Pi', 'Python', 'Linux', 'ROS'],
    image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 11,
    title: 'STM32 Projects',
    category: 'Embedded',
    description: 'High-performance STM32 microcontroller applications for real-time robotics and industrial control.',
    details: 'Firmware development for STM32 microcontrollers targeting real-time robotic control, motor drive systems, sensor fusion, and communication protocols in embedded systems applications.',
    tags: ['STM32', 'C', 'RTOS', 'HAL', 'CAN Bus'],
    image: 'https://images.pexels.com/photos/1473254/pexels-photo-1473254.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 12,
    title: 'Custom Robotics Controllers',
    category: 'Embedded',
    description: 'Purpose-built robotics controller boards combining sensing, computing, and actuation in compact form factors.',
    details: 'Designed custom PCB-based robotics controllers integrating multiple microcontrollers, motor drivers, power management, and communication interfaces for compact robotic platforms.',
    tags: ['PCB Design', 'Embedded C', 'Motor Control', 'Power Electronics'],
    image: 'https://images.pexels.com/photos/2582932/pexels-photo-2582932.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  // Software Products
  {
    id: 13,
    title: 'KEP Labs Simulator (KLS)',
    category: 'Software',
    description: 'A browser-based virtual platform for learning robotics, electronics, IoT, and AI through interactive simulations.',
    details: 'KEP Labs Simulator (KLS) is a comprehensive web-based simulation platform designed to make robotics and electronics learning accessible to everyone. Students can experiment with virtual circuits, program simulated robots, and explore AI concepts without physical hardware. The platform supports interactive lessons, assignments, and real-time feedback.',
    tags: ['React', 'WebGL', 'Simulation', 'EdTech', 'SaaS'],
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 14,
    title: 'GetFilePilot',
    category: 'Software',
    description: 'A secure online productivity platform offering PDF, image, AI, and file management tools.',
    details: 'GetFilePilot is a comprehensive online file productivity platform offering secure file management, PDF tools (merge, split, compress, convert), image processing, and AI-powered file analysis. Designed for professionals and teams who need reliable, browser-based tools without installing software.',
    tags: ['React', 'TypeScript', 'Node.js', 'AI Tools', 'SaaS'],
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 15,
    title: 'ERP Platform for Education',
    category: 'Software',
    description: 'An integrated ERP platform for educational institutions covering admissions, HR, finance, attendance, and analytics.',
    details: 'A full-featured Enterprise Resource Planning platform built specifically for educational institutions. Modules include admissions management, student information systems, HR and payroll, finance and accounts, inventory, timetable scheduling, attendance tracking, and a comprehensive analytics dashboard.',
    tags: ['ERP', 'React', 'Node.js', 'PostgreSQL', 'Analytics'],
    image: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const FILTERS = ['All', 'Robotics', 'AI & CV', 'Embedded', 'Software'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  // The card that opened the modal, so focus can go back where it came from.
  const lastTrigger = useRef<HTMLElement | null>(null);

  const isOpen = selectedProject !== null;
  useBodyScrollLock(isOpen);

  const close = useCallback(() => setSelectedProject(null), []);

  useEffect(() => {
    if (!isOpen) {
      lastTrigger.current?.focus();
      lastTrigger.current = null;
      return;
    }

    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key !== 'Tab') return;

      // Keep tabbing inside the dialog while it is open.
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close]);

  const filtered = activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-16 sm:py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-navy-900/60" />
      <div className="absolute inset-0 bg-grid-pattern bg-[size:28px_28px] sm:bg-[size:40px_40px] opacity-20" />
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500/3 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 reveal">
          <span className="inline-block text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-3">
            Portfolio
          </span>
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            From autonomous robots to AI-powered applications — a showcase of work spanning robotics, computer vision, embedded systems, and software products.
          </p>
          <div className="section-divider w-24 mx-auto mt-6" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10 reveal">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              aria-pressed={activeFilter === f}
              className={`px-4 min-h-[44px] rounded-lg text-sm font-medium transition-all duration-200 ${
                activeFilter === f
                  ? 'bg-cyan-400 text-navy-950 shadow-lg shadow-cyan-400/20'
                  : 'glass-light text-slate-400 hover:text-white active:text-white border border-white/5 hover:border-cyan-400/20'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filtered.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={(e) => {
                lastTrigger.current = e.currentTarget;
                setSelectedProject(project);
              }}
              aria-haspopup="dialog"
              className="glass-card rounded-2xl overflow-hidden group cursor-pointer text-left w-full"
            >
              <div className="relative h-40 sm:h-44 overflow-hidden">
                <img
                  src={pexels(project.image, 600)}
                  srcSet={`${pexels(project.image, 400)} 400w, ${pexels(project.image, 600)} 600w, ${pexels(project.image, 900)} 900w`}
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  alt=""
                  width={600}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-navy-950/80 border border-cyan-400/20 text-cyan-400 text-xs font-semibold">
                  {project.category}
                </span>
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="font-display font-bold text-white text-base mb-2 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full glass-light border border-white/5 text-slate-500 text-xs">
                      {t}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-0.5 rounded-full text-slate-500 text-xs">+{project.tags.length - 3}</span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={close}
        >
          <div className="absolute inset-0 bg-navy-950/90 backdrop-blur-sm" />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="relative w-full sm:max-w-2xl glass rounded-t-2xl sm:rounded-2xl border border-cyan-400/15 overflow-hidden max-h-[92dvh] sm:max-h-[90dvh] overflow-y-auto overscroll-contain"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-40 sm:h-56 overflow-hidden">
              <img
                src={pexels(selectedProject.image, 900)}
                srcSet={`${pexels(selectedProject.image, 600)} 600w, ${pexels(selectedProject.image, 900)} 900w`}
                sizes="(max-width: 639px) 100vw, 672px"
                alt=""
                width={900}
                height={600}
                decoding="async"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/50 to-transparent" />
              <button
                ref={closeButtonRef}
                onClick={close}
                className="absolute top-3 right-3 w-11 h-11 rounded-lg bg-navy-950/80 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white active:text-white transition-colors"
                aria-label="Close project details"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-xs font-semibold">
                {selectedProject.category}
              </span>
            </div>

            <div className="p-5 sm:p-8 pb-safe sm:pb-8">
              <h3 id="project-modal-title" className="font-display font-bold text-white text-lg sm:text-2xl mb-3">
                {selectedProject.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">{selectedProject.details}</p>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Technologies</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
