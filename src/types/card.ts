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
  /**
   * Identificador único desta carta dentro da partida.
   *
   * O código da API (`KH`, `2D`…) se repete quando o baralho é embaralhado e
   * comprado de novo, então juntamos um contador de compras para a chave do
   * React continuar única ao longo da sessão.
   */
  id: string
  /** Código da carta na API, ex.: "KH" para o Rei de copas. */
  code: string
  rank: Rank
  suit: Suit
  /** Valor base da carta (Ás = 11; ajustado para 1 pela lógica quando necessário) */
  value: number
  /** Imagem oficial da carta, servida pela própria API. */
  image: string
}
