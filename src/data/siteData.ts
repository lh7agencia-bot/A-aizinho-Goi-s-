export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  category: 'loja' | 'produto';
  categoryLabel: string;
  aspectClass: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  context: string;
  rating: number;
  text: string;
  dateLabel: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const BUSINESS_INFO = {
  name: 'Açaizinho Goiás - Distribuidor Oficial',
  shortName: 'Açaizinho Goiás',
  slogan: 'Açaí puro, energia de verdade',
  niche: 'Açaí',
  phoneDisplay: '(62) 99815-9040',
  phoneDigits: '5562998159040',
  whatsappBaseUrl: 'https://wa.me/5562998159040',
  address:
    'Av. São Paulo, 730 - Qd 40 lt 12/13 S/N - Parque Real de Goiânia, Aparecida de Goiânia - GO, 74910-090',
  shortAddress: 'Av. São Paulo, 730 · Parque Real de Goiânia, Aparecida de Goiânia - GO',
  cep: '74910-090',
  hoursSummary: 'Segunda a Sábado · 08h30 às 18h00',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Av.+S%C3%A3o+Paulo,+730+-+Parque+Real+de+Goi%C3%A2nia,+Aparecida+de+Goi%C3%A2nia+-+GO,+74910-090',
};

export function buildWhatsAppUrl(message: string): string {
  return `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'fachada-oficial',
    src: '/images/acai-estabelecimento-1.jpg',
    alt: 'Fachada oficial da Açaizinho Goiás - Distribuidor Oficial em Aparecida de Goiânia com estacionamento e acesso amplo',
    title: 'Fachada da Distribuidora Oficial',
    caption:
      'Unidade localizada na Av. São Paulo, 730, Parque Real de Goiânia, com estacionamento exclusivo para retirada ágil de pedidos.',
    category: 'loja',
    categoryLabel: 'Loja Oficial',
    aspectClass: 'aspect-[1024/691]',
  },
  {
    id: 'embalagem-frente',
    src: '/images/acai-estabelecimento-2.jpg',
    alt: 'Embalagem original Açaizinho Tradicional com banana e guaraná contendo 12 unidades de 70ml na distribuidora',
    title: 'Açaizinho Tradicional 70ml — Pacote 12 Unidades',
    caption:
      'Sabor tradicional com banana e guaraná em porções individuais de 70ml. Pacote com peso líquido de 0,750 kg.',
    category: 'produto',
    categoryLabel: 'Produto & Embalagem',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'embalagem-detalhe',
    src: '/images/acai-estabelecimento-3.jpg',
    alt: 'Detalhe da embalagem Açaizinho Tradicional com informações nutricionais, ingredientes e orientação de conservação a -18°C',
    title: 'Rotulagem e Tabela Nutricional Oficial',
    caption:
      'Informações transparentes de conservação a -18°C, tabela nutricional completa e padrão original de fábrica.',
    category: 'produto',
    categoryLabel: 'Produto & Embalagem',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'pack-distribuicao',
    src: '/images/acai-estabelecimento-4.jpg',
    alt: 'Pack fechado de Açaizinho Tradicional pronto para entrega, revenda e eventos em Goiás',
    title: 'Pack Pronto para Consumo e Revenda',
    caption:
      'Formato prático para abastecer freezers residenciais, eventos, academias e pontos de revenda com giro rápido.',
    category: 'produto',
    categoryLabel: 'Produto & Embalagem',
    aspectClass: 'aspect-[1024/1063]',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'dep-1',
    name: 'Mariana Ferreira',
    context: 'Parque Real de Goiânia · Compra recorrente',
    rating: 5,
    text: 'Compro os pacotes de 12 unidades toda semana para ter em casa. O formato de 70ml é super prático para as crianças e o sabor com banana e guaraná é muito cremoso.',
    dateLabel: 'Cliente verificada',
  },
  {
    id: 'dep-2',
    name: 'Rafael Oliveira',
    context: 'Aparecida de Goiânia · Encomenda para evento',
    rating: 5,
    text: 'Agendei a retirada pelo WhatsApp para uma confraternização de fim de semana. Atendimento rápido na Av. São Paulo, estacionamento fácil e produto bem congelado.',
    dateLabel: 'Retirada agendada',
  },
  {
    id: 'dep-3',
    name: 'Camila Mendes',
    context: 'Região Metropolitana de Goiânia · Revenda local',
    rating: 5,
    text: 'Excelente giro para quem trabalha com revenda. A embalagem chama muita atenção e a padronização dos saquinhos de 70ml facilita muito o controle de estoque no freezer.',
    dateLabel: 'Parceira comercial',
  },
  {
    id: 'dep-4',
    name: 'Lucas Ribeiro',
    context: 'Goiânia · Pós-treino diário',
    rating: 5,
    text: 'Uso antes e depois dos treinos pela praticidade de abrir direto do freezer. Energia imediata, sem sujeira e com o gostinho autêntico do açaí tradicional.',
    dateLabel: 'Consumidor frequente',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Como funciona o atendimento da Açaizinho Goiás?',
    answer:
      'Somos distribuidor oficial em Aparecida de Goiânia. Atendemos tanto clientes que desejam pacotes para consumo próprio e eventos quanto revendedores interessados em abastecer seus pontos de venda. Você pode agendar sua retirada nesta página ou chamar diretamente no WhatsApp (62) 99815-9040.',
  },
  {
    id: 'faq-2',
    question: 'Qual o tamanho e a quantidade de cada pacote?',
    answer:
      'Cada pacote do Açaizinho Tradicional com banana e guaraná contém 12 unidades individuais de 70 ml, totalizando 0,750 kg de peso líquido. O formato em sachê pronto para consumo oferece praticidade total sem desperdício.',
  },
  {
    id: 'faq-3',
    question: 'Como conservar o Açaizinho após a retirada?',
    answer:
      'O produto deve ser mantido em freezer a -18 °C para preservar textura, sabor e propriedades originais. Não é recomendado recongelar após o descongelamento completo.',
  },
  {
    id: 'faq-4',
    question: 'Quais são os ingredientes e informações para alérgicos?',
    answer:
      'A linha tradicional leva água, açaí, açúcar cristal, banana, extrato de guaraná e acidulante/estabilizantes próprios para gelados comestíveis. Não contém glúten. Alérgicos: contém derivados de leite e soja, conforme informado na rotulagem oficial da embalagem.',
  },
  {
    id: 'faq-5',
    question: 'Onde fica o ponto de retirada e há estacionamento?',
    answer:
      'Estamos na Av. São Paulo, 730 - Qd 40 lt 12/13 S/N - Parque Real de Goiânia, Aparecida de Goiânia - GO (CEP 74910-090). Nossa unidade conta com área de estacionamento na frente para carregar seus pacotes com tranquilidade.',
  },
  {
    id: 'faq-6',
    question: 'Posso agendar data e horário para retirar minha encomenda?',
    answer:
      'Sim! Basta preencher a seção de Agendamento Online nesta página escolhendo o tipo de pedido, a data e o horário desejado. Ao confirmar, sua solicitação é encaminhada com todos os dados prontos para o nosso WhatsApp oficial.',
  },
];

export const TIME_SLOTS = ['08:30', '10:00', '11:30', '14:00', '15:30', '17:00'];
