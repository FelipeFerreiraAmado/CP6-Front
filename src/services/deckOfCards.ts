import type { Card, Rank, Suit } from '../types/card'

/**
 * Cliente da API pública Deck of Cards (https://deckofcardsapi.com/).
 *
 * É a única parte do projeto que conhece o formato da API: tudo o que sai daqui
 * já está traduzido para o modelo interno (`Card`), então a lógica do jogo e os
 * componentes seguem iguais, sem saber de onde as cartas vêm.
 */

const BASE_URL = 'https://deckofcardsapi.com/api/deck'

/** Imagem do verso da carta, servida pela API. */
export const CARD_BACK_IMAGE = 'https://deckofcardsapi.com/static/img/back.png'

/* -------------------------------------------------------------------------- */
/* Formato das respostas da API                                               */
/* -------------------------------------------------------------------------- */

interface ApiDeckResponse {
  success: boolean
  deck_id: string
  remaining: number
  shuffled: boolean
  error?: string
}

interface ApiCard {
  code: string
  image: string
  images: { svg: string; png: string }
  value: string
  suit: string
}

interface ApiDrawResponse {
  success: boolean
  deck_id: string
  remaining: number
  cards: ApiCard[]
  error?: string
}

/* -------------------------------------------------------------------------- */
/* Modelo devolvido para a aplicação                                          */
/* -------------------------------------------------------------------------- */

export interface Deck {
  id: string
  /** Quantas cartas ainda restam no baralho, segundo a API. */
  remaining: number
}

export interface DrawResult {
  cards: Card[]
  remaining: number
}

/** Erro de comunicação com a API, com uma mensagem pronta para a interface. */
export class DeckApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DeckApiError'
  }
}

/* -------------------------------------------------------------------------- */
/* Tradução API -> modelo interno                                             */
/* -------------------------------------------------------------------------- */

const SUIT_BY_API_NAME: Record<string, Suit> = {
  SPADES: 'spades',
  HEARTS: 'hearts',
  DIAMONDS: 'diamonds',
  CLUBS: 'clubs',
}

/** A API usa nomes ("ACE", "KING"); o jogo usa o símbolo impresso na carta. */
const RANK_BY_API_VALUE: Record<string, Rank> = {
  ACE: 'A',
  KING: 'K',
  QUEEN: 'Q',
  JACK: 'J',
  '10': '10',
  '9': '9',
  '8': '8',
  '7': '7',
  '6': '6',
  '5': '5',
  '4': '4',
  '3': '3',
  '2': '2',
}

/** Valor base: Ás começa valendo 11 e as figuras valem 10. */
function baseValue(rank: Rank): number {
  if (rank === 'A') return 11
  if (rank === 'K' || rank === 'Q' || rank === 'J') return 10
  return Number(rank)
}

/** Contador de compras, para os `id` não repetirem quando o baralho é reembaralhado. */
let drawCounter = 0

function toCard(apiCard: ApiCard): Card {
  const rank = RANK_BY_API_VALUE[apiCard.value]
  const suit = SUIT_BY_API_NAME[apiCard.suit]

  if (!rank || !suit) {
    throw new DeckApiError(`A API devolveu uma carta desconhecida: ${apiCard.code}.`)
  }

  drawCounter += 1

  return {
    id: `${apiCard.code}-${drawCounter}`,
    code: apiCard.code,
    rank,
    suit,
    value: baseValue(rank),
    // Usamos o PNG, e não o SVG: os SVGs da API são documentos do Inkscape em
    // tamanho A4 (744x1052pt) e **sem `viewBox`**, com a carta desenhada num
    // canto da página — reduzidos ao tamanho da mesa, a carta vira um desenho
    // minúsculo cercado de branco. Os PNGs já vêm recortados (226x314).
    image: apiCard.images.png,
  }
}

/* -------------------------------------------------------------------------- */
/* Chamadas                                                                   */
/* -------------------------------------------------------------------------- */

/** Mensagem do baralho esgotado, usada nos dois pontos que detectam o caso. */
const OUT_OF_CARDS = 'O baralho ficou sem cartas suficientes. Reinicie a rodada para embaralhar.'

/**
 * Traduz a falha relatada pela API.
 *
 * A API responde em inglês (`"Not enough cards remaining to draw 3 additional"`),
 * então a mensagem crua não serve para a interface: mapeamos o que sabemos
 * reconhecer e caímos em um texto genérico no resto dos casos.
 */
function translateApiError(apiMessage?: string): string {
  if (apiMessage && /not enough cards/i.test(apiMessage)) return OUT_OF_CARDS
  return 'A API das cartas não conseguiu completar a operação.'
}

/**
 * Executa a chamada e normaliza as falhas em `DeckApiError`.
 *
 * A API responde 200 mesmo quando a operação não dá certo (por exemplo, ao pedir
 * mais cartas do que restam), sinalizando o problema no campo `success` — por isso
 * conferimos as duas coisas.
 */
async function request<T extends { success: boolean; error?: string }>(
  path: string,
  signal?: AbortSignal,
): Promise<T> {
  let response: Response

  try {
    response = await fetch(`${BASE_URL}${path}`, { signal })
  } catch (error) {
    // `AbortError` é cancelamento nosso, não falha da API: repassa como está.
    if (error instanceof DOMException && error.name === 'AbortError') throw error
    throw new DeckApiError('Não foi possível falar com a API das cartas. Verifique a conexão.')
  }

  if (!response.ok) {
    throw new DeckApiError(`A API das cartas respondeu com erro ${response.status}.`)
  }

  const data = (await response.json()) as T

  if (!data.success) {
    throw new DeckApiError(translateApiError(data.error))
  }

  return data
}

/** **Buscar baralho** — cria um baralho novo de 52 cartas e devolve o seu `deck_id`. */
export async function fetchNewDeck(signal?: AbortSignal): Promise<Deck> {
  const data = await request<ApiDeckResponse>('/new/', signal)
  return { id: data.deck_id, remaining: data.remaining }
}

/** **Embaralhar cartas** — devolve todas as cartas ao baralho e embaralha. */
export async function shuffleDeck(deckId: string, signal?: AbortSignal): Promise<Deck> {
  const data = await request<ApiDeckResponse>(`/${deckId}/shuffle/`, signal)
  return { id: data.deck_id, remaining: data.remaining }
}

/** **Comprar cartas** — retira `count` cartas do baralho. */
export async function drawCards(
  deckId: string,
  count: number,
  signal?: AbortSignal,
): Promise<DrawResult> {
  const data = await request<ApiDrawResponse>(`/${deckId}/draw/?count=${count}`, signal)

  // Guarda defensiva: se a API devolver menos cartas do que pedimos sem sinalizar erro.
  if (data.cards.length < count) {
    throw new DeckApiError(OUT_OF_CARDS)
  }

  return { cards: data.cards.map(toCard), remaining: data.remaining }
}
