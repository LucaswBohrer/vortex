"use client";

import { INTEGRATIONS } from "@/lib/data";
import { Reveal } from "@/components/motion-primitives";

/** Faixa de integrações — apenas nomes em texto, nunca clientes inventados. */
export function LogosStrip() {
  return (
    <section aria-label="Integrações" className="border-y border-line py-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-center font-mono text-[11px] tracking-[0.25em] text-fog uppercase">
            Conecta com as ferramentas que você já usa
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {INTEGRATIONS.map((name) => (
              <li
                key={name}
                className="font-display text-lg font-medium tracking-wide text-white/40 transition-colors duration-300 hover:text-white sm:text-xl"
              >
                {name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
