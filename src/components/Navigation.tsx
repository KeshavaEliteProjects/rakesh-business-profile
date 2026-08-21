import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Cpu } from 'lucide-react';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Publications', href: '#publications' },
  { label: 'Talks', href: '#talks' },
  { label: 'Collaborate', href: '#collaborate' },
  { label: 'Contact', href: '#contact' },
];

const sectionIds = navLinks.map((l) => l.href.replace('#', ''));

/** Roughly the fixed nav's height — a section counts as active once its top
 *  passes under the bar rather than when it reaches y=0. */
const HEADER_OFFSET = 96;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const isOpenRef = useRef(false);
  const pendingTarget = useRef<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  isOpenRef.current = isOpen;

  // Must be called before the effects below so its cleanup (which restores the
  // document scroll offset) runs before the deferred scroll-to-section.
  useBodyScrollLock(isOpen);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;

      // While the menu is open the body is pinned at scrollY 0, so every
      // reading here would be wrong. Freeze the nav state instead.
      if (isOpenRef.current) return;

      setScrolled(window.scrollY > 20);

      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= HEADER_OFFSET) {
          current = id;
        }
      }

      // The last section is usually too short to ever reach the offset, so
      // hitting the bottom of the page selects it explicitly.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = sectionIds[sectionIds.length - 1];

      setActiveSection(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Escape closes the menu; focus returns to the toggle.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!panelRef.current?.contains(target) && !toggleRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [isOpen]);

  // A tap in the open menu can't scroll immediately: the body is still pinned,
  // and unlocking restores the old offset. Defer until after the unlock.
  useEffect(() => {
    if (isOpen || !pendingTarget.current) return;
    const id = pendingTarget.current;
    pendingTarget.current = null;
    const frame = requestAnimationFrame(() => scrollToId(id));
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  // Rotating to landscape can leave the desktop nav and the mobile panel both
  // rendered; close the panel once the lg breakpoint takes over.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    const id = href.replace('#', '');
    if (isOpenRef.current) {
      pendingTarget.current = id;
      setIsOpen(false);
    } else {
      scrollToId(id);
    }
  }, []);

  const showBar = scrolled || isOpen;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showBar ? 'glass border-b border-cyan-400/10 py-2 sm:py-3' : 'py-3 sm:py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('#home')}
            className="flex items-center gap-2 group flex-none -ml-1 px-1 py-2"
            aria-label="Back to top"
          >
            <div className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center group-hover:bg-cyan-400/20 transition-colors">
              <Cpu className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="font-display font-bold text-white text-sm tracking-wide">
              RV<span className="text-cyan-400">.</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  aria-current={active ? 'true' : undefined}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium tracking-wide transition-all duration-200 ${
                    active
                      ? 'text-cyan-400 bg-cyan-400/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <button
              onClick={() => handleNavClick('#contact')}
              className="px-4 py-2 rounded-lg bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-xs font-semibold tracking-wide hover:bg-cyan-400/20 hover:border-cyan-400/50 transition-all duration-200"
            >
              Get In Touch
            </button>
          </div>

          {/* Mobile toggle — 44px so it clears the minimum touch target. */}
          <button
            ref={toggleRef}
            onClick={() => setIsOpen((v) => !v)}
            className="lg:hidden -mr-2 w-11 h-11 flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-white/5 active:bg-white/10 transition-colors flex-none"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        aria-hidden={!isOpen}
        className={`lg:hidden transition-[max-height,opacity] duration-300 overflow-hidden ${
          isOpen ? 'max-h-[calc(100dvh-4rem)] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="glass border-t border-cyan-400/10 px-3 py-3 mt-1 mx-3 sm:mx-4 rounded-b-xl max-h-[calc(100dvh-5.5rem)] overflow-y-auto overscroll-contain pb-safe">
          <div className="flex flex-col gap-0.5">
            {navLinks.map((link) => {
              const active = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  tabIndex={isOpen ? 0 : -1}
                  aria-current={active ? 'true' : undefined}
                  className={`px-4 min-h-[44px] flex items-center rounded-lg text-sm font-medium text-left transition-all ${
                    active
                      ? 'text-cyan-400 bg-cyan-400/10'
                      : 'text-slate-300 hover:text-white active:bg-white/10'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <div className="mt-2 pt-2 border-t border-white/5">
              <button
                onClick={() => handleNavClick('#contact')}
                tabIndex={isOpen ? 0 : -1}
                className="w-full px-4 min-h-[44px] rounded-lg bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-sm font-semibold active:bg-cyan-400/20 transition-all"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
