"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { brl, FRAUD_RULES, PAYERS, type FraudTxn } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/motion-primitives";

const FLAG_LABEL: Record<string, string> = {
  velocidade: "tentativas rápidas",
  dispositivo: "dispositivo novo",
  valor: "valor atípico",
  geo: "localização impossível",
};

function randomTxn(id: number): FraudTxn {
  const flags: string[] = [];
  const pool = ["velocidade", "dispositivo", "valor", "geo"];
  for (const f of pool) if (Math.random() < 0.28) flags.push(f);
  return {
    id,
    payer: PAYERS[Math.floor(Math.random() * PAYERS.length)],
    value: Math.round((40 + Math.random() * 4200) * 100) / 100,
    flags,
  };
}

/** Antifraude interativo — ligue e desligue as regras e veja o feed mudar. */
export function Fraud() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    velocidade: true,
    dispositivo: true,
    valor: false,
    geo: true,
  });
  const [txns, setTxns] = useState<FraudTxn[]>([]);

  useEffect(() => {
    // Semente gerada no cliente (setTimeout evita divergência com o SSR).
    const t = setTimeout(() => {
      setTxns(Array.from({ length: 6 }, (_, i) => randomTxn(i + 1)));
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const evaluated = useMemo(
    () =>
      txns.map((t) => {
        const hit = t.flags.filter((f) => enabled[f]);
        return { ...t, blocked: hit.length > 0, hit };
      }),
    [txns, enabled],
  );

  const blocked = evaluated.filter((t) => t.blocked).length;
  const approved = evaluated.length - blocked;

  function toggle(id: string) {
    setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <section id="seguranca" className="border-y border-line bg-coal py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          label="Segurança · demonstração interativa"
          title={
            <>
              Antifraude que você
              <br />
              <span className="text-accent">pode tocar.</span>
            </>
          }
          intro="Estas são transações de demonstração. Ligue e desligue as regras ao lado e veja, ao vivo, quais seriam aprovadas e quais seriam bloqueadas — com o motivo de cada decisão."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* Regras */}
          <Reveal className="space-y-3">
            {FRAUD_RULES.map((rule) => (
              <button
                key={rule.id}
                type="button"
                onClick={() => toggle(rule.id)}
                aria-pressed={enabled[rule.id]}
                className={`w-full rounded-2xl border p-5 text-left transition-all duration-300 ${
                  enabled[rule.id] ? "border-accent/50 bg-panel" : "border-line bg-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="font-display text-lg font-medium text-white">{rule.name}</span>
                  <span
                    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${enabled[rule.id] ? "bg-accent" : "bg-line-soft"}`}
                    aria-hidden="true"
                  >
                    <span
                      className={`absolute top-0.5 size-5 rounded-full bg-white transition-all ${enabled[rule.id] ? "left-[22px]" : "left-0.5"}`}
                    />
                  </span>
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-mist">{rule.description}</span>
                <span className="mt-2 block font-mono text-[11px] tracking-widest text-fog uppercase">
                  {enabled[rule.id] ? "Regra ativa" : "Regra desligada"}
                </span>
              </button>
            ))}
            <p className="rounded-xl border border-line bg-black/60 px-4 py-3 font-mono text-[11px] leading-relaxed text-fog">
              Resultado agora: {approved} aprovadas · {blocked} bloqueadas de {evaluated.length} transações de demonstração.
            </p>
          </Reveal>

          {/* Feed avaliado */}
          <Reveal delay={0.1} className="overflow-hidden rounded-2xl border border-line bg-black/60">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <p className="flex items-center gap-2 font-mono text-xs tracking-widest text-mist uppercase">
                <ShieldCheck className="size-4 text-accent" aria-hidden="true" />
                Transações avaliadas
              </p>
              <button
                type="button"
                onClick={() => setTxns(Array.from({ length: 6 }, (_, i) => randomTxn(Date.now() + i)))}
                className="rounded-full border border-line px-3 py-1.5 font-mono text-[11px] text-white transition-colors hover:border-accent hover:text-accent"
              >
                Gerar novo lote
              </button>
            </div>
            <ul className="divide-y divide-line">
              <AnimatePresence initial={false}>
                {evaluated.map((t) => (
                  <motion.li
                    key={t.id}
                    layout
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-wrap items-center gap-3 px-5 py-3.5"
                  >
                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-md border ${t.blocked ? "border-red-500/40 bg-red-500/10 text-red-400" : "border-line bg-panel text-accent"}`}
                      aria-hidden="true"
                    >
                      {t.blocked ? <ShieldAlert className="size-4" /> : <ShieldCheck className="size-4" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-white">{t.payer}</span>
                      <span className="block font-mono text-[11px] text-mist">
                        {t.hit.length
                          ? `Sinal: ${t.hit.map((h) => FLAG_LABEL[h]).join(" · ")}`
                          : "Nenhum sinal de risco"}
                      </span>
                    </span>
                    <span className="font-mono text-sm font-semibold text-white">{brl(t.value)}</span>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] tracking-wide uppercase ${
                        t.blocked ? "bg-red-500/10 text-red-400" : "bg-accent-soft text-accent"
                      }`}
                    >
                      {t.blocked ? "Bloqueada" : "Aprovada"}
                    </span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
            <p className="border-t border-line px-5 py-3 font-mono text-[11px] text-fog">
              Demonstração: nenhum pagamento real é processado aqui.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
