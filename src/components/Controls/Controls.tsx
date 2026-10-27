import Button from '../Button/Button'
import { useGame } from '../../hooks/useGame'

/**
 * Ações da rodada. As funções vêm do GameContext, então o App não precisa
 * mais repassar callbacks para cá.
 *
 * Como cada ação é uma chamada à API, os botões ficam bloqueados enquanto a
 * resposta não chega — evita compras duplicadas por clique repetido.
 */
function Controls() {
  const { hit, stand, restart, isRoundOver, isBusy } = useGame()

  return (
    <section className="flex flex-wrap justify-center gap-4" aria-label="Ações do jogo">
      <Button variant="primary" onClick={hit} disabled={isRoundOver || isBusy}>
        Comprar
      </Button>
      <Button variant="secondary" onClick={stand} disabled={isRoundOver || isBusy}>
        Parar
      </Button>
      <Button variant="danger" onClick={restart} disabled={isBusy}>
        Reiniciar
      </Button>
    </section>
  )
}

export default Controls
