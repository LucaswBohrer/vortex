"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { PRICING } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/motion-primitives";

/** Planos — o toggle mensal/anual muda os preços de verdade. */
export function Pricing() {
  const [annual, setAnnual] = useState(false);
  const reduce = useReducedMotion();

  return (
    <section id="planos" className="border-y border-line bg-coal py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="06"
          label="Planos"
          title={
            <>
              Preço claro,
              <br />
              <span className="text-accent">antes de pagar.</span>
            </>
          }
          intro="Sem taxa de adesão, sem fidelidade, sem letra miúda. O simulador lá em cima já mostrou o custo por transação — aqui está a mensalidade."
        />

        {/* Toggle mensal / anual */}
        <Reveal className="mt-10 flex items-center gap-3">
          <span className={`text-sm ${annual ? "text-mist" : "font-semibold text-white"}`}>Mensal</span>
          <button
            type="button"
            role="switch"
            aria-checked={annual}
            aria-label="Alternar entre cobrança mensal e anual"
            onClick={() => setAnnual((v) => !v)}
            className={`relative h-7 w-12 rounded-full transition-colors ${annual ? "bg-accent" : "bg-line-soft"}`}
          >
            <span
              className={`absolute top-0.5 size-6 rounded-full bg-white transition-all ${annual ? "left-[22px]" : "left-0.5"}`}
            />
          </button>
          <span className={`text-sm ${annual ? "font-semibold text-white" : "text-mist"}`}>
            Anual
            <span className="ml-2 rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[11px] text-accent">−20%</span>
          </span>
        </Reveal>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {PRICING.map((tier, i) => {
            const price = annual ? tier.annual : tier.monthly;
            return (
              <Reveal
                key={tier.name}
                delay={i * 0.08}
                className={`relative flex flex-col rounded-2xl border p-7 sm:p-8 ${
                  tier.highlight
                    ? "border-accent/60 bg-panel shadow-[0_0_80px_rgba(0,229,255,0.10)]"
                    : "border-line bg-black/60"
                }`}
              >
                {tier.highlight ? (
                  <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-black uppercase">
                    Mais escolhido
                  </span>
                ) : null}
                <h3 className="font-display text-2xl font-semibold text-white">{tier.name}</h3>
                <p className="mt-2 min-h-10 text-sm leading-relaxed text-mist">{tier.blurb}</p>
                <p className="mt-2 font-mono text-xs text-accent">{tier.fees}</p>

                <div className="mt-6 flex items-baseline gap-2">
                  {price === null ? (
                    <span className="font-display text-4xl font-semibold text-white">Sob consulta</span>
                  ) : (
                    <>
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={price}
                          initial={reduce ? false : { opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduce ? undefined : { opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="font-display text-5xl font-semibold tracking-tight text-white"
                        >
                          R$ {price}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-sm text-mist">/ mês{annual ? " · no anual" : ""}</span>
                    </>
                  )}
                </div>

                <ul className="mt-7 flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/85">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#comecar"
                  className={`group mt-8 inline-flex items-center justify-center gap-1.5 rounded-full px-6 py-3 text-sm font-semibold transition-transform duration-200 hover:scale-[1.02] ${
                    tier.highlight ? "bg-accent text-black" : "border border-line-soft text-white hover:border-accent hover:text-accent"
                  }`}
                >
                  {tier.cta}
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </a>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-6 font-mono text-[11px] text-fog">
          Valores de demonstração do conceito VORTEX. Taxas por transação conforme o plano escolhido.
        </p>
      </div>
    </section>
  );
}
