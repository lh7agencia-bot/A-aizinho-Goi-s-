import { MessageCircle } from 'lucide-react';
import { BUSINESS_INFO, buildWhatsAppUrl } from '../data/siteData';

export function FloatingWhatsApp() {
  const whatsappUrl = buildWhatsAppUrl(
    'Olá! Estou no site da Açaizinho Goiás e gostaria de fazer um pedido ou tirar uma dúvida.'
  );

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Conversar no WhatsApp da ${BUSINESS_INFO.shortName} (${BUSINESS_INFO.phoneDisplay})`}
      className="fixed bottom-4 right-4 z-40 inline-flex h-12 items-center gap-2 rounded-full border border-white/25 bg-[#7B2CBF] px-4 text-sm font-bold text-[#F5F5F5] shadow-xl transition-transform duration-150 hover:scale-105 hover:bg-[#5A189A] sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline whitespace-nowrap">WhatsApp</span>
    </a>
  );
}
