import type { Card as CardType } from '../../types/card'
import { SUIT_NAME, SUIT_SYMBOL } from '../../data/mockCards'
import './Card.css'

interface CardProps {
  /** Carta a ser exibida. */
  card: CardType
  /** Quando verdadeiro, mostra o verso da carta (carta virada para baixo). */
  faceDown?: boolean
}

const RED_SUITS = ['hearts', 'diamonds']

function Card({ card, faceDown = false }: CardProps) {
  if (faceDown) {
    return <div className="card card--back" role="img" aria-label="Carta virada para baixo" />
  }

  const isRed = RED_SUITS.includes(card.suit)
  const symbol = SUIT_SYMBOL[card.suit]

  return (
    <div
      className={`card ${isRed ? 'card--red' : 'card--black'}`}
      role="img"
      aria-label={`${card.rank} de ${SUIT_NAME[card.suit]}`}
    >
      <span className="card__corner card__corner--top">
        <span className="card__rank">{card.rank}</span>
        <span className="card__suit">{symbol}</span>
      </span>
      <span className="card__pip" aria-hidden="true">
        {symbol}
      </span>
      <span className="card__corner card__corner--bottom">
        <span className="card__rank">{card.rank}</span>
        <span className="card__suit">{symbol}</span>
      </span>
    </div>
  )
}

export default Card
