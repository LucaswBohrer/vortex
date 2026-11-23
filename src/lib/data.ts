export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ */
/* Console ao vivo — pagamentos chegando em tempo real                 */
/* ------------------------------------------------------------------ */

export type PayMethod = "pix" | "cartao" | "boleto";

export interface Payment {
  id: number;
  payer: string;
  method: PayMethod;
  value: number;
  status: "aprovado" | "em análise";
  time: string;
}

export const PAYERS = [
  "Mariana S.", "João P.", "Loja Aurora", "Carlos M.", "Fernanda L.",
  "Studio Prisma", "Rafael T.", "Café Maré", "Beatriz R.", "Oficina Norte",
  "Larissa C.", "Mercado Verde", "Pedro H.", "Ateliê Flor", "Gustavo A.",
  "Papelaria Central", "Camila D.", "Barbearia 22", "Thiago N.", "Doces da Ju",
];

export const METHOD_LABEL: Record<PayMethod, string> = {
  pix: "Pix",
  cartao: "Cartão",
  boleto: "Boleto",
};

/* ------------------------------------------------------------------ */
/* Simulador de taxas — matemática real, premissas declaradas          */
/* ------------------------------------------------------------------ */

/** Taxas VORTEX (conceito): Pix 0,99% · Cartão 3,49% + R$ 0,49 · Boleto 1,99% + R$ 1,90 */
export const VORTEX_FEES = {
  pix: { pct: 0.0099, fixed: 0 },
  cartao: { pct: 0.0349, fixed: 0.49 },
  boleto: { pct: 0.0199, fixed: 1.9 },
};

/** Linha de base genérica para comparação: 4,99% + R$ 0,49 em tudo. */
export const BASELINE_FEES = { pct: 0.0499, fixed: 0.49 };

