import type { Card as CardType } from '../../types/card'
import { SUIT_NAME, SUIT_SYMBOL } from '../../data/mockCards'

interface CardProps {
  /** Carta a ser exibida. */
  card: CardType
  /** Quando verdadeiro, mostra o verso da carta (carta virada para baixo). */
  faceDown?: boolean
}

const RED_SUITS = ['hearts', 'diamonds']

const baseCard =
  'relative w-[clamp(66px,15vw,96px)] aspect-[5/7] rounded-lg font-card select-none shrink-0 animate-deal'

function Card({ card, faceDown = false }: CardProps) {
  if (faceDown) {
    return (
      <div
        role="img"
        aria-label="Carta virada para baixo"
        className={`${baseCard} card-back-pattern border-[3px] border-card-face shadow-[0_8px_18px_rgb(0_0_0/0.4),inset_0_0_0_2px_var(--color-gold)] after:content-[''] after:absolute after:inset-2 after:rounded after:border-2 after:border-gold-light after:opacity-80`}
      />
    )
  }

  const isRed = RED_SUITS.includes(card.suit)
  const symbol = SUIT_SYMBOL[card.suit]

  return (
    <div
      role="img"
      aria-label={`${card.rank} de ${SUIT_NAME[card.suit]}`}
      className={`${baseCard} bg-card-face shadow-card ${isRed ? 'text-casino-red' : 'text-ink'}`}
    >
      <span className="absolute top-1.5 left-[7px] flex flex-col items-center leading-none font-bold">
        <span className="text-[clamp(0.85rem,2.4vw,1.15rem)]">{card.rank}</span>
        <span className="text-[clamp(0.7rem,2vw,0.95rem)]">{symbol}</span>
      </span>
      <span className="absolute inset-0 grid place-items-center text-[clamp(1.8rem,6vw,2.8rem)]" aria-hidden="true">
        {symbol}
      </span>
      <span className="absolute bottom-1.5 right-[7px] flex flex-col items-center leading-none font-bold rotate-180">
        <span className="text-[clamp(0.85rem,2.4vw,1.15rem)]">{card.rank}</span>
        <span className="text-[clamp(0.7rem,2vw,0.95rem)]">{symbol}</span>
      </span>
    </div>
  )
}

export default Card
