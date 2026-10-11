import Header from './components/Header/Header'
import ScoreBoard from './components/ScoreBoard/ScoreBoard'
import SettingsPanel from './components/SettingsPanel/SettingsPanel'
import GameTable from './components/GameTable/GameTable'
import Controls from './components/Controls/Controls'

/**
 * Com o estado global no Context API, o App volta a ser apenas composição:
 * cada seção busca no contexto exatamente o que precisa.
 */
function App() {
  return (
    <div className="w-[min(960px,100%)] flex flex-col gap-6">
      <Header title="Blackjack" subtitle="Cassino Clássico" />
      <ScoreBoard />
      <SettingsPanel />
      <GameTable />
      <Controls />

      <footer className="text-center text-[0.8rem] tracking-[0.03em] text-fg-muted">
        <p>Felipe Ferreira Amado · RM 572567 — FIAP Front-End Design Engineering</p>
      </footer>
    </div>
  )
}

export default App
