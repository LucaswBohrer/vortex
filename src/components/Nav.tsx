"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Magnetic } from "@/components/motion-primitives";

const LINKS = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#simulador", label: "Simulador" },
  { href: "#dashboard", label: "Dashboard" },
  { href: "#seguranca", label: "Segurança" },
  { href: "#planos", label: "Planos" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-black/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <a
          href="#topo"
          className="flex items-center gap-2.5"
          aria-label="VORTEX — voltar ao topo"
          onClick={() => setOpen(false)}
        >
          <span
            className="grid size-8 place-items-center overflow-hidden rounded-sm bg-accent"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" className="spin-slow size-5 text-black" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M12 3a9 9 0 1 0 9 9" strokeLinecap="round" />
              <path d="M12 3v4" strokeLinecap="round" />
              <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
            </svg>
          </span>
          <span className="font-display text-lg font-semibold tracking-[0.18em]">
            VORTEX
          </span>
          <span className="mt-0.5 hidden rounded-sm border border-line-soft px-1.5 py-0.5 font-mono text-[10px] tracking-widest text-mist uppercase sm:inline-block">
            Conceito
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-mist transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Magnetic>
            <a
              href="#comecar"
              className="group hidden items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black transition-transform duration-200 hover:scale-[1.03] sm:inline-flex"
            >
              Abrir conta
              <ArrowUpRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </Magnetic>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-md border border-line text-white lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Scroll progress — hairline ciano */}
      {reduce ? null : (
        <motion.div
          className="h-px origin-left bg-accent"
          style={{ scaleX: progress }}
          aria-hidden="true"
        />
      )}

      {/* Menu mobile */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-black lg:hidden"
          >
            <ul className="space-y-1 px-5 py-4">
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-3 text-base text-white/85 transition-colors hover:bg-panel hover:text-white"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-2">
                <a
                  href="#comecar"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-1.5 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-black"
                >
                  Abrir conta
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