export function brl(v: number): string {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function brlCompact(v: number): string {
  if (v >= 1_000_000) return `R$ ${(v / 1_000_000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} mi`;
  if (v >= 1_000) return `R$ ${(v / 1_000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} mil`;
  return brl(v);
}

/* ------------------------------------------------------------------ */
/* Dashboard — séries de demonstração                                  */
/* ------------------------------------------------------------------ */

export type DashTab = "visao" | "pix" | "cartao" | "assinaturas";
export type DashRange = "7d" | "30d";

export interface DashSeries {
  label: string;
  volume: number;
  count: number;
  approval: number;
  bars: number[];
}

export const DASHBOARD: Record<DashTab, Record<DashRange, DashSeries>> = {
  visao: {
    "7d": { label: "Visão geral", volume: 482_300, count: 3124, approval: 98.7, bars: [42, 58, 51, 66, 74, 63, 88] },
    "30d": { label: "Visão geral", volume: 1_984_700, count: 12840, approval: 98.4, bars: [38, 46, 52, 44, 61, 57, 69, 74, 66, 80, 77, 92] },
  },
  pix: {
    "7d": { label: "Pix", volume: 268_900, count: 1987, approval: 99.4, bars: [55, 62, 58, 71, 79, 74, 95] },
    "30d": { label: "Pix", volume: 1_102_400, count: 8120, approval: 99.2, bars: [48, 55, 60, 58, 70, 66, 78, 82, 76, 88, 84, 96] },
  },
  cartao: {
    "7d": { label: "Cartão", volume: 171_200, count: 942, approval: 97.9, bars: [35, 44, 40, 52, 49, 58, 64] },
    "30d": { label: "Cartão", volume: 702_800, count: 3890, approval: 97.6, bars: [32, 40, 38, 47, 44, 54, 51, 60, 57, 66, 63, 72] },
  },
  assinaturas: {
    "7d": { label: "Assinaturas", volume: 42_200, count: 195, approval: 99.8, bars: [30, 34, 38, 36, 44, 47, 52] },
    "30d": { label: "Assinaturas", volume: 179_500, count: 830, approval: 99.7, bars: [28, 32, 36, 34, 42, 40, 46, 50, 48, 55, 58, 64] },
  },
};

/* ------------------------------------------------------------------ */
/* Antifraude — regras da demonstração                                 */
/* ------------------------------------------------------------------ */

export interface FraudRule {
  id: string;
  name: string;
  description: string;
}

export const FRAUD_RULES: FraudRule[] = [
  {
    id: "velocidade",
    name: "Velocidade de tentativas",
    description: "Bloqueia quando o mesmo cartão tenta pagar muitas vezes em poucos minutos — sinal clássico de teste de cartão roubado.",
  },
  {
    id: "dispositivo",
    name: "Dispositivo desconhecido",
    description: "Sinaliza compras feitas de um aparelho que nunca apareceu antes para aquele cliente, sem histórico de confiança.",
  },
  {
    id: "valor",
    name: "Valor fora do padrão",
    description: "Sinaliza valores muito acima do ticket habitual daquele cliente — uma compra de R$ 4.800 numa conta que gasta R$ 120.",
  },
  {
    id: "geo",
    name: "Geolocalização impossível",
    description: "Bloqueia quando duas tentativas acontecem em cidades distantes num intervalo menor que o tempo de viagem entre elas.",
  },
];

export interface FraudTxn {
  id: number;
  payer: string;
  value: number;
  flags: string[];
}

/* ------------------------------------------------------------------ */
/* Preços                                                              */
/* ------------------------------------------------------------------ */

export interface PricingTier {
  name: string;
  monthly: number | null;
  annual: number | null;
  blurb: string;
  fees: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}

export const PRICING: PricingTier[] = [
  {
    name: "Start",
    monthly: 99,
    annual: 79,
    blurb: "Para quem está começando a vender online e quer receber sem dor de cabeça.",
    fees: "Pix 0,99% · Cartão 3,49% + R$ 0,49",
    features: [
      "Pix, cartão e boleto",
      "Liquidação Pix em segundos",
      "Dashboard em tempo real",
      "Link de pagamento e QR Code",
      "Suporte por e-mail",
    ],
    cta: "Começar com Start",
  },
  {
    name: "Pro",
    monthly: 299,
    annual: 239,
    blurb: "Para operações que vendem todos os dias e precisam de controle total.",
    fees: "Pix 0,79% · Cartão 3,19% + R$ 0,39",
    features: [
      "Tudo do Start, sem limite de volume",
      "Assinaturas e cobrança recorrente",
      "Antecipação de recebíveis",
      "Antifraude com regras personalizadas",
      "API completa + webhooks",
      "Conciliação automática",
      "Suporte prioritário",
    ],
    cta: "Começar com Pro",
    highlight: true,
  },
  {
    name: "Scale",
    monthly: null,
    annual: null,
    blurb: "Para volumes altos, marketplaces e operações com exigências próprias.",
    fees: "Taxas sob medida, por volume",
    features: [
      "Taxas negociadas por volume",
      "Split de pagamentos e marketplace",
      "Múltiplas contas e subadquirência",
      "SLA 99,99% e gerente dedicado",
      "Ambiente de homologação dedicado",
    ],
    cta: "Falar com a equipe",
  },
];

export const FAQS = [
  {
    q: "Quando o dinheiro cai na conta?",
    a: "Pix cai em segundos, todos os dias — inclusive fim de semana e feriado. Cartão à vista liquida em 1 dia útil no Pro e em até 30 dias no Start, com antecipação disponível. Boleto compensa em 1 dia útil após o pagamento.",
  },
  {
    q: "Como funciona a antecipação de recebíveis?",
    a: "Você escolhe quais vendas de cartão quer antecipar e o valor cai na sua conta no dia seguinte, com uma taxa exibida antes de confirmar — sem surpresa no extrato. A antecipação automática pode ser ligada por regra, por exemplo, antecipar tudo acima de R$ 500.",
  },
  {
    q: "O antifraude bloqueia clientes legítimos?",
    a: "Ele foi desenhado para não bloquear: cada regra gera um escore, e só acima de um limite a transação é recusada. O resto vai para revisão, onde você aprova ou recusa com um clique — e o sistema aprende com cada decisão. Na demonstração desta página você pode ligar e desligar as regras e ver o efeito ao vivo.",
  },
  {
    q: "Preciso de conta em outro banco para usar a VORTEX?",
    a: "Não. A conta VORTEX é a sua conta de recebimentos: o dinheiro das vendas cai nela e você transfere para qualquer banco via Pix, sem tarifa, ou deixa rendendo na conta.",
  },
  {
    q: "Dá para cobrar assinaturas?",
    a: "Sim, no plano Pro em diante. Você cria planos com valor, periodicidade e período de teste, e a VORTEX cuida da cobrança, das tentativas em caso de falha e dos avisos ao cliente — com dunning inteligente que tenta de novo nos melhores horários.",
  },
  {
    q: "A VORTEX é um produto real?",
    a: "Não — a VORTEX é um conceito de produto, uma demonstração de design e interação. Não há clientes, métricas reais de empresas ou backend: os números desta página são ilustrativos do conceito, o simulador usa as taxas declaradas na própria seção e o formulário final apenas abre o seu aplicativo de e-mail.",
  },
];

export const INTEGRATIONS = [
  "Shopify",
  "WooCommerce",
  "Nuvemshop",
  "Hotmart",
  "RD Station",
  "HubSpot",
  "Conta Azul",
  "Omie",
  "Slack",
  "Zapier",
];
