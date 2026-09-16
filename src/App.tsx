import Header from './components/Header/Header'
import ScoreBoard from './components/ScoreBoard/ScoreBoard'
import GameTable from './components/GameTable/GameTable'
import Button from './components/Button/Button'
import { mockDealerHand, mockPlayerHand, sumValues } from './data/mockCards'

function App() {
  // step-2: layout montado a partir de dados mockados (sem lógica de jogo ainda).
  const playerScore = sumValues(mockPlayerHand)
  const dealerScore = sumValues(mockDealerHand)

  return (
    <div className="game">
      <Header title="Blackjack" subtitle="Cassino Clássico" />

      <ScoreBoard wins={0} losses={0} ties={0} status="Sua vez — compre ou pare" />

      <GameTable
        dealerHand={mockDealerHand}
        playerHand={mockPlayerHand}
        dealerScore={dealerScore}
        playerScore={playerScore}
        hideHole
        banner="Sua vez!"
      />

      <section className="game__controls" aria-label="Ações do jogo">
        <Button variant="primary">Comprar</Button>
        <Button variant="secondary">Parar</Button>
        <Button variant="danger">Reiniciar</Button>
      </section>

      <footer className="game__footer">
        <p>Felipe Ferreira Amado · RM 572567 — FIAP Front-End Design Engineering</p>
      </footer>
    </div>
  )
}

export default App
