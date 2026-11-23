import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VORTEX — Pagamentos em tempo real, sem atrito",
  description:
    "VORTEX é um conceito de infraestrutura de pagamentos: Pix, cartão, boleto e assinaturas em um só fluxo, com liquidação em tempo real e antifraude embutido. O dinheiro não espera. Nem você.",
  keywords: [
    "pagamentos",
    "fintech",
    "pix",
    "cartão",
    "assinaturas",
    "liquidação",
    "antifraude",
    "SaaS",
    "vortex",
  ],
  authors: [{ name: "VORTEX — conceito de produto" }],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "VORTEX — O dinheiro não espera. Nem você.",
    description:
      "Pix, cartão, boleto e assinaturas em um só fluxo. Liquidação em tempo real, antifraude embutido e taxas que você simula antes de pagar.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VORTEX — O dinheiro não espera. Nem você.",
    description:
      "Pix, cartão, boleto e assinaturas em um só fluxo. Liquidação em tempo real, antifraude embutido e taxas que você simula antes de pagar.",
  },
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink font-body text-white">{children}</body>
    </html>
  );
}
