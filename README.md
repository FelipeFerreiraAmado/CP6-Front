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
| `step-6` | **React Router**, página de login e formulário controlado              |
| `step-7` | Integração real com a **API Deck of Cards** (fim dos dados mockados)   |
| `step-8` | Deploy na **Vercel** e proteção da mesa por senha em variável de ambiente |

---

## 🔗 Acesse online

> 🚧 **Publicação pendente.** O projeto na Vercel ainda precisa ser criado — o passo a passo está
> em [Deploy na Vercel](#-deploy-na-vercel). Assim que estiver no ar, substitua a linha abaixo pela
> URL de produção e apague este aviso.

**🌐 `https://<nome-do-projeto>.vercel.app`**

A mesa (`/game`) é uma **área restrita**: é preciso entrar com a senha de acesso definida na
variável `VITE_GAME_PASSWORD`. A página inicial e o login são públicos.

---

## 🎯 Objetivo do projeto

Construir a interface e a lógica de um jogo de **Blackjack** jogável no navegador, praticando
os fundamentos de React: **componentização**, **comunicação entre componentes via props**,
**estilização responsiva** e **gerenciamento de estado com hooks**.

O jogador enfrenta o *dealer* (a "casa") tentando chegar o mais próximo possível de **21 pontos
sem estourar**. Do `step-2` ao `step-6` o baralho era **mockado** (gerado em código); a partir do
`step-7` as cartas vêm de verdade da **API [Deck of Cards](https://deckofcardsapi.com/)**.

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

## 🃏 Integração com a API (step-7)

As cartas vêm da API pública **[Deck of Cards](https://deckofcardsapi.com/)**. Não existe mais
baralho gerado em código: o arquivo `data/mockCards.ts` foi removido, e com ele o embaralhamento
local (Fisher-Yates) — quem embaralha agora é a API.

| Funcionalidade        | Endpoint                          | Função                 |
| --------------------- | --------------------------------- | ---------------------- |
| Buscar baralho        | `GET /api/deck/new/`              | `fetchNewDeck()`       |
| Embaralhar cartas     | `GET /api/deck/{id}/shuffle/`     | `shuffleDeck(id)`      |
| Comprar cartas        | `GET /api/deck/{id}/draw/?count=` | `drawCards(id, count)` |

Quando acontece cada chamada:

- **ao abrir a mesa:** busca o baralho, embaralha e compra 4 cartas (2 para cada lado);
- **Reiniciar:** embaralha o mesmo baralho — o que já devolve as 52 cartas a ele — e compra 4;
- **Comprar:** compra 1 carta;
- **Parar:** compra 1 carta por vez para o dealer, até o limite da casa.

Todo o acesso HTTP fica em `services/deckOfCards.ts`, a única parte do projeto que conhece o
formato da API. Ele traduz a resposta para o modelo interno (`ACE`/`SPADES` → `A`/`spades`,
com o valor numérico da carta) e normaliza as falhas em `DeckApiError`, com mensagem em português.

O que o jogo **continua calculando localmente** são as regras: pontuação com o Ás valendo 11 ou 1,
detecção de Blackjack e comparação das mãos seguem nas funções puras de `logic/blackjack.ts`.

### Estados de carregamento e erro

Como cada ação depende da rede, a interface mostra o que está acontecendo ("Embaralhando as
cartas…", "Vez do dealer…") e **bloqueia os botões enquanto a resposta não chega**, evitando compras
duplicadas por clique repetido. Se a chamada falha, aparece um aviso com o botão **Tentar de novo**.
A mesa também exibe o `deck_id` em uso e quantas cartas restam, segundo a própria API.

### Imagens das cartas

A API serve a imagem de cada carta, e é isso que a mesa mostra por padrão. Nas **Configurações** dá
para desligar essa opção e voltar às cartas desenhadas em CSS do `step-4`, que acompanham a inversão
de cores do tema.

---

## 🔒 Proteção da mesa (step-8)

A rota `/game` tem **duas camadas**:

1. **Rota protegida** (desde o `step-6`): sem sessão ativa, o `RequireAuth` redireciona para
   `/login` guardando o destino em `state.from`. Vale também para acesso direto pela URL — não
   existe caminho que renderize a mesa sem sessão.
2. **Senha de acesso** (`step-8`): o login só autentica quando a senha informada é igual à da
   variável de ambiente **`VITE_GAME_PASSWORD`**. O nome e o e-mail seguem livres; a senha é o que
   libera a mesa.

A sessão fica no **`localStorage`** (chave `cp6:user`), então o jogador continua logado depois de
recarregar a página — e **Sair** apaga a chave e volta a exigir a senha.

Se a variável não estiver definida no ambiente, o login **falha fechado**: ninguém entra e a página
avisa qual variável está faltando. Um deploy mal configurado não vira uma mesa pública.

### ⚠️ Até onde essa proteção vai

Vale ser honesto sobre o alcance: variáveis `VITE_*` são **embutidas no bundle em tempo de build**,
ou seja, a senha vai para o JavaScript entregue ao navegador e **pode ser lida por quem inspecionar
o código** — o mesmo valendo para a sessão no `localStorage`, que o próprio usuário pode editar.

Isso atende ao pedido da etapa (manter a mesa fora do acesso casual e do olhar de quem só abre o
link), mas **não é segurança de verdade**. Para isso, a senha teria de ser verificada em um
servidor, que devolveria um token assinado — algo fora do escopo de um projeto só de front-end.

---

## 🚀 Deploy na Vercel

O projeto é um SPA com `BrowserRouter`, então o `vercel.json` redireciona todas as rotas para o
`index.html` — sem isso, abrir `/game` direto daria 404 no servidor:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

A Vercel detecta o Vite automaticamente (build `npm run build`, saída `dist`).

### Passo a passo

1. **Crie o projeto** em [vercel.com/new](https://vercel.com/new) importando o repositório
   `CP6-Front`. A Vercel detecta o Vite sozinha.

2. **Defina a variável de ambiente** antes do build, nas *Environment Variables* do projeto:

   | Nome                 | Valor                     | Ambientes                         |
   | -------------------- | ------------------------- | --------------------------------- |
   | `VITE_GAME_PASSWORD` | a senha de acesso à mesa  | Production, Preview e Development |

   > A variável é lida **durante o build**. Alterá-la depois exige **refazer o deploy** para o novo
   > valor valer.

3. **Desligue a Vercel Authentication** em *Deployment Protection*. Projetos novos herdam a proteção
   padrão da equipe, que exige login na Vercel para abrir qualquer deploy — com ela ligada, o link
   do README não abre para quem não é da equipe. A mesa continua protegida pela senha do passo 2.

4. **Garanta que a produção aponta para o código final.** Por padrão a produção acompanha a `main`,
   que nesta cadeia de PRs só tem o `step-1` — publicar assim colocaria o "Hello World" no ar. Duas
   saídas:
   - **mergear a cadeia de PRs até a `main`** (o caminho mais simples de manter); ou
   - promover um deploy da branch da última etapa a produção, pela lista de *Deployments*.

5. **Publique** e cole a URL na seção [Acesse online](#-acesse-online) deste README.

### Rodando localmente

```bash
cp .env.example .env     # e defina a sua senha no .env
npm install
npm run dev
```

O `.env` **não é versionado** (está no `.gitignore`); o `.env.example` serve de modelo.
Para gerar uma senha aleatória:

```bash
node -e "console.log(require('crypto').randomBytes(18).toString('base64url'))"
```

---

## 🗺️ Rotas (step-6)

| Rota     | Página                | Acesso                                        |
| -------- | --------------------- | --------------------------------------------- |
| `/`      | Início                | Público — apresenta o jogo e as regras        |
| `/login` | Login                 | Público — redireciona para a mesa se já logado |
| `/game`  | Mesa de jogo          | **Protegido** — exige sessão + senha de acesso |
| `*`      | 404                   | Qualquer endereço inexistente                 |

A navegação usa o **React Router** (`BrowserRouter`). Todas as páginas ficam dentro de um
`Layout` com o cabeçalho e o rodapé, então trocar de rota não remonta o cabeçalho.

`/game` passa pelo componente `RequireAuth`: sem sessão, o jogador vai para `/login` e a rota
pretendida é guardada em `state.from` — depois de entrar, ele é levado **ao destino original**,
não a uma página fixa.

---

## 🔐 Login e formulário

A autenticação é **simulada** (o projeto não tem back-end): o `AuthProvider` revalida as
credenciais, confere a senha contra `VITE_GAME_PASSWORD`, espera um instante para imitar a latência
de uma API e guarda o jogador no contexto e no `localStorage`, para a sessão sobreviver a um
recarregamento. Ver [Proteção da mesa](#-proteção-da-mesa-step-8).

O formulário é **controlado pelo React**:

- cada campo vive no estado (`useState`), sem acesso direto ao DOM;
- a validação roda na saída do campo (`onBlur`) e novamente no envio;
- as regras ficam em `logic/validation.ts`, fora do componente, e são reaproveitadas pelo provider;
- o botão fica bloqueado e vira "Entrando…" enquanto o envio está em andamento;
- os erros são acessíveis: `aria-invalid` no campo, `aria-describedby` apontando para a mensagem
  e `role="alert"` no erro geral.

| Campo           | Regra                                                     |
| --------------- | --------------------------------------------------------- |
| Nome na mesa    | 3 a 18 caracteres                                         |
| E-mail          | formato `algo@algo.dominio`                               |
| Senha de acesso | mínimo de 6 caracteres **e** igual a `VITE_GAME_PASSWORD` |

O nome informado no login passa a ser o nome exibido na mesa (grava em `settings.playerName`).

---

## 🧠 Arquitetura de estado (step-5)

```
main.tsx
└── <BrowserRouter>              rotas (step-6)
    └── <ThemeProvider>          tema visual (dark | light)
        └── <AuthProvider>       sessão do jogador (step-6)
            └── <GameProvider>   estado da partida + configurações globais
                └── <App>        mapa de rotas
```

| Arquivo                        | Papel                                                        |
| ------------------------------ | ------------------------------------------------------------ |
| `contexts/ThemeContext.ts`     | Tipos e criação do contexto de tema                           |
| `contexts/ThemeProvider.tsx`   | Estado do tema, persistência e aplicação do `data-theme`      |
| `contexts/GameContext.ts`      | Tipos do estado da partida e das configurações globais        |
| `contexts/GameProvider.tsx`    | Une o hook `useBlackjack` às configurações globais            |
| `hooks/useTheme.ts`            | Consumo seguro do `ThemeContext`                              |
| `hooks/useGame.ts`             | Consumo seguro do `GameContext`                               |
| `contexts/AuthContext.ts`      | Tipos da sessão e das credenciais de login                    |
| `contexts/AuthProvider.tsx`    | Login/logout simulados e persistência da sessão               |
| `hooks/useAuth.ts`             | Consumo seguro do `AuthContext`                               |

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
- [React Router 7](https://reactrouter.com/) para as rotas (`step-6`)
- [Deck of Cards API](https://deckofcardsapi.com/) como fonte das cartas (`step-7`)
- [Vercel](https://vercel.com/) para a publicação (`step-8`)

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
