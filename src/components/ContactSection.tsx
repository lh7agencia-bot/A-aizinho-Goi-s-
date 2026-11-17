import { useState, type FormEvent } from 'react';
import { CheckCircle2, ExternalLink, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { BUSINESS_INFO, buildWhatsAppUrl } from '../data/siteData';
import { ResilientImage } from './ResilientImage';
import { ScrollReveal } from './ScrollReveal';

export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [sentMode, setSentMode] = useState<'whatsapp' | 'email' | null>(null);
  const [preparedWhatsAppUrl, setPreparedWhatsAppUrl] = useState<string | null>(null);

  const validateForm = (): boolean => {
    setErrorMsg('');
    if (name.trim().length < 2) {
      setErrorMsg('Por favor, informe seu nome.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('Por favor, informe um e-mail válido.');
      return false;
    }
    if (message.trim().length < 5) {
      setErrorMsg('Escreva sua mensagem ou dúvida para continuar.');
      return false;
    }
    return true;
  };

  const handleSendWhatsApp = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const text = [
      `Olá, ${BUSINESS_INFO.shortName}!`,
      `Nome: ${name.trim()}`,
      `E-mail: ${email.trim()}`,
      `Mensagem: ${message.trim()}`,
    ].join('\n');

    setPreparedWhatsAppUrl(buildWhatsAppUrl(text));
    setSentMode('whatsapp');
  };

  const handleSendEmail = () => {
    if (!validateForm()) return;
    const subject = `Contato pelo site — ${name.trim()}`;
    const body = `Nome: ${name.trim()}\nE-mail: ${email.trim()}\n\nMensagem:\n${message.trim()}`;
    setSentMode('email');
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section
      id="contato"
      className="border-t border-[#1A092B]/8 bg-white py-20 text-[#1A092B] sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-2xl">
          <p className="text-sm font-semibold text-[#7B2CBF]">Localização e contato</p>
          <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-[#1A092B] sm:text-4xl">
            Fale com o distribuidor oficial em Aparecida de Goiânia
          </h2>
          <p className="mt-3 text-base text-[#1A092B]/75">
            Envie sua mensagem diretamente pelo formulário para atendimento via WhatsApp ou e-mail,
            ou venha retirar seu pedido no Parque Real de Goiânia.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* Left Column: Real Location Info + Storefront Card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[#1A092B]/10 bg-[#F5F5F5] lg:col-span-6"
          >
            <div className="aspect-[1024/691] w-full overflow-hidden bg-[#260742]">
              <ResilientImage
                src="/images/acai-estabelecimento-1.jpg"
                alt="Fachada da Açaizinho Goiás na Av. São Paulo, 730 em Aparecida de Goiânia"
                fallbackTitle="Açaizinho Goiás - Fachada"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#7B2CBF]" aria-hidden="true" />
                  <div>
                    <p className="font-display text-sm font-bold text-[#1A092B]">Endereço oficial</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-[#1A092B]/80">
                      {BUSINESS_INFO.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#7B2CBF]" aria-hidden="true" />
                  <div>
                    <p className="font-display text-sm font-bold text-[#1A092B]">
                      Telefone e WhatsApp
                    </p>
                    <a
                      href={buildWhatsAppUrl('Olá! Gostaria de falar com a Açaizinho Goiás.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 inline-block text-sm font-semibold tabular-nums text-[#7B2CBF] hover:underline"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 border-t border-[#1A092B]/10 pt-5">
                <a
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#7B2CBF] px-4 py-2.5 text-sm font-semibold text-[#F5F5F5] transition-colors hover:bg-[#5A189A]"
                >
                  Abrir rota no Google Maps
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={`tel:+${BUSINESS_INFO.phoneDigits}`}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#1A092B]/15 bg-white px-4 py-2.5 text-sm font-semibold text-[#1A092B] transition-colors hover:bg-[#1A092B]/5"
                >
                  Ligar agora
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center rounded-2xl border border-[#1A092B]/10 bg-[#F5F5F5] p-6 sm:p-8 lg:col-span-6"
          >
            <h3 className="font-display text-2xl font-bold text-[#1A092B]">
              Envie sua mensagem
            </h3>
            <p className="mt-1.5 text-sm text-[#1A092B]/70">
              Preencha seus dados e escolha enviar diretamente pelo WhatsApp ou pelo seu aplicativo
              de e-mail.
            </p>

            <form onSubmit={handleSendWhatsApp} noValidate className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1.5 block text-sm font-semibold text-[#1A092B]"
                >
                  Nome
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full rounded-lg border border-[#1A092B]/15 bg-white px-3.5 py-2.5 text-sm text-[#1A092B] placeholder:text-[#1A092B]/40 focus:border-[#7B2CBF] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1.5 block text-sm font-semibold text-[#1A092B]"
                >
                  E-mail
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voce@exemplo.com"
                  className="w-full rounded-lg border border-[#1A092B]/15 bg-white px-3.5 py-2.5 text-sm text-[#1A092B] placeholder:text-[#1A092B]/40 focus:border-[#7B2CBF] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-sm font-semibold text-[#1A092B]"
                >
                  Mensagem
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Conte se deseja pacotes para consumo, eventos ou revenda..."
                  className="w-full resize-y rounded-lg border border-[#1A092B]/15 bg-white px-3.5 py-2.5 text-sm text-[#1A092B] placeholder:text-[#1A092B]/40 focus:border-[#7B2CBF] focus:outline-none"
                />
              </div>

              {errorMsg && (
                <p role="alert" className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm font-medium text-red-700">
                  {errorMsg}
                </p>
              )}

              {sentMode && !errorMsg && (
                <div className="flex flex-col gap-2 rounded-lg border border-[#7B2CBF]/25 bg-white px-4 py-3 text-sm text-[#1A092B]">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#7B2CBF]" aria-hidden="true" />
                    <span>
                      {sentMode === 'whatsapp'
                        ? 'Mensagem pronta! Clique abaixo para abrir o WhatsApp e enviar seu contato.'
                        : 'Aplicativo de e-mail acionado com os dados da sua mensagem.'}
                    </span>
                  </div>
                  {sentMode === 'whatsapp' && preparedWhatsAppUrl && (
                    <a
                      href={preparedWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-fit items-center gap-1.5 font-semibold text-[#7B2CBF] underline underline-offset-4 hover:text-[#5A189A]"
                    >
                      Abrir conversa no WhatsApp
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
                <button
                  type="submit"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[#7B2CBF] px-5 py-3 text-sm font-bold text-[#F5F5F5] shadow transition-colors hover:bg-[#5A189A]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Enviar via WhatsApp
                </button>

                <button
                  type="button"
                  onClick={handleSendEmail}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-[#1A092B]/20 bg-white px-5 py-3 text-sm font-semibold text-[#1A092B] transition-colors hover:bg-[#1A092B]/5"
                >
                  <Mail className="h-4 w-4 text-[#7B2CBF]" aria-hidden="true" />
                  Enviar por E-mail
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
