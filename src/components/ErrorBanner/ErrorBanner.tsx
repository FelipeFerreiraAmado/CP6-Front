import Button from '../Button/Button'
import { useGame } from '../../hooks/useGame'

/**
 * Avisa quando uma chamada à API falha e oferece uma nova tentativa.
 *
 * Fica fora da mesa para não ser escondido por ela, e usa `role="alert"` para
 * que leitores de tela anunciem a falha assim que ela acontece.
 */
function ErrorBanner() {
  const { error, restart, isBusy } = useGame()

  if (!error) return null

  return (
    <section
      role="alert"
      className="flex flex-wrap items-center justify-between gap-4 py-3 px-6 border border-danger/60 rounded-[14px] bg-panel"
    >
      <div>
        <p className="font-display uppercase tracking-[0.14em] text-[0.72rem] text-danger">
          Falha na API das cartas
        </p>
        <p className="mt-1 text-[0.85rem] text-fg">{error}</p>
      </div>
      <Button variant="secondary" size="sm" onClick={restart} disabled={isBusy}>
        Tentar de novo
      </Button>
    </section>
  )
}

export default ErrorBanner
