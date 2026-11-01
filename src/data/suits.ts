import type { Suit } from '../types/card'

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
