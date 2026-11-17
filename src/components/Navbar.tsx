import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useSpring } from 'motion/react';
import { BUSINESS_INFO } from '../data/siteData';

const NAV_LINKS = [
  { label: 'Início', href: '#inicio' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Agendamento', href: '#agendamento' },
  { label: 'FAQ', href: '#faq' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-200 ${
        scrolled
          ? 'bg-[#260742]/95 backdrop-blur-md border-b border-white/10 shadow-sm'
          : 'bg-[#260742]/80 backdrop-blur-sm border-b border-white/5'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#inicio"
          className="flex items-center gap-2.5 text-[#F5F5F5] whitespace-nowrap shrink-0 focus-visible:rounded-md"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <circle cx="16" cy="17" r="11" fill="#7B2CBF" stroke="#F5F5F5" strokeWidth="2" />
            <path
              d="M16 6C17.5 3.5 21 3 23.5 4.5C21.5 7 18.5 7.5 16 6Z"
              fill="#F5F5F5"
            />
            <circle cx="12.5" cy="14" r="2.2" fill="#F5F5F5" fillOpacity="0.35" />
          </svg>
          <span className="font-display text-lg font-bold tracking-tight">
            {BUSINESS_INFO.shortName}
          </span>
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#F5F5F5]/85"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#F5F5F5] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#F5F5F5] after:transition-all after:duration-200 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + mobile drawer button */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contato"
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#F5F5F5] px-4 py-2 text-sm font-semibold text-[#260742] whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-white hover:shadow-md active:scale-[0.98]"
          >
            Fale Conosco
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 text-[#F5F5F5] transition-colors hover:bg-white/10 md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        style={{ scaleX, transformOrigin: '0%' }}
        className="h-[2px] w-full bg-gradient-to-r from-[#9D4EDD] via-[#F5F5F5] to-[#7B2CBF]"
      />

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#260742] px-4 py-4 md:hidden">
          <nav aria-label="Menu mobile" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-[#F5F5F5]/90 transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex min-h-[44px] items-center justify-center rounded-lg bg-[#F5F5F5] px-4 text-base font-semibold text-[#260742]"
            >
              Fale Conosco
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
