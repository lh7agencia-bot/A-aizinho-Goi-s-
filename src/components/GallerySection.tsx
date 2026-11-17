import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { GALLERY_PHOTOS, type GalleryPhoto } from '../data/siteData';
import { AnimatedPhotoReel } from './AnimatedPhotoReel';
import { ResilientImage } from './ResilientImage';
import { ScrollReveal } from './ScrollReveal';

type FilterCategory = 'todos' | 'loja' | 'produto';

export function GallerySection() {
  const [filter, setFilter] = useState<FilterCategory>('todos');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filteredPhotos =
    filter === 'todos'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((photo) => photo.category === filter);

  const activePhoto: GalleryPhoto | null =
    activeIndex !== null && filteredPhotos[activeIndex] ? filteredPhotos[activeIndex] : null;

  const handleClose = useCallback(() => setActiveIndex(null), []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + filteredPhotos.length) % filteredPhotos.length;
    });
  }, [filteredPhotos.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % filteredPhotos.length;
    });
  }, [filteredPhotos.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
      if (event.key === 'ArrowLeft') handlePrev();
      if (event.key === 'ArrowRight') handleNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, handleClose, handlePrev, handleNext]);

  return (
    <section id="galeria" className="bg-[#F5F5F5] py-20 text-[#1A092B] sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col justify-between gap-6 border-b border-[#1A092B]/10 pb-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-[#7B2CBF]">
                Apresentação animada e galeria real
              </p>
              <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-[#1A092B] sm:text-4xl">
                Conheça a distribuidora e o produto oficial
              </h2>
              <p className="mt-3 text-base text-[#1A092B]/75">
                Assista ao vídeo animado montado com nossas fotos reais ou clique em qualquer imagem
                abaixo para ampliar na tela cheia.
              </p>
            </div>

            {/* Interactive Filter Controls */}
            <div
              role="group"
              aria-label="Filtrar galeria de fotos"
              className="inline-flex self-start rounded-lg border border-[#1A092B]/10 bg-white p-1"
            >
              {(
                [
                  { key: 'todos', label: 'Todas' },
                  { key: 'loja', label: 'Loja Oficial' },
                  { key: 'produto', label: 'Embalagem' },
                ] as const
              ).map((tab) => {
                const isActive = filter === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => {
                      setFilter(tab.key);
                      setActiveIndex(null);
                    }}
                    className={`rounded-md px-3.5 py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                      isActive
                        ? 'bg-[#7B2CBF] text-[#F5F5F5]'
                        : 'text-[#1A092B]/70 hover:text-[#1A092B]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Animated Video Showcase transformed from the real establishment photos */}
        <ScrollReveal delay={0.08} className="mt-10">
          <AnimatedPhotoReel />
        </ScrollReveal>

        {/* Responsive Photo Grid with subtle hover animation & Lightbox */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo, index) => (
            <motion.article
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col overflow-hidden rounded-xl border border-[#1A092B]/10 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Ampliar foto: ${photo.title}`}
                className="relative block w-full overflow-hidden bg-[#19052B] text-left focus-visible:outline-offset-[-2px]"
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <motion.div
                    animate={{ scale: [1, 1.035, 1] }}
                    transition={{
                      duration: 8 + index * 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="h-full w-full will-change-transform"
                  >
                    <ResilientImage
                      src={photo.src}
                      alt={photo.alt}
                      fallbackTitle={photo.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </motion.div>
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                <span className="pointer-events-none absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#F5F5F5]/95 text-[#260742] opacity-0 shadow transition-opacity duration-200 group-hover:opacity-100">
                  <Expand className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>

              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-medium text-[#7B2CBF]">{photo.categoryLabel}</p>
                <h3 className="mt-1 font-display text-base font-bold text-[#1A092B]">
                  {photo.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#1A092B]/70">{photo.caption}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && activeIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Visualização ampliada: ${activePhoto.title}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-6"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#19052B] text-[#F5F5F5] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
                <div className="min-w-0 pr-4">
                  <p className="truncate font-display text-base font-bold text-white">
                    {activePhoto.title}
                  </p>
                  <p className="text-xs text-[#F5F5F5]/70 tabular-nums">
                    Foto {activeIndex + 1} de {filteredPhotos.length}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Fechar visualização ampliada"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/15 text-[#F5F5F5] transition-colors hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative flex items-center justify-center bg-black/50 p-4 sm:p-6">
                <ResilientImage
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  loading="eager"
                  fallbackTitle={activePhoto.title}
                  className="max-h-[68vh] w-auto max-w-full rounded-lg object-contain"
                />

                {filteredPhotos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Foto anterior"
                      className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg border border-white/20 bg-[#260742]/90 text-[#F5F5F5] transition-colors hover:bg-[#7B2CBF]"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Próxima foto"
                      className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg border border-white/20 bg-[#260742]/90 text-[#F5F5F5] transition-colors hover:bg-[#7B2CBF]"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              <div className="border-t border-white/10 px-5 py-4">
                <p className="text-sm leading-relaxed text-[#F5F5F5]/85">{activePhoto.caption}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
