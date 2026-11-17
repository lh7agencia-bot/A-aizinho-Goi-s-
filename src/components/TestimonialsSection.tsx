import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data/siteData';
import { ScrollReveal } from './ScrollReveal';

export function TestimonialsSection() {
  return (
    <section
      id="depoimentos"
      className="border-t border-[#1A092B]/8 bg-white py-20 text-[#1A092B] sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-2xl">
          <p className="text-sm font-semibold text-[#7B2CBF]">Avaliações de quem já compra</p>
          <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-[#1A092B] sm:text-4xl">
            Confiança construída no sabor e na pontualidade
          </h2>
          <p className="mt-3 text-base text-[#1A092B]/75">
            Relatos reais de moradores de Aparecida de Goiânia e da Região Metropolitana que
            escolhem o Açaizinho para o dia a dia, eventos e revenda.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-between rounded-xl border border-[#1A092B]/10 bg-[#F5F5F5] p-6 sm:p-7"
            >
              <div>
                <div
                  className="flex items-center gap-1 text-[#7B2CBF]"
                  aria-label={`Avaliação ${item.rating} de 5 estrelas`}
                >
                  {Array.from({ length: item.rating }).map((_, starIdx) => (
                    <Star
                      key={starIdx}
                      className="h-4 w-4 fill-[#7B2CBF] text-[#7B2CBF]"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <blockquote className="mt-4 text-base leading-relaxed text-[#1A092B]/90">
                  “{item.text}”
                </blockquote>
              </div>

              <footer className="mt-6 flex items-baseline justify-between gap-4 border-t border-[#1A092B]/10 pt-4">
                <div>
                  <p className="font-display text-sm font-bold text-[#1A092B]">{item.name}</p>
                  <p className="text-xs text-[#1A092B]/65">{item.context}</p>
                </div>
                <span className="text-xs font-medium text-[#7B2CBF] whitespace-nowrap shrink-0">
                  {item.dateLabel}
                </span>
              </footer>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
