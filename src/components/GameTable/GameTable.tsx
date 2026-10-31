import Card from '../Card/Card'
import { useGame } from '../../hooks/useGame'
import { RESULT_MESSAGES } from '../../logic/blackjack'

const handRow = 'flex flex-wrap items-center justify-center gap-3 min-h-[clamp(92px,21vw,134px)]'
const label = 'inline-flex items-center gap-3 font-display uppercase tracking-[0.18em] text-accent-strong text-[clamp(0.8rem,2.2vw,1rem)]'
const scorePill = 'grid place-items-center min-w-[2.2em] px-[0.5em] py-[0.15em] border border-accent rounded-full bg-panel-strong text-fg text-[1.1em]'

/**
 * Mesa de jogo. Consome o estado global da partida e as configurações globais
 * (nome do jogador, regra do dealer e modo treino) diretamente do GameContext.
 */
function GameTable() {
  const {
    dealerHand,
    playerHand,
    dealerScore,
    playerScore,
    isRoundOver,
    result,
    settings,
  } = useGame()

  // No modo treino a carta virada do dealer fica visível durante toda a rodada.
  const hideHole = !isRoundOver && !settings.trainingMode
  const banner = RESULT_MESSAGES[result]

  return (
    <section className="relative flex flex-col gap-6 p-[clamp(1.5rem,4vw,2.5rem)] border-[3px] border-accent [border-radius:180px/60px] felt-surface overflow-hidden shadow-[var(--shadow-panel),inset_0_0_90px_var(--color-table-shade)] before:content-[''] before:absolute before:inset-[10px] before:[border-radius:inherit] before:border before:border-accent-strong/45 before:pointer-events-none">
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
        <span className="block font-display uppercase tracking-[0.3em] text-accent-strong text-[clamp(0.6rem,1.8vw,0.8rem)]">
          BLACKJACK PAGA 3:2 · DEALER PARA NO {settings.dealerStandsAt}
        </span>
        {banner && (
          <p className="mt-3 font-display text-fg text-[clamp(1.1rem,3.4vw,1.6rem)] [text-shadow:0_2px_8px_rgb(0_0_0/0.25)]">
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
          <span>{settings.playerName || 'Você'}</span>
          <span className={scorePill}>{playerScore}</span>
        </div>
      </div>
    </section>
  )
}

export default GameTable
