import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { FAQ_ITEMS } from '../data/siteData';
import { ScrollReveal } from './ScrollReveal';

export function FaqSection() {
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0]?.id ?? '');

  const toggleItem = (id: string) => {
    setOpenId((current) => (current === id ? '' : id));
  };

  return (
    <section id="faq" className="bg-[#F5F5F5] py-20 text-[#1A092B] sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-2xl">
          <p className="text-sm font-semibold text-[#7B2CBF]">Dúvidas frequentes</p>
          <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-[#1A092B] sm:text-4xl">
            Perguntas sobre pedidos, conservação e retirada
          </h2>
          <p className="mt-3 text-base text-[#1A092B]/75">
            Respostas diretas sobre a linha Açaizinho Tradicional, armazenamento ideal e como
            atendemos em Aparecida de Goiânia.
          </p>
        </ScrollReveal>

        <ScrollReveal
          delay={0.08}
          className="mt-10 divide-y divide-[#1A092B]/10 rounded-2xl border border-[#1A092B]/10 bg-white"
        >
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.35, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  id={`faq-trigger-${item.id}`}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[#7B2CBF]/[0.03]"
                >
                  <span className="font-display text-base font-bold text-[#1A092B] sm:text-lg">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#7B2CBF] transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${item.id}`}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className="px-6 pb-5"
                    >
                      <p className="text-sm leading-relaxed text-[#1A092B]/80 sm:text-base">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
