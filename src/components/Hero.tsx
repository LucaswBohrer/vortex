"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight, Zap } from "lucide-react";
import { Console } from "@/components/Console";
import { TiltCard } from "@/components/TiltCard";
import { CharReveal, LineReveal, Magnetic } from "@/components/motion-primitives";

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yGrid = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="topo" ref={ref} className="relative overflow-hidden pt-28 sm:pt-36">
      {/* Fundo: grade + brilho ciano */}
      <motion.div style={reduce ? undefined : { y: yGrid, opacity }} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="hero-grid absolute inset-0" />
        <div className="absolute top-[-220px] left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.25em] text-mist uppercase"
        >
          <Zap className="size-3.5 text-accent" aria-hidden="true" />
          Infraestrutura de pagamentos · Pix, cartão, boleto e assinaturas
        </motion.p>

        <h1 className="mt-6 font-display text-[13.5vw] leading-[0.95] font-semibold tracking-[-0.04em] text-balance sm:text-7xl lg:text-[92px]">
          <LineReveal delay={0.1}>O dinheiro não</LineReveal>
          <LineReveal delay={0.22}>
            espera. <span className="text-outline">Nem você.</span>
          </LineReveal>
        </h1>

        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl text-base leading-relaxed text-mist sm:text-lg"
          >
            A VORTEX move o dinheiro da sua empresa em tempo real: Pix em segundos,
            cartão com antecipação, boleto sem papelada e assinaturas que se cobram
            sozinhas — com antifraude embutido em cada transação.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <a
                href="#comecar"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-black transition-transform duration-200 hover:scale-[1.03]"
              >
                Abrir conta grátis
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#simulador"
                className="inline-flex items-center gap-2 rounded-full border border-line-soft px-7 py-3.5 text-sm font-medium text-white transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                Simular minhas taxas
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Linha de prova — caracteres revelados */}
        <p className="mt-10 font-mono text-xs tracking-[0.2em] text-fog uppercase sm:text-sm">
          <CharReveal text="PIX EM SEGUNDOS · LIQUIDAÇÃO EM TEMPO REAL · ANTIFRAUDE EMBUTIDO" delay={0.6} />
        </p>

        {/* Console + cartão */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 grid items-start gap-6 pb-20 lg:grid-cols-[1.5fr_1fr]"
        >
          <Console />
          <TiltCard />
        </motion.div>

        <div className="flex justify-center pb-10">
          <a
            href="#como-funciona"
            className="flex flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-fog uppercase transition-colors hover:text-accent"
          >
            Ver o dinheiro se mover
            <motion.span animate={reduce ? undefined : { y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
              <ArrowDown className="size-4" aria-hidden="true" />
            </motion.span>
          </a>
        </div>
      </div>
    </section>
  );
}
