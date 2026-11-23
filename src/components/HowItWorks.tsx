"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Check, QrCode, CreditCard, Barcode, ShieldCheck, Wallet, Zap } from "lucide-react";
import { SectionHeading } from "@/components/motion-primitives";

const STEPS = [
  {
    id: "01",
    title: "Receba",
    headline: "O cliente paga como quiser.",
    body: "Pix, cartão à vista ou parcelado, boleto e assinatura — um só link, um só QR Code, um só checkout. Sem redirecionar o cliente para lugar nenhum.",
    points: ["Pix com QR Code dinâmico", "Cartão com parcelamento em até 12x", "Boleto registrado automático"],
    visual: "receba",
  },
  {
    id: "02",
    title: "Processe",
    headline: "Cada pagamento passa pelo crivo.",
    body: "Em milissegundos, o antifraude avalia dispositivo, comportamento, valor e geolocalização — e decide: aprova, revisa ou bloqueia. Você vê o motivo de cada decisão.",
    points: ["Análise em menos de 300 ms", "Escore explicado, transação por transação", "Regras que você liga e desliga"],
    visual: "processe",
  },
  {
    id: "03",
    title: "Antecipe",
    headline: "O dinheiro não precisa esperar 30 dias.",
    body: "Antecipe recebíveis de cartão com a taxa exibida antes de confirmar. Ou ligue a antecipação automática e receba tudo no dia seguinte, sempre.",
    points: ["Taxa exibida antes de confirmar", "Antecipação automática por regra", "Sem fidelidade nem volume mínimo"],
    visual: "antecipe",
  },
  {
    id: "04",
    title: "Liquide",
    headline: "Cai na conta. Ponto.",
    body: "Pix em segundos, cartão no dia seguinte, boleto em 1 dia útil. O saldo aparece no dashboard em tempo real e a conciliação é automática, lançamento a lançamento.",
    points: ["Pix 24/7, inclusive feriados", "Conciliação automática", "Transferência para qualquer banco, sem tarifa"],
    visual: "liquide",
  },
] as const;

/** Faixa de fluxo: pontos de dinheiro viajam conforme você rola a página. */
function FlowBand() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["-8%", "108%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-38%", "78%"]);
  const x3 = useTransform(scrollYProgress, [0, 1], ["-68%", "48%"]);

  return (
    <div ref={ref} className="relative h-16 overflow-hidden border-y border-line" aria-hidden="true">
      <div className="absolute top-1/2 right-0 left-0 h-px bg-line" />
      <div className="absolute top-1/2 right-0 left-0 h-px">
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <line x1="0" y1="0" x2="100%" y2="0" stroke="#00e5ff" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="4 10" className="dash-march" />
        </svg>
      </div>
      {reduce ? null : (
        <>
          {[x1, x2, x3].map((x, i) => (
            <motion.div
              key={i}
              style={{ x, left: 0 }}
              className="absolute top-1/2 -translate-y-1/2"
            >
              <span className={`block rounded-full bg-accent ${i === 0 ? "size-2.5 shadow-[0_0_16px_rgba(0,229,255,0.9)]" : "size-1.5 opacity-70"}`} />
            </motion.div>
          ))}
        </>
      )}
      <p className="absolute top-1/2 right-4 hidden -translate-y-1/2 font-mono text-[10px] tracking-[0.25em] text-fog uppercase sm:block">
        O fluxo acompanha o seu scroll
      </p>
    </div>
  );
}

