"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/motion-primitives";

function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: reduce ? 0 : 1.6,
      ease: EASE,
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString("pt-BR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

const METRICS = [
  { value: 4.8, decimals: 1, prefix: "R$ ", suffix: " bi", label: "processados por ano", note: "volume ilustrativo" },
  { value: 99.98, decimals: 2, prefix: "", suffix: "%", label: "de disponibilidade da plataforma", note: "SLA do conceito" },
  { value: 1.2, decimals: 1, prefix: "", suffix: " s", label: "para o Pix cair na conta", note: "liquidação média" },
  { value: 0.4, decimals: 1, prefix: "", suffix: "%", label: "de chargeback na base", note: "com antifraude ativo" },
];

/** Números animados no scroll — rotulados como ilustrativos do conceito. */
export function Metrics() {
  return (
    <section id="numeros" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="05"
          label="Números"
          title={
            <>
              Velocidade que
              <br />
              <span className="text-outline">dá para medir.</span>
            </>
          }
          intro="Números ilustrativos do conceito VORTEX — não são resultados reais de clientes. Eles existem para mostrar a ordem de grandeza que a infraestrutura foi desenhada para entregar."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08} className="bg-coal p-7 sm:p-8">
              <p className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                <Counter value={m.value} decimals={m.decimals} prefix={m.prefix} suffix={m.suffix} />
              </p>
              <p className="mt-3 text-sm leading-relaxed text-mist">{m.label}</p>
              <p className="mt-1 font-mono text-[10px] tracking-widest text-fog uppercase">{m.note}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
