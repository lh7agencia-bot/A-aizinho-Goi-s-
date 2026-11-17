import { useState, type FormEvent } from 'react';
import { Calendar, CheckCircle2, Clock, Minus, Plus, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { BUSINESS_INFO, TIME_SLOTS, buildWhatsAppUrl } from '../data/siteData';

const SERVICE_TYPES = [
  'Retirada na Distribuidora',
  'Pedido para Revenda / Atacado',
  'Encomenda para Evento',
] as const;

function getTodayIso(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatDateBr(isoDate: string): string {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('-');
  if (!year || !month || !day) return isoDate;
  return `${day}/${month}/${year}`;
}

export function SchedulingSection() {
  const todayIso = getTodayIso();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState<string>(SERVICE_TYPES[0]);
  const [packagesCount, setPackagesCount] = useState<number>(2);
  const [selectedDate, setSelectedDate] = useState<string>(todayIso);
  const [selectedTime, setSelectedTime] = useState<string>('10:00');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedUrl, setConfirmedUrl] = useState<string | null>(null);

  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    let formatted = digits;
    if (digits.length > 2) {
      formatted = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    }
    if (digits.length > 7) {
      formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }
    setPhone(formatted);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (name.trim().length < 2) {
      setErrorMsg('Por favor, informe seu nome completo.');
      return;
    }

    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setErrorMsg('Informe um telefone ou WhatsApp válido com DDD.');
      return;
    }

    if (!selectedDate || selectedDate < todayIso) {
      setErrorMsg('Escolha uma data válida a partir de hoje.');
      return;
    }

    if (!selectedTime) {
      setErrorMsg('Selecione um horário disponível para o atendimento.');
      return;
    }

    const message = [
      `Olá, ${BUSINESS_INFO.shortName}! Gostaria de confirmar um agendamento:`,
      `• Nome: ${name.trim()}`,
      `• WhatsApp: ${phone.trim()}`,
      `• Modalidade: ${serviceType}`,
      `• Quantidade estimada: ${packagesCount} pacote(s) de 12 unid. (70 ml)`,
      `• Data: ${formatDateBr(selectedDate)}`,
      `• Horário: ${selectedTime}`,
      notes.trim() ? `• Observações: ${notes.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    setConfirmedUrl(buildWhatsAppUrl(message));
  };

  return (
    <section
      id="agendamento"
      className="bg-gradient-to-br from-[#260742] via-[#3F0F6E] to-[#7B2CBF] py-20 text-[#F5F5F5] sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* Left Column: Context & Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-sm font-semibold text-[#F5F5F5]/85">
              Agendamento Online · Sem filas
            </p>
            <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Reserve a data e o horário da sua retirada
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#F5F5F5]/85">
              Separe seu pedido com antecedência para garantir pacotes recém-saídos da câmara fria a
              -18 °C no momento em que você chegar na nossa distribuidora em Aparecida de Goiânia.
            </p>

            <div className="mt-8 space-y-5 border-t border-white/15 pt-6 text-sm text-[#F5F5F5]/85">
              <div>
                <p className="font-display font-bold text-white">01. Escolha a modalidade</p>
                <p className="mt-1 text-[#F5F5F5]/75">
                  Atendemos compras avulsas, reposição para revendedores e encomendas para festas.
                </p>
              </div>
              <div>
                <p className="font-display font-bold text-white">02. Defina data e horário</p>
                <p className="mt-1 text-[#F5F5F5]/75">
                  Horários organizados de segunda a sábado para atendimento ágil no estacionamento.
                </p>
              </div>
              <div>
                <p className="font-display font-bold text-white">03. Envie direto pelo WhatsApp</p>
                <p className="mt-1 text-[#F5F5F5]/75">
                  Ao confirmar, geramos sua mensagem pronta para o número {BUSINESS_INFO.phoneDisplay}.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-white/15 bg-[#F5F5F5] p-6 text-[#1A092B] shadow-2xl sm:p-8 lg:col-span-7"
          >
            {confirmedUrl ? (
              <div className="space-y-6 py-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#7B2CBF]" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#1A092B]">
                      Agendamento preparado com sucesso
                    </h3>
                    <p className="mt-1 text-sm text-[#1A092B]/75">
                      Confira os dados abaixo e clique no botão para enviar sua reserva no WhatsApp
                      oficial da {BUSINESS_INFO.shortName}.
                    </p>
                  </div>
                </div>

                <dl className="grid grid-cols-1 gap-3 rounded-xl border border-[#1A092B]/10 bg-white p-5 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-xs text-[#1A092B]/60">Nome</dt>
                    <dd className="font-semibold text-[#1A092B]">{name}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#1A092B]/60">WhatsApp</dt>
                    <dd className="font-semibold tabular-nums text-[#1A092B]">{phone}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#1A092B]/60">Modalidade</dt>
                    <dd className="font-semibold text-[#1A092B]">{serviceType}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#1A092B]/60">Quantidade</dt>
                    <dd className="font-semibold tabular-nums text-[#1A092B]">
                      {packagesCount} pacote(s) · {packagesCount * 12} unidades
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#1A092B]/60">Data selecionada</dt>
                    <dd className="font-semibold tabular-nums text-[#7B2CBF]">
                      {formatDateBr(selectedDate)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#1A092B]/60">Horário</dt>
                    <dd className="font-semibold tabular-nums text-[#7B2CBF]">{selectedTime}</dd>
                  </div>
                </dl>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={confirmedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-lg bg-[#7B2CBF] px-6 py-3 text-sm font-bold text-[#F5F5F5] shadow transition-colors hover:bg-[#5A189A]"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Confirmar no WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => setConfirmedUrl(null)}
                    className="inline-flex min-h-[48px] items-center rounded-lg border border-[#1A092B]/15 bg-white px-5 py-3 text-sm font-semibold text-[#1A092B] transition-colors hover:bg-[#1A092B]/5"
                  >
                    Alterar agendamento
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="sched-name"
                      className="mb-1.5 block text-sm font-semibold text-[#1A092B]"
                    >
                      Nome completo
                    </label>
                    <input
                      id="sched-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome"
                      className="w-full rounded-lg border border-[#1A092B]/15 bg-white px-3.5 py-2.5 text-sm text-[#1A092B] placeholder:text-[#1A092B]/40 focus:border-[#7B2CBF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="sched-phone"
                      className="mb-1.5 block text-sm font-semibold text-[#1A092B]"
                    >
                      Telefone / WhatsApp
                    </label>
                    <input
                      id="sched-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="(62) 99999-9999"
                      className="w-full rounded-lg border border-[#1A092B]/15 bg-white px-3.5 py-2.5 text-sm tabular-nums text-[#1A092B] placeholder:text-[#1A092B]/40 focus:border-[#7B2CBF] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Service Type Selector */}
                <div>
                  <span className="mb-2 block text-sm font-semibold text-[#1A092B]">
                    Tipo de atendimento
                  </span>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {SERVICE_TYPES.map((type) => {
                      const active = serviceType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setServiceType(type)}
                          className={`min-h-[44px] rounded-lg border px-3 py-2 text-left text-xs font-semibold transition-colors ${
                            active
                              ? 'border-[#7B2CBF] bg-[#7B2CBF] text-[#F5F5F5]'
                              : 'border-[#1A092B]/15 bg-white text-[#1A092B]/80 hover:border-[#7B2CBF]/40'
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Date & Quantity */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="sched-date"
                      className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-[#1A092B]"
                    >
                      <Calendar className="h-4 w-4 text-[#7B2CBF]" aria-hidden="true" />
                      Data da retirada
                    </label>
                    <input
                      id="sched-date"
                      type="date"
                      min={todayIso}
                      required
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full rounded-lg border border-[#1A092B]/15 bg-white px-3.5 py-2.5 text-sm tabular-nums text-[#1A092B] focus:border-[#7B2CBF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <span className="mb-1.5 block text-sm font-semibold text-[#1A092B]">
                      Pacotes de 12 unid. (0,750 kg)
                    </span>
                    <div className="flex h-[42px] items-center justify-between rounded-lg border border-[#1A092B]/15 bg-white px-2">
                      <button
                        type="button"
                        onClick={() => setPackagesCount((c) => Math.max(1, c - 1))}
                        aria-label="Diminuir quantidade de pacotes"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#1A092B] transition-colors hover:bg-[#1A092B]/10"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-sm font-bold tabular-nums text-[#1A092B]">
                        {packagesCount} {packagesCount === 1 ? 'pacote' : 'pacotes'} (
                        {packagesCount * 12} unid.)
                      </span>
                      <button
                        type="button"
                        onClick={() => setPackagesCount((c) => Math.min(200, c + 1))}
                        aria-label="Aumentar quantidade de pacotes"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#1A092B] transition-colors hover:bg-[#1A092B]/10"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <span className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-[#1A092B]">
                    <Clock className="h-4 w-4 text-[#7B2CBF]" aria-hidden="true" />
                    Escolha o horário
                  </span>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {TIME_SLOTS.map((slot) => {
                      const active = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`min-h-[42px] rounded-lg border text-sm font-semibold tabular-nums transition-colors ${
                            active
                              ? 'border-[#7B2CBF] bg-[#7B2CBF] text-[#F5F5F5]'
                              : 'border-[#1A092B]/15 bg-white text-[#1A092B] hover:border-[#7B2CBF]/40'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="sched-notes"
                    className="mb-1.5 block text-sm font-semibold text-[#1A092B]"
                  >
                    Observações (opcional)
                  </label>
                  <input
                    id="sched-notes"
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ex.: preciso de caixa térmica ou nota para revenda"
                    className="w-full rounded-lg border border-[#1A092B]/15 bg-white px-3.5 py-2.5 text-sm text-[#1A092B] placeholder:text-[#1A092B]/40 focus:border-[#7B2CBF] focus:outline-none"
                  />
                </div>

                {errorMsg && (
                  <p role="alert" className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm font-medium text-red-700">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#7B2CBF] px-6 py-3 text-base font-bold text-[#F5F5F5] shadow-md transition-colors duration-150 hover:bg-[#5A189A]"
                >
                  <Calendar className="h-5 w-5" aria-hidden="true" />
                  Agendar Retirada ou Pedido
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
