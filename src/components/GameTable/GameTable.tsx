import type { Card as CardType } from '../../types/card'
import Card from '../Card/Card'
import './GameTable.css'

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

function GameTable({
  dealerHand,
  playerHand,
  dealerScore,
  playerScore,
  hideHole = false,
  banner,
}: GameTableProps) {
  return (
    <section className="game-table">
      <div className="game-table__side">
        <div className="game-table__label">
          <span>Dealer</span>
          <span className="game-table__score">{hideHole ? '?' : dealerScore}</span>
        </div>
        <div className="game-table__hand">
          {dealerHand.map((card, index) => (
            <Card
              key={card.id}
              card={card}
              faceDown={hideHole && index === dealerHand.length - 1}
            />
          ))}
        </div>
      </div>

      <div className="game-table__center">
        <span className="game-table__arc">BLACKJACK PAGA 3:2 · DEALER PARA NO 17</span>
        {banner && <p className="game-table__banner">{banner}</p>}
      </div>

      <div className="game-table__side">
        <div className="game-table__hand">
          {playerHand.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
        <div className="game-table__label">
          <span>Você</span>
          <span className="game-table__score">{playerScore}</span>
        </div>
      </div>
    </section>
  )
}

export default GameTable