function StepVisual({ kind }: { kind: (typeof STEPS)[number]["visual"] }) {
  if (kind === "receba") {
    return (
      <div className="space-y-2">
        {[
          { icon: QrCode, label: "Pix · R$ 189,90", tag: "aprovado" },
          { icon: CreditCard, label: "Cartão · 3x de R$ 129,90", tag: "aprovado" },
          { icon: Barcode, label: "Boleto · R$ 449,00", tag: "aguardando" },
        ].map((r) => (
          <div key={r.label} className="flex items-center gap-3 rounded-lg border border-line bg-black/60 px-3 py-2.5">
            <r.icon className="size-4 shrink-0 text-accent" aria-hidden="true" />
            <span className="flex-1 font-mono text-xs text-white/85">{r.label}</span>
            <span className="font-mono text-[10px] tracking-wide text-mist uppercase">{r.tag}</span>
          </div>
        ))}
      </div>
    );
  }
  if (kind === "processe") {
    return (
      <div className="space-y-3 rounded-lg border border-line bg-black/60 p-4">
        <p className="flex items-center gap-2 font-mono text-xs text-white/85">
          <ShieldCheck className="size-4 text-accent" aria-hidden="true" />
          Escore de risco: 12 / 100 — baixo
        </p>
        <div className="h-2 overflow-hidden rounded-full bg-line">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "12%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full bg-accent"
          />
        </div>
        <p className="font-mono text-[11px] leading-relaxed text-mist">
          Dispositivo conhecido · valor dentro do padrão · localização coerente
        </p>
      </div>
    );
  }
  if (kind === "antecipe") {
    return (
      <div className="rounded-lg border border-line bg-black/60 p-4">
        <div className="flex items-baseline justify-between gap-2">
          <p className="font-mono text-xs text-mist">Vendas de cartão · 30 dias</p>
          <p className="font-mono text-sm font-semibold text-white">R$ 86.400</p>
        </div>
        <div className="mt-3 flex items-center gap-2 font-mono text-xs">
          <span className="rounded-full bg-accent-soft px-2 py-1 text-accent">Antecipar tudo</span>
          <ArrowDown className="size-3 text-mist" aria-hidden="true" />
          <span className="text-white/85">na conta amanhã · taxa 1,89%</span>
        </div>
        <p className="mt-3 font-display text-2xl font-semibold text-accent">R$ 84.766,56</p>
      </div>
    );
  }
  return (
    <div className="rounded-lg border border-line bg-black/60 p-4">
      <p className="flex items-center gap-2 font-mono text-xs text-white/85">
        <Wallet className="size-4 text-accent" aria-hidden="true" />
        Saldo disponível
      </p>
      <p className="mt-2 font-display text-3xl font-semibold text-white">R$ 48.230,90</p>
      <p className="mt-2 flex items-center gap-1.5 font-mono text-[11px] text-accent">
        <Check className="size-3.5" aria-hidden="true" />
        Conciliado · 0 divergências hoje
      </p>
    </div>
  );
}

export function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section id="como-funciona" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="01"
          label="Como o dinheiro se move"
          title={
            <>
              Quatro passos.
              <br />
              <span className="text-outline">Zero atrito.</span>
            </>
          }
          intro="Do pagamento do cliente ao saldo na sua conta, cada etapa é visível, auditável e rápida. Role e veja cada passo acender."
        />
      </div>

      <div className="mt-14">
        <FlowBand />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 pt-14 sm:px-8 lg:grid-cols-[1fr_1.1fr]">
        {/* Painel fixo — passo ativo */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-mono text-xs tracking-[0.25em] text-accent uppercase">
                Passo {STEPS[active].id} — {STEPS[active].title}
              </p>
              <h3 className="mt-4 font-display text-3xl leading-tight font-medium tracking-[-0.02em] sm:text-4xl">
                {STEPS[active].headline}
              </h3>
              <p className="mt-4 max-w-lg leading-relaxed text-mist">{STEPS[active].body}</p>
              <div className="mt-8">
                <StepVisual kind={STEPS[active].visual} />
              </div>
            </motion.div>
          </AnimatePresence>
          <p className="mt-8 flex items-center gap-2 font-mono text-[11px] tracking-widest text-fog uppercase">
            <Zap className="size-3.5 text-accent" aria-hidden="true" />
            Tempo médio do fluxo completo: 1,2 s
          </p>
        </div>

        {/* Lista de passos */}
        <ol className="space-y-4">
          {STEPS.map((step, i) => (
            <motion.li
              key={step.id}
              onViewportEnter={() => setActive(i)}
              viewport={{ margin: "-40% 0px -40% 0px" }}
            >
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={active === i}
                className={`w-full rounded-2xl border p-6 text-left transition-all duration-300 sm:p-7 ${
                  active === i
                    ? "border-accent/50 bg-panel shadow-[0_0_60px_rgba(0,229,255,0.08)]"
                    : "border-line bg-transparent hover:border-line-soft"
                }`}
              >
                <span className="flex items-baseline justify-between gap-4">
                  <span className={`font-display text-2xl font-semibold ${active === i ? "text-accent" : "text-fog"}`}>
                    {step.id}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-fog uppercase">
                    {active === i ? "Ativo agora" : "Passo"}
                  </span>
                </span>
                <span className="mt-3 block font-display text-2xl font-medium text-white">{step.title}</span>
                <span className="mt-2 block text-sm leading-relaxed text-mist">{step.headline}</span>
                <span className="mt-4 block space-y-1.5">
                  {step.points.map((p) => (
                    <span key={p} className="flex items-center gap-2 font-mono text-xs text-mist">
                      <Check className="size-3.5 shrink-0 text-accent" aria-hidden="true" />
                      {p}
                    </span>
                  ))}
                </span>
              </button>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
