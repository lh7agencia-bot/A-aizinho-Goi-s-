import { BUSINESS_INFO, buildWhatsAppUrl } from '../data/siteData';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1F0636] text-[#F5F5F5]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 border-b border-white/10 pb-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-lg font-bold tracking-tight text-white">
              {BUSINESS_INFO.name}
            </p>
            <p className="mt-2 text-sm text-[#F5F5F5]/75">{BUSINESS_INFO.slogan}</p>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#F5F5F5]/60">
              Localização e Contato
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-[#F5F5F5]/85">
              {BUSINESS_INFO.address}
            </p>
            <p className="mt-2 text-sm tabular-nums text-[#F5F5F5]/90">
              WhatsApp:{' '}
              <a
                href={buildWhatsAppUrl('Olá! Vim pelo site da Açaizinho Goiás.')}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline decoration-white/30 underline-offset-4 hover:decoration-white"
              >
                {BUSINESS_INFO.phoneDisplay}
              </a>
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#F5F5F5]/60">
              Navegação
            </p>
            <ul className="mt-2.5 space-y-2 text-sm text-[#F5F5F5]/80">
              <li>
                <a href="#inicio" className="hover:text-white">
                  Início
                </a>
              </li>
              <li>
                <a href="#galeria" className="hover:text-white">
                  Galeria de Fotos
                </a>
              </li>
              <li>
                <a href="#depoimentos" className="hover:text-white">
                  Depoimentos
                </a>
              </li>
              <li>
                <a href="#agendamento" className="hover:text-white">
                  Agendamento Online
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white">
                  Perguntas Frequentes
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-white">
                  Contato
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-2 text-xs text-[#F5F5F5]/60 sm:flex-row sm:items-center">
          <p>
            © {year} {BUSINESS_INFO.name}. Todos os direitos reservados.
          </p>
          <p>Aparecida de Goiânia · Goiás</p>
        </div>
      </div>
    </footer>
  );
}
