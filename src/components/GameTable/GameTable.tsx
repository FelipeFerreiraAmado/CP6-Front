import type { Card as CardType } from '../../types/card'
import Card from '../Card/Card'

interface GameTableProps {
  dealerHand: CardType[]
  playerHand: CardType[]
  dealerScore: number
  playerScore: number
  /** Esconde a segunda carta do dealer (carta na manga) e oculta sua pontuação. */
  hideHole?: boolean
  /** Mensagem em destaque no centro da mesa. */
  banner?: string
}

const handRow = 'flex flex-wrap items-center justify-center gap-3 min-h-[clamp(92px,21vw,134px)]'
const label = 'inline-flex items-center gap-3 font-display uppercase tracking-[0.18em] text-gold-light text-[clamp(0.8rem,2.2vw,1rem)]'
const scorePill = 'grid place-items-center min-w-[2.2em] px-[0.5em] py-[0.15em] border border-gold rounded-full bg-black/40 text-cream text-[1.1em]'

function GameTable({
  dealerHand,
  playerHand,
  dealerScore,
  playerScore,
  hideHole = false,
  banner,
}: GameTableProps) {
  return (
    <section className="relative flex flex-col gap-6 p-[clamp(1.5rem,4vw,2.5rem)] border-[3px] border-gold [border-radius:180px/60px] felt-surface overflow-hidden shadow-[0_10px_30px_rgb(0_0_0/0.35),inset_0_0_90px_rgb(0_0_0/0.5)] before:content-[''] before:absolute before:inset-[10px] before:[border-radius:inherit] before:border before:border-gold-light/45 before:pointer-events-none">
      <div className="relative z-[1] flex flex-col items-center gap-3">
        <div className={label}>
          <span>Dealer</span>
          <span className={scorePill}>{hideHole ? '?' : dealerScore}</span>
        </div>
        <div className={handRow}>
          {dealerHand.map((card, index) => (
            <Card
              key={card.id}
              card={card}
              faceDown={hideHole && index === dealerHand.length - 1}
            />
          ))}
        </div>
      </div>

      <div className="relative z-[1] text-center">
        <span className="block font-display uppercase tracking-[0.3em] text-gold-light/70 text-[clamp(0.6rem,1.8vw,0.8rem)]">
          BLACKJACK PAGA 3:2 · DEALER PARA NO 17
        </span>
        {banner && (
          <p className="mt-3 font-display text-cream text-[clamp(1.1rem,3.4vw,1.6rem)] [text-shadow:0_2px_8px_rgb(0_0_0/0.6)]">
            {banner}
          </p>
        )}
      </div>

      <div className="relative z-[1] flex flex-col items-center gap-3">
        <div className={handRow}>
          {playerHand.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
        <div className={label}>
          <span>Você</span>
          <span className={scorePill}>{playerScore}</span>
        </div>
      </div>
    </section>
  )
}

export default GameTable
