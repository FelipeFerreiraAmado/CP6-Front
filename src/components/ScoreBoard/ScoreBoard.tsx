import { useGame } from '../../hooks/useGame'

const statBox = 'min-w-[68px] py-1 px-3 rounded-lg bg-panel-soft text-center'
const statLabel = 'text-[0.68rem] uppercase tracking-[0.12em] text-fg-muted'
const statValue = 'font-display text-2xl font-bold'

/**
 * Placar da sessão. Lê tudo o que precisa do GameContext — não recebe props,
 * o que elimina o prop drilling que existia até o step-4.
 */
function ScoreBoard() {
  const { stats, statusMessage } = useGame()

  return (
    <section
      aria-label="Placar da sessão"
      className="flex flex-wrap items-center justify-between gap-4 py-3 px-6 border border-accent/50 rounded-[14px] bg-panel max-[560px]:flex-col max-[560px]:items-stretch max-[560px]:text-center"
    >
      <p className="font-display tracking-[0.04em] text-accent-strong text-[clamp(1rem,2.6vw,1.25rem)]">
        {statusMessage}
      </p>
      <dl className="flex gap-4 max-[560px]:justify-center">
        <div className={statBox}>
          <dt className={statLabel}>Vitórias</dt>
          <dd className={`${statValue} text-accent-strong`}>{stats.wins}</dd>
        </div>
        <div className={statBox}>
          <dt className={statLabel}>Derrotas</dt>
          <dd className={`${statValue} text-danger`}>{stats.losses}</dd>
        </div>
        <div className={statBox}>
          <dt className={statLabel}>Empates</dt>
          <dd className={`${statValue} text-fg`}>{stats.ties}</dd>
        </div>
      </dl>
    </section>
  )
}

export default ScoreBoard
