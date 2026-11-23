"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Mail } from "lucide-react";
import { Magnetic, Reveal, SectionHeading } from "@/components/motion-primitives";

/** CTA final + rodapé — sem backend: o envio compõe um e-mail real. */
export function FinalCta() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`VORTEX — quero abrir minha conta${company ? ` (${company})` : ""}`);
    const body = encodeURIComponent(
      `Olá, equipe VORTEX.\n\nNome: ${name}\nE-mail: ${email}${company ? `\nEmpresa: ${company}` : ""}\n\nQuero abrir minha conta e começar a receber com a VORTEX.`,
    );
    window.location.href = `mailto:contato@vortex.demo?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section id="comecar" className="relative overflow-hidden border-t border-line py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute bottom-[-240px] left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              index="08"
              label="Começar"
              title={
                <>
                  Seu próximo
                  <br />
                  pagamento já pode
                  <br />
                  <span className="text-accent">cair em segundos.</span>
                </>
              }
              intro="Abra a conta em minutos, sem taxa de adesão. Teste o simulador, ligue as regras do antifraude e receba o primeiro Pix hoje."
            />
            <Reveal delay={0.15}>
              <ul className="mt-8 space-y-2.5">
                {["Conta grátis, sem mensalidade no Start", "Primeiro Pix sem tarifa de saque", "Cancele quando quiser — o dinheiro é seu"].map((t) => (
                  <li key={t} className="flex items-center gap-2.5 text-sm text-white/85">
                    <Check className="size-4 shrink-0 text-accent" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            {sent ? (
              <div className="rounded-2xl border border-accent/50 bg-panel p-8 text-center" role="status">
                <span className="mx-auto grid size-12 place-items-center rounded-full bg-accent-soft text-accent">
                  <Mail className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-white">Seu e-mail foi aberto</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  O aplicativo de e-mail abriu com a mensagem pronta — é só enviar. Assim que a VORTEX existir
                  de verdade, alguém responde.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 rounded-full border border-line-soft px-5 py-2.5 text-sm text-white transition-colors hover:border-accent hover:text-accent"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="rounded-2xl border border-line bg-coal/80 p-6 backdrop-blur sm:p-8"
                aria-label="Abrir conta VORTEX"
              >
                <div className="space-y-5">
                  <div>
                    <label htmlFor="cta-name" className="mb-2 block text-sm font-medium text-white/85">
                      Seu nome
                    </label>
                    <input
                      id="cta-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ana Souza"
                      autoComplete="name"
                      className="w-full rounded-lg border border-line bg-black px-4 py-3 text-sm text-white placeholder:text-fog focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="cta-email" className="mb-2 block text-sm font-medium text-white/85">
                      E-mail de trabalho
                    </label>
                    <input
                      id="cta-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ana@empresa.com.br"
                      autoComplete="email"
                      className="w-full rounded-lg border border-line bg-black px-4 py-3 text-sm text-white placeholder:text-fog focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="cta-company" className="mb-2 block text-sm font-medium text-white/85">
                      Empresa <span className="text-fog">(opcional)</span>
                    </label>
                    <input
                      id="cta-company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Empresa LTDA"
                      autoComplete="organization"
                      className="w-full rounded-lg border border-line bg-black px-4 py-3 text-sm text-white placeholder:text-fog focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>
                <Magnetic className="mt-7 block">
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-black transition-transform duration-200 hover:scale-[1.02]"
                  >
                    Abrir minha conta
                    <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </button>
                </Magnetic>
                <p className="mt-4 text-center font-mono text-[11px] leading-relaxed text-fog">
                  Sem backend: o envio abre o seu aplicativo de e-mail com a mensagem pronta.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold tracking-[0.18em]">VORTEX</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-mist">
            Infraestrutura de pagamentos em tempo real. Pix, cartão, boleto e assinaturas em um só fluxo.
          </p>
        </div>
        <nav aria-label="Links do rodapé" className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-mist">
          <a href="#como-funciona" className="transition-colors hover:text-white">Como funciona</a>
          <a href="#simulador" className="transition-colors hover:text-white">Simulador</a>
          <a href="#dashboard" className="transition-colors hover:text-white">Dashboard</a>
          <a href="#planos" className="transition-colors hover:text-white">Planos</a>
          <a href="#faq" className="transition-colors hover:text-white">FAQ</a>
        </nav>
      </div>
      <div className="mx-auto mt-8 max-w-7xl border-t border-line px-5 pt-6 sm:px-8">
        <p className="font-mono text-[11px] leading-relaxed text-fog">
          VORTEX é um produto fictício — um conceito de design e interação, sem clientes, sem métricas reais
          de empresas e sem backend. © 2026 VORTEX — conceito.
        </p>
      </div>
    </footer>
  );
}
