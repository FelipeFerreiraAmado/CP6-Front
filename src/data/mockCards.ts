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

/**
 * Gera o baralho completo de 52 cartas (a fonte de dados "mockada" do jogo).
 * A lógica do jogo embaralha este baralho e distribui as cartas a partir dele.
 */
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
