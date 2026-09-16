export type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs'

export type Rank =
  | 'A'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'J'
  | 'Q'
  | 'K'

export interface Card {
  /** Identificador único da carta, ex.: "A-spades" */
  id: string
  rank: Rank
  suit: Suit
  /** Valor base da carta (Ás = 11; ajustado para 1 pela lógica quando necessário) */
  value: number
}
