import type { Card, Rank, Suit } from '../types/card'

/** Os quatro naipes do baralho. */
export const SUITS: Suit[] = ['spades', 'hearts', 'diamonds', 'clubs']

/** Os treze valores, do Ás ao Rei. */
export const RANKS: Rank[] = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
]

/** Símbolo de cada naipe, usado na exibição das cartas. */
export const SUIT_SYMBOL: Record<Suit, string> = {
  spades: '♠',
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
}

/** Nome de cada naipe em português (acessibilidade). */
export const SUIT_NAME: Record<Suit, string> = {
  spades: 'espadas',
  hearts: 'copas',
  diamonds: 'ouros',
  clubs: 'paus',
}

/** Valor base de uma carta pelo seu rank (Ás = 11; figuras = 10). */
export function cardValue(rank: Rank): number {
  if (rank === 'A') return 11
  if (rank === 'K' || rank === 'Q' || rank === 'J') return 10
  return Number(rank)
}

/** Gera um baralho completo e ordenado de 52 cartas (mock de dados). */
export function createDeck(): Card[] {
  return SUITS.flatMap((suit) =>
    RANKS.map((rank) => ({
      id: `${rank}-${suit}`,
      rank,
      suit,
      value: cardValue(rank),
    })),
  )
}

/** Soma simples dos valores base de uma mão (usada para exibição). */
export function sumValues(cards: Card[]): number {
  return cards.reduce((total, card) => total + card.value, 0)
}

/**
 * Mãos mockadas apenas para montar o layout visual no step-2 (ainda sem lógica).
 * A partir do step-3 as mãos passam a ser geradas a partir de `createDeck()`.
 */
export const mockDealerHand: Card[] = [
  { id: 'K-spades', rank: 'K', suit: 'spades', value: 10 },
  { id: '9-hearts', rank: '9', suit: 'hearts', value: 9 },
]

export const mockPlayerHand: Card[] = [
  { id: '10-clubs', rank: '10', suit: 'clubs', value: 10 },
  { id: '8-hearts', rank: '8', suit: 'hearts', value: 8 },
]
