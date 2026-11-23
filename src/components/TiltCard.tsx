"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { Nfc, Wifi } from "lucide-react";

/** Cartão VORTEX com tilt 3D e brilho que segue o ponteiro. */
export function TiltCard() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 160, damping: 16, mass: 0.5 });
  const sry = useSpring(ry, { stiffness: 160, damping: 16, mass: 0.5 });
  const glare = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgba(0,229,255,0.22), transparent 65%)`;

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 18);
    rx.set((0.5 - py) * 16);
    gx.set(px * 100);
    gy.set(py * 100);
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
    gx.set(50);
    gy.set(50);
  }

  return (
    <div style={{ perspective: 1200 }} className="mx-auto w-full max-w-md">
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={reduce ? undefined : { rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        className="relative aspect-[8/5] w-full overflow-hidden rounded-2xl border border-line-soft bg-gradient-to-br from-[#101418] via-[#0a0a0a] to-black p-5 shadow-[0_30px_80px_rgba(0,0,0,0.8)] sm:p-6"
        role="img"
        aria-label="Cartão VORTEX de demonstração — passe o cursor para inclinar"
      >
        {/* Brilho que segue o ponteiro */}
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: glare }} aria-hidden="true" />
        {/* Linhas de fluxo ao fundo */}
        <svg className="pointer-events-none absolute inset-0 size-full opacity-40" aria-hidden="true">
          <path
            d="M-20 120 C 120 60, 240 180, 460 90"
            fill="none"
            stroke="#00e5ff"
            strokeOpacity="0.35"
            strokeWidth="1.5"
            strokeDasharray="4 8"
            className="dash-march"
          />
          <path
            d="M-20 170 C 140 120, 260 210, 460 140"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.12"
            strokeWidth="1"
          />
        </svg>

        <div className="relative flex h-full flex-col justify-between" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="font-display text-lg font-semibold tracking-[0.22em] text-white">VORTEX</p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.3em] text-mist uppercase">Conta · Black</p>
            </div>
            <Nfc className="size-6 -rotate-90 text-accent" aria-hidden="true" />
          </div>

          <div>
            <p className="font-mono text-base tracking-[0.18em] text-white/90 sm:text-lg">
              4024&nbsp;&nbsp;••••&nbsp;&nbsp;••••&nbsp;&nbsp;8821
            </p>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="font-mono text-[10px] tracking-widest text-fog uppercase">Titular</p>
                <p className="mt-0.5 font-mono text-xs text-white/85">SUA EMPRESA LTDA</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[10px] tracking-widest text-fog uppercase">Saldo hoje</p>
                <p className="mt-0.5 font-mono text-sm font-semibold text-accent">R$ 48.230,90</p>
              </div>
              <Wifi className="mb-0.5 size-5 rotate-90 text-white/60" aria-hidden="true" />
            </div>
          </div>
        </div>
      </motion.div>
      <p className="mt-3 text-center font-mono text-[11px] tracking-widest text-fog uppercase">
        Passe o cursor sobre o cartão
      </p>
    </div>
  );
}
