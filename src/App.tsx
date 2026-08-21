import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import WhatIDo from '@/components/WhatIDo';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Research from '@/components/Research';
import Achievements from '@/components/Achievements';
import Talks from '@/components/Talks';
import Publications from '@/components/Publications';
import CommunityImpact from '@/components/CommunityImpact';
import Collaborate from '@/components/Collaborate';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function App() {
  useScrollReveal();

  useEffect(() => {
    document.title = 'Rakesh Veerapaneni — Robotics Engineer & Technology Entrepreneur';
  }, []);

  return (
    <div className="min-h-screen bg-navy-950 text-slate-200">
      <Navigation />
      <main>
        <Hero />
        <About />
        <WhatIDo />
        <Experience />
        <Projects />
        <Research />
        <Achievements />
        <Talks />
        <Publications />
        <CommunityImpact />
        <Collaborate />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
