import ScoreBoard from '../../components/ScoreBoard/ScoreBoard'
import SettingsPanel from '../../components/SettingsPanel/SettingsPanel'
import GameTable from '../../components/GameTable/GameTable'
import Controls from '../../components/Controls/Controls'
import ErrorBanner from '../../components/ErrorBanner/ErrorBanner'
import { useGame } from '../../hooks/useGame'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { RESULT_MESSAGES } from '../../logic/blackjack'

/** Página da mesa de jogo — protegida pelo `RequireAuth`. */
function GamePage() {
  const { result, isRoundOver } = useGame()

  // O título da aba acompanha o andamento da rodada.
  useDocumentTitle(isRoundOver ? RESULT_MESSAGES[result] : 'Sua vez')

  return (
    <>
      <ScoreBoard />
      <ErrorBanner />
      <SettingsPanel />
      <GameTable />
      <Controls />
    </>
  )
}

export default GamePage
