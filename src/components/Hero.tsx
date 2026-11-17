import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CalendarCheck, MapPin, Phone } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { BUSINESS_INFO, buildWhatsAppUrl } from '../data/siteData';
import { ResilientImage } from './ResilientImage';
import { ScrollReveal } from './ScrollReveal';

const HERO_SPECS = [
  {
    value: '70 ml',
    label: 'Porção individual',
    detail: 'Com banana e guaraná',
  },
  {
    value: '12 unid.',
    label: 'Por pacote oficial',
    detail: 'Peso líquido 0,750 kg',
  },
  {
    value: '-18 °C',
    label: 'Conservação ideal',
    detail: 'Cremosidade preservada',
  },
  {
    value: '(62) 99815-9040',
    label: 'Atendimento direto',
    detail: 'Retirada e encomendas',
  },
];

const HERO_REEL_FRAMES = [
  {
    src: '/images/acai-estabelecimento-4.jpg',
    alt: 'Pack oficial Açaizinho Tradicional com banana e guaraná — 12 unidades de 70ml',
  },
  {
    src: '/images/acai-estabelecimento-2.jpg',
    alt: 'Embalagem Açaizinho Tradicional com banana e guaraná na unidade oficial',
  },
  {
    src: '/images/acai-estabelecimento-3.jpg',
    alt: 'Detalhe oficial da embalagem e tabela nutricional Açaizinho',
  },
];

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [heroFrame, setHeroFrame] = useState(0);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Multi-layer GPU-only parallax: background moves slower/opposite to foreground content
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.16]);
  const fgY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);
  const primaryCardY = useTransform(scrollYProgress, [0, 1], [0, -28]);
  const secondaryCardY = useTransform(scrollYProgress, [0, 1], [0, 22]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroFrame((prev) => (prev + 1) % HERO_REEL_FRAMES.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  const currentHeroFrame = HERO_REEL_FRAMES[heroFrame];

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative overflow-hidden bg-[#260742] pt-24 text-[#F5F5F5]"
    >
      {/* Parallax Background Photo Layer */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 inset-x-0 bottom-[-12%] will-change-transform"
      >
        <ResilientImage
          src="/images/acai-estabelecimento-1.jpg"
          alt=""
          loading="eager"
          className="h-full w-full object-cover object-center opacity-35"
        />
      </motion.div>

      {/* Deep Purple Contrast Scrim preserving #7B2CBF identity & WCAG AA contrast */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#260742]/92 via-[#4A148C]/88 to-[#7B2CBF]/85"
      />

      {/* Subtle atmospheric depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-[480px] w-[480px] rounded-full bg-[#9D4EDD]/20 blur-3xl"
      />

      <motion.div
        style={{ y: fgY }}
        className="relative mx-auto max-w-6xl px-4 pb-16 pt-8 will-change-transform sm:px-6 lg:px-8 lg:pb-20 lg:pt-14"
      >
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Core Proposition */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4 text-sm font-medium tracking-wide text-[#F5F5F5]/90"
            >
              {BUSINESS_INFO.name}
              <span aria-hidden="true" className="mx-2 text-[#F5F5F5]/45">
                ·
              </span>
              Aparecida de Goiânia, GO
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl text-balance font-display text-[clamp(2.35rem,4.5vw,3.75rem)] font-extrabold leading-[1.08] tracking-tight text-white"
            >
              {BUSINESS_INFO.slogan}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-lg text-base leading-relaxed text-[#F5F5F5]/90 sm:text-lg"
            >
              Distribuição oficial do Açaizinho Tradicional com banana e guaraná no Parque Real de
              Goiânia. Pacotes práticos de 12 unidades (70 ml cada) para o seu dia a dia, eventos ou
              revenda com padrão original de fábrica.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href="#agendamento"
                className="inline-flex min-h-[48px] items-center gap-2.5 rounded-lg bg-[#F5F5F5] px-6 py-3 text-base font-bold text-[#260742] shadow-lg transition-all duration-150 hover:-translate-y-0.5 hover:bg-white active:translate-y-0 whitespace-nowrap shrink-0"
              >
                <CalendarCheck className="h-5 w-5 text-[#7B2CBF]" aria-hidden="true" />
                Agendar Pedido
              </a>

              <a
                href={buildWhatsAppUrl(
                  'Olá! Vim pelo site da Açaizinho Goiás e gostaria de fazer um pedido ou tirar uma dúvida.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 py-3 text-base font-semibold text-[#F5F5F5] backdrop-blur-sm transition-colors duration-150 hover:bg-white/20 whitespace-nowrap shrink-0"
              >
                Chamar no WhatsApp
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-col gap-2 border-t border-white/15 pt-6 text-sm text-[#F5F5F5]/85 sm:flex-row sm:items-center sm:gap-6"
            >
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-[#F5F5F5]" aria-hidden="true" />
                Av. São Paulo, 730 · Parque Real de Goiânia
              </span>
              <span className="inline-flex items-center gap-2 tabular-nums">
                <Phone className="h-4 w-4 shrink-0 text-[#F5F5F5]" aria-hidden="true" />
                {BUSINESS_INFO.phoneDisplay}
              </span>
            </motion.div>
          </div>

          {/* Right Column: Animated Ken Burns Product Reel + Parallax Storefront Inset */}
          <div className="relative flex items-center justify-center lg:col-span-6">
            <div className="relative grid w-full max-w-xl grid-cols-12 items-end gap-4">
              <motion.div
                style={{ y: primaryCardY }}
                className="col-span-8 aspect-[1024/1063] overflow-hidden rounded-2xl border border-white/15 bg-[#19052B] shadow-2xl will-change-transform"
              >
                <AnimatePresence mode="sync">
                  <motion.div
                    key={currentHeroFrame.src}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1.08 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      opacity: { duration: 0.8, ease: 'easeInOut' },
                      scale: { duration: 4.2, ease: 'linear' },
                    }}
                    className="h-full w-full will-change-transform"
                  >
                    <ResilientImage
                      src={currentHeroFrame.src}
                      alt={currentHeroFrame.alt}
                      loading="eager"
                      fallbackTitle="Pack Açaizinho 70ml"
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <motion.div
                style={{ y: secondaryCardY }}
                className="col-span-5 -ml-10 mb-4 overflow-hidden rounded-2xl border border-white/20 bg-[#260742] shadow-2xl will-change-transform sm:-ml-12"
              >
                <div className="overflow-hidden">
                  <motion.div
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                    className="will-change-transform"
                  >
                    <ResilientImage
                      src="/images/acai-estabelecimento-1.jpg"
                      alt="Fachada da distribuidora oficial Açaizinho Goiás em Aparecida de Goiânia"
                      loading="eager"
                      fallbackTitle="Distribuidor Oficial"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </motion.div>
                </div>
                <div className="border-t border-white/10 bg-[#260742]/95 px-3.5 py-2.5">
                  <p className="text-xs font-semibold text-[#F5F5F5]">O Original · 70 ml</p>
                  <p className="text-[11px] text-[#F5F5F5]/75">Retirada no local</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Full-Width 4-Column Specification Strip */}
      <div className="relative border-t border-black/5 bg-[#F5F5F5] text-[#1A092B]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-y divide-[#1A092B]/10 px-4 sm:px-6 lg:grid-cols-4 lg:divide-x lg:divide-y-0 lg:px-8">
          {HERO_SPECS.map((spec, idx) => (
            <ScrollReveal key={spec.label} delay={idx * 0.05} distance={14} className="px-4 py-6 sm:px-6">
              <p className="font-display text-2xl font-extrabold tracking-tight text-[#7B2CBF] tabular-nums">
                {spec.value}
              </p>
              <p className="mt-1 text-sm font-semibold text-[#1A092B]">{spec.label}</p>
              <p className="text-xs text-[#1A092B]/65">{spec.detail}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
