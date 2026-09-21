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
| `step-5` | Estado global com **Context API** (`ThemeContext` e `GameContext`)      |

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
> a manutenção e, no `step-4`, o mapeamento para o tema do TailwindCSS. No `step-5` essas variáveis
> viraram **tokens semânticos** (papéis como `accent`, `fg`, `card-face`), o que permite inverter
> o tema inteiro trocando apenas os valores.

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

## 🌗 Temas: noturno e diurno

O jogo tem dois temas, alternados pelo botão no cabeçalho (ou pelo seletor em *Configurações*):

| Papel na interface | Noturno (padrão) | Diurno (invertido) |
| ------------------ | ---------------- | ------------------ |
| Fundo da página    | verde quase preto | creme esverdeado  |
| Mesa (feltro)      | verde escuro      | verde claro        |
| Rosto das cartas   | creme com naipes escuros | grafite com naipes claros |
| Destaques (ouro)   | dourado claro     | bronze escuro      |
| Texto              | claro             | escuro             |

A troca é feita por um único atributo (`data-theme`) no `<html>`: o CSS reescreve os tokens e
**nenhum componente precisa saber qual tema está ativo**. Todos os pares texto/fundo foram
conferidos contra o **WCAG AA (4.5:1)** para garantir a legibilidade nos dois temas.

O tema escolhido fica salvo no `localStorage` e, na primeira visita, segue a preferência do
sistema operacional (`prefers-color-scheme`).

---

## 🧠 Arquitetura de estado (step-5)

```
main.tsx
└── <ThemeProvider>          tema visual (dark | light)
    └── <GameProvider>       estado da partida + configurações globais
        └── <App>            apenas composição
```

| Arquivo                        | Papel                                                        |
| ------------------------------ | ------------------------------------------------------------ |
| `contexts/ThemeContext.ts`     | Tipos e criação do contexto de tema                           |
| `contexts/ThemeProvider.tsx`   | Estado do tema, persistência e aplicação do `data-theme`      |
| `contexts/GameContext.ts`      | Tipos do estado da partida e das configurações globais        |
| `contexts/GameProvider.tsx`    | Une o hook `useBlackjack` às configurações globais            |
| `hooks/useTheme.ts`            | Consumo seguro do `ThemeContext`                              |
| `hooks/useGame.ts`             | Consumo seguro do `GameContext`                               |

Os hooks `useTheme` e `useGame` lançam um erro claro se forem usados fora dos respectivos
providers, evitando o `undefined` silencioso.

### ⚙️ Configurações globais

Disponíveis no painel **Configurações** e persistidas no `localStorage`:

- **Nome do jogador** — exibido na mesa no lugar de "Você";
- **Dealer para em** — 16, 17 ou 18 pontos; muda a regra usada na jogada *Parar*;
- **Modo treino** — mantém a carta virada do dealer visível durante a rodada;
- **Tema visual** — mesmo estado do botão do cabeçalho.

---

## 🛠️ Tecnologias

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- CSS com variáveis (`step-1` a `step-3`) → **TailwindCSS** (`step-4`)
- **Context API** para estado global (`step-5`)

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
