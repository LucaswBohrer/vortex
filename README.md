# VORTEX

### O dinheiro não espera. Nem você.

**VORTEX** é um conceito de fintech fictícia — infraestrutura de pagamentos
em tempo real — criado como projeto de portfólio, no mesmo nível da NOIR e
um passo além em motion e UI/UX: landing page em Next.js com foco em
**design de produto, motion design e interações que funcionam de verdade**.

> **“Pagamentos em tempo real, sem atrito.”**

A proposta: Pix, cartão, boleto e assinaturas em um só fluxo, com liquidação
em tempo real e antifraude embutido em cada transação. O dinheiro se move —
e você vê ele se mover.

> **A VORTEX é um conceito de produto, não um produto real.** Não há clientes,
> métricas de empresas reais, depoimentos ou backend. Os números da página
> são ilustrativos do conceito e estão marcados como tal. O formulário final
> compõe um e-mail real no aplicativo do visitante (mailto) — nada é enviado
> a um servidor.

---

## ✨ O que a página tem

- **Hero** com revelação de linhas e caracteres, um **console de pagamentos
  ao vivo** (fluxo real gerado no navegador, com pausa e filtro por método)
  e um **cartão com tilt 3D e brilho** que segue o ponteiro — não é captura
  de tela.
- **Como funciona** (01 Receba → 02 Processe → 03 Antecipe → 04 Liquide):
  passo ativo que acompanha o scroll, visual ao vivo por etapa e uma **faixa
  de fluxo** cujos pontos de dinheiro viajam conforme você rola a página.
- **Simulador de taxas**: volume, ticket médio e mix Pix/cartão/boleto com
  matemática real — compara o custo VORTEX com uma tarifa genérica e mostra
  a economia mensal e anual, com as premissas declaradas na tela.
- **Dashboard**: abas por método (Visão geral / Pix / Cartão / Assinaturas)
  e período 7d/30d que mudam números e gráfico de barras de verdade.
- **Antifraude interativo**: ligue e desligue as regras e veja, ao vivo,
  quais transações de demonstração seriam aprovadas ou bloqueadas — com o motivo.
- **Números**: contadores animados ao entrar na tela, marcados como
  ilustrativos do conceito.
- **Planos**: toggle mensal/anual que muda os preços de verdade (Start /
  Pro / Scale).
- **FAQ**: acordeão acessível por teclado (`aria-expanded`, regiões).
- **Formulário final**: sem backend — o envio compõe um `mailto:` real.
- **Motion system**: um easing compartilhado, botões magnéticos, scroll
  progress, cursor glow sutil, reveals de linha e de caractere, números
  animados com spring e `prefers-reduced-motion` respeitado em tudo.

## 🎨 Design

Tudo preto (`#000000` base, `#0A0A0A` / `#111111` superfícies, `#1A1A1A`
bordas), tipo branco, cinza `#8A8A8A` secundário e **um único acento**:
ciano elétrico `#00E5FF`. Space Grotesk (display) + Inter (corpo) +
JetBrains Mono (rótulos e dados). Sem gradientes decorativos, sem arco-íris.

## 🚀 Rodar localmente

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run start    # serve o build
npm run lint
```

## 🛠️ Stack

Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 +
Motion + Lucide. Sem backend, sem variáveis de ambiente.

## 📄 Licença

Projeto de portfólio / demonstração. Uso livre para estudo.
