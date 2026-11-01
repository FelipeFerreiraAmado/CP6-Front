import type { Card as CardType } from '../../types/card'
import { SUIT_NAME, SUIT_SYMBOL } from '../../data/suits'
import { CARD_BACK_IMAGE } from '../../services/deckOfCards'
import { useGame } from '../../hooks/useGame'

interface CardProps {
  /** Carta a ser exibida. */
  card: CardType
  /** Quando verdadeiro, mostra o verso da carta (carta virada para baixo). */
  faceDown?: boolean
}

const RED_SUITS = ['hearts', 'diamonds']

const baseCard =
  'relative w-[clamp(66px,15vw,96px)] aspect-[5/7] rounded-lg font-card select-none shrink-0 animate-deal'

/**
 * Componente puramente apresentacional: continua recebendo a carta por props.
 *
 * Tem dois modos, escolhidos pela configuração global `useApiImages`:
 * a **imagem oficial servida pela API** ou a **carta desenhada em CSS**, que
 * acompanha a inversão de cores do tema (step-5).
 */
function Card({ card, faceDown = false }: CardProps) {
  const { settings } = useGame()

  const label = faceDown ? 'Carta virada para baixo' : `${card.rank} de ${SUIT_NAME[card.suit]}`

  if (settings.useApiImages) {
    return (
      <img
        src={faceDown ? CARD_BACK_IMAGE : card.image}
        alt={label}
        draggable={false}
        className={`${baseCard} bg-card-paper border border-accent/40 shadow-card object-cover`}
      />
    )
  }

  if (faceDown) {
    return (
      <div
        role="img"
        aria-label={label}
        className={`${baseCard} card-back-pattern border-[3px] border-card-face shadow-[var(--shadow-card),inset_0_0_0_2px_var(--color-accent)] after:content-[''] after:absolute after:inset-2 after:rounded after:border-2 after:border-accent-strong after:opacity-80`}
      />
    )
  }

  const isRed = RED_SUITS.includes(card.suit)
  const symbol = SUIT_SYMBOL[card.suit]

  return (
    <div
      role="img"
      aria-label={label}
      className={`${baseCard} bg-card-face shadow-card ${isRed ? 'text-suit-red' : 'text-card-ink'}`}
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
