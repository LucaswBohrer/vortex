import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { LogosStrip } from "@/components/LogosStrip";
import { HowItWorks } from "@/components/HowItWorks";
import { Simulator } from "@/components/Simulator";
import { Dashboard } from "@/components/Dashboard";
import { Fraud } from "@/components/Fraud";
import { Metrics } from "@/components/Metrics";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { FinalCta, Footer } from "@/components/FinalCta";
import { CursorGlow } from "@/components/CursorGlow";

/** VORTEX — landing page do conceito de fintech de pagamentos em tempo real.
 *  Tudo preto, um acento ciano, motion que serve à hierarquia — e duas
 *  assinaturas próprias: o fluxo de dinheiro que acompanha o scroll e o
 *  cartão com tilt 3D. Nada aqui é captura de tela: o console,
 *  o simulador, o dashboard e o antifraude rodam de verdade. */
export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[70] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:font-bold focus:text-black"
      >
        Pular para o conteúdo
      </a>
      <CursorGlow />
      <Nav />
      <main id="conteudo" className="relative z-10">
        <Hero />
        <LogosStrip />
        <HowItWorks />
        <Simulator />
        <Dashboard />
        <Fraud />
        <Metrics />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
