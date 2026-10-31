import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useGame } from '../../hooks/useGame'
import { ROUTES } from '../../routes/paths'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { BLACKJACK } from '../../logic/blackjack'

const panel = 'flex flex-col gap-2 p-5 border border-accent/50 rounded-[14px] bg-panel'
const panelTitle = 'font-display uppercase tracking-[0.18em] text-accent-strong text-[0.8rem]'
const cta =
  'inline-flex items-center justify-center font-display font-bold uppercase tracking-[0.08em] ' +
  'text-[clamp(0.9rem,2.2vw,1.05rem)] py-3 px-10 border-2 rounded-full shadow-card ' +
  'transition-[transform,filter] duration-150 hover:-translate-y-0.5 hover:brightness-110 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'

/** Página inicial: apresenta o jogo, as regras e leva o jogador para a mesa. */
function HomePage() {
  const { isAuthenticated, user } = useAuth()
  const { stats } = useGame()

  useDocumentTitle()
  const roundsPlayed = stats.wins + stats.losses + stats.ties

  return (
    <>
      <section className={`${panel} text-center`}>
        <h2 className="font-display text-accent-strong text-[clamp(1.3rem,3.6vw,1.8rem)] tracking-[0.06em]">
          {isAuthenticated ? `Boa sorte, ${user?.name}!` : 'Bem-vindo ao Cassino Clássico'}
        </h2>
        <p className="text-[0.9rem] text-fg-muted">
          Chegue o mais perto possível de {BLACKJACK} pontos sem estourar — e vença o dealer.
        </p>

        <div className="mt-3 flex flex-wrap justify-center gap-4">
          {isAuthenticated ? (
            <Link
              to={ROUTES.game}
              className={`${cta} bg-gradient-to-b from-btn-primary-from to-btn-primary-to border-accent-strong text-btn-primary-fg`}
            >
              Ir para a mesa
            </Link>
          ) : (
            <Link
              to={ROUTES.login}
              className={`${cta} bg-gradient-to-b from-btn-primary-from to-btn-primary-to border-accent-strong text-btn-primary-fg`}
            >
              Entrar e jogar
            </Link>
          )}
        </div>

        {roundsPlayed > 0 && (
          <p className="text-[0.75rem] text-fg-muted">
            Nesta sessão: {roundsPlayed} {roundsPlayed === 1 ? 'rodada' : 'rodadas'} · {stats.wins}{' '}
            {stats.wins === 1 ? 'vitória' : 'vitórias'}.
          </p>
        )}
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <section className={panel}>
          <h3 className={panelTitle}>Valor das cartas</h3>
          <ul className="flex flex-col gap-1 text-[0.85rem] text-fg">
            <li>Cartas de 2 a 10 valem o próprio número.</li>
            <li>J, Q e K valem 10.</li>
            <li>O Ás vale 11 ou 1 — o que for melhor para a sua mão.</li>
          </ul>
        </section>

        <section className={panel}>
          <h3 className={panelTitle}>Como se joga</h3>
          <ol className="flex flex-col gap-1 text-[0.85rem] text-fg">
            <li>1. Você e o dealer recebem duas cartas.</li>
            <li>2. Compre quantas cartas quiser sem passar de {BLACKJACK}.</li>
            <li>3. Ao parar, o dealer compra até o limite da casa.</li>
            <li>4. Ganha quem chegar mais perto de {BLACKJACK}.</li>
          </ol>
        </section>
      </div>
    </>
  )
}

export default HomePage
