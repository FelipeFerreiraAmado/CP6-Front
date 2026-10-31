import Button from '../Button/Button'
import { useGame } from '../../hooks/useGame'

/**
 * Ações da rodada. As funções vêm do GameContext, então o App não precisa
 * mais repassar callbacks para cá.
 */
function Controls() {
  const { hit, stand, restart, isRoundOver } = useGame()

  return (
    <section className="flex flex-wrap justify-center gap-4" aria-label="Ações do jogo">
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
  )
}

export default Controls
