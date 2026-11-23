"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Pause, Play, QrCode, CreditCard, Barcode } from "lucide-react";
import { brl, METHOD_LABEL, PAYERS, type PayMethod, type Payment } from "@/lib/data";
import { AnimatedNumber } from "@/components/motion-primitives";

type Filter = "todos" | PayMethod;

const METHOD_ICON: Record<PayMethod, typeof QrCode> = {
  pix: QrCode,
  cartao: CreditCard,
  boleto: Barcode,
};

function randomPayment(id: number): Payment {
  const roll = Math.random();
  const method: PayMethod = roll < 0.52 ? "pix" : roll < 0.86 ? "cartao" : "boleto";
  const range: Record<PayMethod, [number, number]> = {
    pix: [18, 840],
    cartao: [49, 2490],
    boleto: [89, 1490],
  };
  const [min, max] = range[method];
  return {
    id,
    payer: PAYERS[Math.floor(Math.random() * PAYERS.length)],
    method,
    value: Math.round((min + Math.random() * (max - min)) * 100) / 100,
    status: Math.random() < 0.93 ? "aprovado" : "em análise",
    time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
  };
}

/** Console ao vivo: pagamentos chegando de verdade no navegador. */
export function Console() {
  const reduce = useReducedMotion();
  const [items, setItems] = useState<Payment[]>([]);
  const [running, setRunning] = useState(true);
  const [filter, setFilter] = useState<Filter>("todos");
  const idRef = useRef(0);

  useEffect(() => {
    // Semente inicial — gerada no cliente para não divergir do SSR.
    const seed = Array.from({ length: 5 }, () => randomPayment(++idRef.current));
    setItems(seed.reverse());
  }, []);

  useEffect(() => {
    if (!running || reduce) return;
    const t = setInterval(() => {
      setItems((prev) => [randomPayment(++idRef.current), ...prev].slice(0, 7));
    }, 1900);
    return () => clearInterval(t);
  }, [running, reduce]);

  const visible = useMemo(
    () => (filter === "todos" ? items : items.filter((p) => p.method === filter)),
    [items, filter],
  );

  const approved = items.filter((p) => p.status === "aprovado");
  const volume = approved.reduce((s, p) => s + p.value, 0);
  const approval = items.length ? Math.round((approved.length / items.length) * 1000) / 10 : 100;

  const filters: { id: Filter; label: string }[] = [
    { id: "todos", label: "Todos" },
    { id: "pix", label: "Pix" },
    { id: "cartao", label: "Cartão" },
    { id: "boleto", label: "Boleto" },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-coal/90 shadow-[0_0_80px_rgba(0,229,255,0.07)] backdrop-blur">
      {/* Barra do console */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
        <p className="flex items-center gap-2.5 font-mono text-xs tracking-widest text-mist uppercase">
          <span className="relative flex size-2">
            <span className="live-ping absolute inline-flex size-2 rounded-full bg-accent" aria-hidden="true" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" aria-hidden="true" />
          </span>
          Pagamentos ao vivo
          <span className="text-fog normal-case">· demonstração</span>
        </p>
        <div className="flex items-center gap-2">
          <div className="flex rounded-full border border-line p-0.5" role="group" aria-label="Filtrar por método">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`rounded-full px-2.5 py-1 font-mono text-[11px] transition-colors ${
                  filter === f.id ? "bg-accent font-semibold text-black" : "text-mist hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setRunning((v) => !v)}
            className="grid size-8 place-items-center rounded-full border border-line text-white transition-colors hover:border-accent hover:text-accent"
            aria-label={running ? "Pausar fluxo" : "Retomar fluxo"}
          >
            {running ? <Pause className="size-3.5" aria-hidden="true" /> : <Play className="size-3.5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Totais ao vivo */}
      <div className="grid grid-cols-3 divide-x divide-line border-b border-line">
        {[
          { label: "Volume nesta sessão", value: volume, fmt: (v: number) => brl(v) },
          { label: "Pagamentos", value: items.length, fmt: (v: number) => String(Math.round(v)) },
          { label: "Aprovação", value: approval, fmt: (v: number) => `${v.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%` },
        ].map((s) => (
          <div key={s.label} className="px-4 py-3 sm:px-5">
            <p className="font-mono text-[10px] tracking-widest text-fog uppercase">{s.label}</p>
            <p className="mt-1 font-display text-lg font-semibold text-white sm:text-xl">
              <AnimatedNumber value={s.value} format={s.fmt} />
            </p>
          </div>
        ))}
      </div>

      {/* Fluxo */}
      <ul className="min-h-[296px] divide-y divide-line" aria-live="polite">
        <AnimatePresence initial={false}>
          {visible.map((p) => {
            const Icon = METHOD_ICON[p.method];
            return (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, y: -14, backgroundColor: "rgba(0,229,255,0.10)" }}
                animate={{ opacity: 1, y: 0, backgroundColor: "rgba(0,229,255,0)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3 px-4 py-3 sm:px-5"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-md border border-line bg-panel text-accent" aria-hidden="true">
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-white">{p.payer}</span>
                  <span className="block font-mono text-[11px] text-mist">
                    {METHOD_LABEL[p.method]} · {p.time}
                  </span>
                </span>
                <span className="font-mono text-sm font-semibold text-white">{brl(p.value)}</span>
                <span
                  className={`hidden shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] tracking-wide uppercase sm:inline-block ${
                    p.status === "aprovado" ? "bg-accent-soft text-accent" : "bg-yellow-400/10 text-yellow-300"
                  }`}
                >
                  {p.status}
                </span>
              </motion.li>
            );
          })}
        </AnimatePresence>
        {visible.length === 0 ? (
          <li className="px-5 py-10 text-center text-sm text-mist">
            Nenhum pagamento deste método por aqui ainda — o fluxo continua rodando.
          </li>
        ) : null}
      </ul>

      <div className="border-t border-line px-4 py-3 sm:px-5">
        <p className="font-mono text-[11px] text-fog">
          <span className="text-accent" aria-hidden="true">$</span> vortex — fluxo de demonstração
          <span className="caret-blink ml-1 inline-block h-3.5 w-[7px] translate-y-0.5 bg-accent" aria-hidden="true" />
        </p>
      </div>
    </div>
  );
}
