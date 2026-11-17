import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { GALLERY_PHOTOS } from '../data/siteData';
import { ResilientImage } from './ResilientImage';

const SCENE_DURATION_MS = 4800;

const KEN_BURNS_MOTIONS = [
  { initial: { scale: 1.0, x: '0%', y: '0%' }, animate: { scale: 1.1, x: '-2%', y: '-1.5%' } },
  { initial: { scale: 1.08, x: '-2%', y: '1%' }, animate: { scale: 1.0, x: '1.5%', y: '-1%' } },
  { initial: { scale: 1.0, x: '1.5%', y: '0%' }, animate: { scale: 1.09, x: '-1.5%', y: '1.5%' } },
  { initial: { scale: 1.06, x: '0%', y: '-1.5%' }, animate: { scale: 1.0, x: '0%', y: '1.5%' } },
];

export function AnimatedPhotoReel() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const currentPhoto = GALLERY_PHOTOS[sceneIndex];
  const motionPreset = KEN_BURNS_MOTIONS[sceneIndex % KEN_BURNS_MOTIONS.length];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setSceneIndex((prev) => (prev + 1) % GALLERY_PHOTOS.length);
    }, SCENE_DURATION_MS);

    return () => window.clearInterval(timer);
  }, [isPlaying, sceneIndex]);

  const goPrev = () => {
    setSceneIndex((prev) => (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length);
  };

  const goNext = () => {
    setSceneIndex((prev) => (prev + 1) % GALLERY_PHOTOS.length);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[#1A092B]/12 bg-[#1F0636] text-[#F5F5F5] shadow-xl">
      {/* Cinematic Ken Burns Stage */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#19052B] sm:aspect-[21/9]">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentPhoto.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <motion.div
              initial={motionPreset.initial}
              animate={isPlaying ? motionPreset.animate : motionPreset.initial}
              transition={{ duration: SCENE_DURATION_MS / 1000, ease: 'linear' }}
              className="h-full w-full will-change-transform"
            >
              <ResilientImage
                src={currentPhoto.src}
                alt={currentPhoto.alt}
                loading="eager"
                fallbackTitle={currentPhoto.title}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Measured Contrast Scrim for Text Legibility */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A092B]/90 via-[#1A092B]/35 to-[#1A092B]/20"
        />

        {/* Scene Narrative Overlay */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-end sm:p-7">
          <div className="max-w-xl">
            <p className="text-xs font-semibold text-[#F5F5F5]/80 tabular-nums">
              Vídeo animado da unidade · Cena 0{sceneIndex + 1} de 0{GALLERY_PHOTOS.length}
            </p>
            <h3 className="mt-1 font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
              {currentPhoto.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#F5F5F5]/85">
              {currentPhoto.caption}
            </p>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Cena anterior do vídeo"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-[#260742]/80 text-[#F5F5F5] backdrop-blur-sm transition-colors hover:bg-[#7B2CBF]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-label={isPlaying ? 'Pausar apresentação animada' : 'Reproduzir apresentação animada'}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#F5F5F5] px-4 text-sm font-bold text-[#260742] shadow transition-colors hover:bg-white whitespace-nowrap shrink-0"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4 text-[#7B2CBF]" aria-hidden="true" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 text-[#7B2CBF]" aria-hidden="true" />
                  <span>Reproduzir</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Próxima cena do vídeo"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-[#260742]/80 text-[#F5F5F5] backdrop-blur-sm transition-colors hover:bg-[#7B2CBF]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Chapter Progress Bar */}
      <div className="grid grid-cols-2 border-t border-white/10 bg-[#260742] sm:grid-cols-4">
        {GALLERY_PHOTOS.map((photo, idx) => {
          const active = idx === sceneIndex;
          return (
            <button
              key={photo.id}
              type="button"
              onClick={() => setSceneIndex(idx)}
              className={`relative flex flex-col items-start gap-0.5 px-4 py-3 text-left transition-colors ${
                active ? 'bg-[#7B2CBF]/35 text-white' : 'text-[#F5F5F5]/65 hover:bg-white/5 hover:text-white'
              }`}
            >
              {/* Animated Scene Progress Line */}
              {active && (
                <motion.div
                  key={`progress-${sceneIndex}-${isPlaying}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isPlaying ? 1 : 0.35 }}
                  transition={{
                    duration: isPlaying ? SCENE_DURATION_MS / 1000 : 0.2,
                    ease: 'linear',
                  }}
                  style={{ transformOrigin: '0%' }}
                  className="absolute top-0 inset-x-0 h-[3px] bg-[#F5F5F5]"
                />
              )}
              <span className="text-[11px] font-semibold tabular-nums opacity-75">
                0{idx + 1} · {photo.categoryLabel}
              </span>
              <span className="w-full truncate text-xs font-bold">{photo.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
