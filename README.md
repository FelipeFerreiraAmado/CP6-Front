# 🃏 CP6 — Blackjack | Cassino Clássico

Jogo de **Blackjack (21)** desenvolvido em **React + Vite + TypeScript** como Checkpoint 6 (CP6)
da disciplina **Front-End Design Engineering** da FIAP.

O projeto é construído de forma incremental, uma etapa por *branch* / *pull request*:

| Branch   | Entrega                                                                 |
| -------- | ---------------------------------------------------------------------- |
| `step-1` | Criação e limpeza do projeto Vite + React, "Hello World" e este README |
| `step-2` | Componentes, mock de cartas, comunicação por *props* e layout com CSS  |
| `step-3` | Lógica do jogo com *hooks* (`useState`, `useEffect`, `useCallback`)    |
| `step-4` | Migração do CSS customizado para **TailwindCSS**                        |

---

## 🎯 Objetivo do projeto

Construir a interface e a lógica de um jogo de **Blackjack** jogável no navegador, praticando
os fundamentos de React: **componentização**, **comunicação entre componentes via props**,
**estilização responsiva** e **gerenciamento de estado com hooks**.

O jogador enfrenta o *dealer* (a "casa") tentando chegar o mais próximo possível de **21 pontos
sem estourar**. Toda a base do jogo funciona a partir de **dados mockados** (um baralho gerado em
código), sem depender de nenhuma API externa.

---

## 🎨 Tema visual do jogo — *Cassino Clássico (Las Vegas)*

Tema atribuído na tabela do exercício: **Cassino Clássico / Las Vegas**.

A identidade visual remete a uma **mesa de cassino tradicional**: o **verde feltro** da mesa de
carteado, detalhes em **dourado** (fichas, molduras e destaques), o **vermelho** e o **preto**
dos naipes das cartas, sobre um fundo escuro e elegante que valoriza o brilho dourado.

### Paleta de cores

| Cor                 | Hex       | Uso                                              |
| ------------------- | --------- | ------------------------------------------------ |
| 🟩 Verde feltro     | `#0a5c3f` | Fundo da mesa de jogo                            |
| 🟢 Verde escuro     | `#073d2a` | Fundo geral / gradiente da página                |
| 🟡 Dourado          | `#d4af37` | Bordas, títulos, molduras e destaques            |
| ✨ Dourado claro    | `#f5d061` | *Hover*, brilhos e realces                        |
| 🔴 Vermelho cassino | `#c1121f` | Naipes ♥ ♦, botão principal e alertas de derrota |
| ⬛ Preto carta      | `#111111` | Naipes ♠ ♣ e textos sobre superfícies claras     |
| ⬜ Creme carta      | `#fbfbf7` | Fundo das cartas                                 |
| 🟨 Texto claro      | `#f5f5f5` | Texto sobre a mesa escura                         |

> As cores ficam centralizadas em **variáveis CSS** (`:root`) a partir do `step-2`, o que facilita
> a manutenção e, no `step-4`, o mapeamento para o tema do TailwindCSS.

---

## ♠ Regras do Blackjack

O objetivo é somar pontos **o mais próximo possível de 21, sem ultrapassar**.

**Valor das cartas**

- Cartas de **2 a 10** valem o próprio número.
- **Valete (J), Dama (Q) e Rei (K)** valem **10**.
- **Ás (A)** vale **11** ou **1** — o que for mais vantajoso para a mão (evitando estourar).

**Como se joga**

1. O jogador e o *dealer* recebem duas cartas. Uma carta do *dealer* fica **virada para baixo**.
2. O jogador pode **Comprar** (*Hit*) quantas cartas quiser para aumentar sua pontuação.
3. Se passar de 21, o jogador **estoura** (*bust*) e perde a rodada.
4. Ao **Parar** (*Stand*), o *dealer* revela a carta e compra cartas **até atingir no mínimo 17**.
5. **Ganha quem estiver mais próximo de 21 sem estourar.** Se o *dealer* estourar, o jogador vence.

**Situações especiais**

- **Blackjack:** 21 pontos com as **duas primeiras cartas** (um Ás + uma carta de valor 10).
- **Empate (*push*):** jogador e *dealer* terminam com a mesma pontuação.

---

## 🛠️ Tecnologias

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- CSS com variáveis (`step-1` a `step-3`) → **TailwindCSS** (`step-4`)

## ▶️ Como executar

```bash
# instalar as dependências
npm install

# rodar em modo de desenvolvimento
npm run dev

# gerar o build de produção
npm run build
```

Depois de `npm run dev`, abra o endereço exibido no terminal (por padrão `http://localhost:5173`).

---

## 👤 Autor

| Nome                     | RM       |
| ------------------------ | -------- |
| **Felipe Ferreira Amado** | 572567   |

- **Disciplina:** Front-End Design Engineering — FIAP
- **Professor:** Vinícius Marcili (*vinimarcili*)
- **Checkpoint:** CP6
