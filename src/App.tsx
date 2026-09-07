import Header from './components/Header/Header'
import ScoreBoard from './components/ScoreBoard/ScoreBoard'
import GameTable from './components/GameTable/GameTable'
import Button from './components/Button/Button'
import { useBlackjack } from './hooks/useBlackjack'
import { RESULT_MESSAGES } from './logic/blackjack'

function App() {
  const {
    playerHand,
    dealerHand,
    playerScore,
    dealerScore,
    result,
    isRoundOver,
    stats,
    hit,
    stand,
    restart,
  } = useBlackjack()

  const status = isRoundOver
    ? 'Rodada encerrada — clique em Reiniciar'
    : 'Sua vez — compre ou pare'

  return (
    <div className="game">
      <Header title="Blackjack" subtitle="Cassino Clássico" />

      <ScoreBoard
        wins={stats.wins}
        losses={stats.losses}
        ties={stats.ties}
        status={status}
      />

      <GameTable
        dealerHand={dealerHand}
        playerHand={playerHand}
        dealerScore={dealerScore}
        playerScore={playerScore}
        hideHole={!isRoundOver}
        banner={RESULT_MESSAGES[result]}
      />

      <section className="game__controls" aria-label="Ações do jogo">
        <Button variant="primary" onClick={hit} disabled={isRoundOver}>
          Comprar
        </Button>
        <Button variant="secondary" onClick={stand} disabled={isRoundOver}>
          Parar
        </Button>
        <Button variant="danger" onClick={restart}>
          Reiniciar
        </Button>
      </section>

      <footer className="game__footer">
        <p>Felipe Ferreira Amado · RM 572567 — FIAP Front-End Design Engineering</p>
      </footer>
    </div>
  )
}

export default App
