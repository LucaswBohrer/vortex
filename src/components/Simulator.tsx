"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { BASELINE_FEES, brl, VORTEX_FEES } from "@/lib/data";
import { AnimatedNumber, Reveal, SectionHeading } from "@/components/motion-primitives";

function Slider({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={label} className="text-sm font-medium text-white/85">
          {label}
        </label>
        <span className="font-mono text-sm font-semibold text-accent">{display}</span>
      </div>
      <input
        id={label}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-[#00e5ff]"
      />
      <div className="mt-1 flex justify-between font-mono text-[10px] text-fog">
        <span>{min.toLocaleString("pt-BR")}</span>
        <span>{max.toLocaleString("pt-BR")}</span>
      </div>
    </div>
  );
}

/** Simulador de taxas — matemática real, premissas declaradas na tela. */
export function Simulator() {
  const [volume, setVolume] = useState(250_000);
  const [ticket, setTicket] = useState(180);
  const [pixPct, setPixPct] = useState(55);
  const [cardPct, setCardPct] = useState(35);
  const boletoPct = Math.max(0, 100 - pixPct - cardPct);

  const result = useMemo(() => {
    const txns = volume / ticket;
    const mix = { pix: pixPct / 100, cartao: cardPct / 100, boleto: boletoPct / 100 };
    const cost = (pct: number, fixed: number, share: number) =>
      volume * share * pct + txns * share * fixed;
    const vortex =
      cost(VORTEX_FEES.pix.pct, VORTEX_FEES.pix.fixed, mix.pix) +
      cost(VORTEX_FEES.cartao.pct, VORTEX_FEES.cartao.fixed, mix.cartao) +
      cost(VORTEX_FEES.boleto.pct, VORTEX_FEES.boleto.fixed, mix.boleto);
    const baseline =
      cost(BASELINE_FEES.pct, BASELINE_FEES.fixed, 1);
    const savings = Math.max(0, baseline - vortex);
    return { txns, vortex, baseline, savings, savingsPct: baseline ? (savings / baseline) * 100 : 0 };
  }, [volume, ticket, pixPct, cardPct, boletoPct]);

  return (
    <section id="simulador" className="border-y border-line bg-coal py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          label="Simulador de taxas"
          title={
            <>
              Quanto você
              <br />
              <span className="text-accent">deixa de pagar?</span>
            </>
          }
          intro="Arraste e veja o custo mudar ao vivo. Sem e-mail, sem ligação de vendedor — só matemática, com as taxas declaradas abaixo."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Controles */}
          <Reveal className="rounded-2xl border border-line bg-black/60 p-6 sm:p-8">
            <div className="space-y-8">
              <Slider
                label="Volume mensal"
                value={volume}
                display={brl(volume)}
                min={10_000}
                max={2_000_000}
                step={10_000}
                onChange={setVolume}
              />
              <Slider
                label="Ticket médio"
                value={ticket}
                display={brl(ticket)}
                min={20}
                max={2000}
                step={10}
                onChange={setTicket}
              />
              <Slider
                label="Pix no mix"
                value={pixPct}
                display={`${pixPct}%`}
                min={0}
                max={80}
                step={5}
                onChange={(v) => {
                  setPixPct(v);
                  if (v + cardPct > 100) setCardPct(100 - v);
                }}
              />
              <Slider
                label="Cartão no mix"
                value={cardPct}
                display={`${cardPct}%`}
                min={0}
                max={100 - pixPct}
                step={5}
                onChange={setCardPct}
              />
              <p className="rounded-lg border border-line bg-panel px-4 py-3 font-mono text-xs leading-relaxed text-mist">
                Mix atual — Pix {pixPct}% · Cartão {cardPct}% · Boleto {boletoPct}% ·{" "}
                {Math.round(result.txns).toLocaleString("pt-BR")} transações / mês
              </p>
            </div>
          </Reveal>

          {/* Resultado */}
          <Reveal delay={0.1} className="flex flex-col rounded-2xl border border-accent/40 bg-panel p-6 sm:p-8">
            <p className="font-mono text-[11px] tracking-[0.25em] text-fog uppercase">Custo mensal estimado</p>

            <div className="mt-6 space-y-5">
              <div>
                <p className="flex items-baseline justify-between gap-3 text-sm text-mist">
                  <span>Tarifa genérica — 4,99% + R$ 0,49</span>
                  <span className="font-mono font-semibold text-white">
                    <AnimatedNumber value={result.baseline} format={brl} />
                  </span>
                </p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-line">
                  <motion.div
                    animate={{ width: "100%" }}
                    className="h-full rounded-full bg-white/30"
                  />
                </div>
              </div>

              <div>
                <p className="flex items-baseline justify-between gap-3 text-sm text-mist">
                  <span>VORTEX</span>
                  <span className="font-mono font-semibold text-accent">
                    <AnimatedNumber value={result.vortex} format={brl} />
                  </span>
                </p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-line">
                  <motion.div
                    animate={{ width: `${Math.max(4, (result.vortex / Math.max(1, result.baseline)) * 100)}%` }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-accent"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-line pt-6">
              <p className="font-mono text-[11px] tracking-[0.25em] text-fog uppercase">Você economiza por mês</p>
              <p className="mt-2 font-display text-5xl font-semibold tracking-tight text-accent sm:text-6xl">
                <AnimatedNumber value={result.savings} format={brl} />
              </p>
              <p className="mt-2 text-sm text-mist">
                <AnimatedNumber value={result.savingsPct} format={(v) => `${v.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`} />{" "}
                a menos que a tarifa genérica —{" "}
                <AnimatedNumber value={result.savings * 12} format={brl} /> por ano.
              </p>
            </div>

            <p className="mt-auto pt-6 font-mono text-[11px] leading-relaxed text-fog">
              Premissas: Pix 0,99% · Cartão 3,49% + R$ 0,49 · Boleto 1,99% + R$ 1,90.
              Linha de base: 4,99% + R$ 0,49 em todos os métodos. Valores de demonstração.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
