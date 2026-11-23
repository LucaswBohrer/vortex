"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { brl, DASHBOARD, type DashRange, type DashTab } from "@/lib/data";
import { AnimatedNumber, Reveal, SectionHeading } from "@/components/motion-primitives";

const TABS: { id: DashTab; label: string }[] = [
  { id: "visao", label: "Visão geral" },
  { id: "pix", label: "Pix" },
  { id: "cartao", label: "Cartão" },
  { id: "assinaturas", label: "Assinaturas" },
];

/** Dashboard de demonstração — abas e período mudam os números de verdade. */
export function Dashboard() {
  const [tab, setTab] = useState<DashTab>("visao");
  const [range, setRange] = useState<DashRange>("7d");
  const data = DASHBOARD[tab][range];
  const max = Math.max(...data.bars);

  return (
    <section id="dashboard" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          label="Dashboard"
          title={
            <>
              Tudo que entra,
              <br />
              <span className="text-outline">na sua tela.</span>
            </>
          }
          intro="Volume, aprovação e contagem por método, em tempo real. Troque de aba e de período — os números e o gráfico respondem na hora."
        />

        <Reveal className="mt-14 overflow-hidden rounded-2xl border border-line bg-coal">
          {/* Barra de abas */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6">
            <div className="flex flex-wrap gap-1 rounded-full border border-line p-0.5" role="tablist" aria-label="Método de pagamento">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={tab === t.id}
                  onClick={() => setTab(t.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                    tab === t.id ? "bg-accent font-semibold text-black" : "text-mist hover:text-white"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="flex rounded-full border border-line p-0.5" role="group" aria-label="Período">
              {(["7d", "30d"] as DashRange[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRange(r)}
                  aria-pressed={range === r}
                  className={`rounded-full px-3 py-1.5 font-mono text-xs transition-colors ${
                    range === r ? "bg-white font-semibold text-black" : "text-mist hover:text-white"
                  }`}
                >
                  {r === "7d" ? "7 dias" : "30 dias"}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${tab}-${range}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="p-4 sm:p-6"
            >
              {/* KPIs */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Volume", value: data.volume, fmt: brl, delta: "+12,4%", up: true },
                  { label: "Transações", value: data.count, fmt: (v: number) => Math.round(v).toLocaleString("pt-BR"), delta: "+8,1%", up: true },
                  { label: "Aprovação", value: data.approval, fmt: (v: number) => `${v.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`, delta: "+0,3 p.p.", up: true },
                ].map((k) => (
                  <div key={k.label} className="rounded-xl border border-line bg-black/60 p-4 sm:p-5">
                    <p className="font-mono text-[10px] tracking-widest text-fog uppercase">{k.label}</p>
                    <p className="mt-2 font-display text-xl font-semibold text-white sm:text-3xl">
                      <AnimatedNumber value={k.value} format={k.fmt} />
                    </p>
                    <p className="mt-1 flex items-center gap-1 font-mono text-[11px] text-accent">
                      {k.up ? <ArrowUpRight className="size-3" aria-hidden="true" /> : <ArrowDownRight className="size-3" aria-hidden="true" />}
                      {k.delta} vs período anterior
                    </p>
                  </div>
                ))}
              </div>

              {/* Gráfico de barras */}
              <div className="mt-6 rounded-xl border border-line bg-black/60 p-4 sm:p-5">
                <p className="flex items-center justify-between font-mono text-[11px] tracking-widest text-fog uppercase">
                  <span>Volume por dia — {data.label}</span>
                  <span>{range === "7d" ? "últimos 7 dias" : "últimos 30 dias"}</span>
                </p>
                <div className="mt-5 flex h-36 items-end gap-1.5 sm:h-44 sm:gap-2" role="img" aria-label={`Gráfico de volume diário de ${data.label} nos últimos ${range === "7d" ? "7" : "30"} dias`}>
                  {data.bars.map((b, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${(b / max) * 100}%` }}
                      transition={{ duration: 0.6, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                      className={`flex-1 rounded-t-sm ${i === data.bars.length - 1 ? "bg-accent" : "bg-white/20 hover:bg-accent/60"}`}
                      title={`${b}% do pico`}
                    />
                  ))}
                </div>
                <p className="mt-4 font-mono text-[11px] text-fog">
                  Dados de demonstração do conceito VORTEX — não são métricas reais de empresas.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
