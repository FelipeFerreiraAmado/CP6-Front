interface ScoreBoardProps {
  wins: number
  losses: number
  ties: number
  /** Mensagem de estado da rodada atual. */
  status: string
}

const statBox = 'min-w-[68px] py-1 px-3 rounded-lg bg-white/5 text-center'
const statLabel = 'text-[0.68rem] uppercase tracking-[0.12em] text-muted'
const statValue = 'font-display text-2xl font-bold'

function ScoreBoard({ wins, losses, ties, status }: ScoreBoardProps) {
  return (
    <section
      aria-label="Placar da sessão"
      className="flex flex-wrap items-center justify-between gap-4 py-3 px-6 border border-gold/50 rounded-[14px] bg-black/25 max-[560px]:flex-col max-[560px]:items-stretch max-[560px]:text-center"
    >
      <p className="font-display tracking-[0.04em] text-gold-light text-[clamp(1rem,2.6vw,1.25rem)]">
        {status}
      </p>
      <dl className="flex gap-4 max-[560px]:justify-center">
        <div className={statBox}>
          <dt className={statLabel}>Vitórias</dt>
          <dd className={`${statValue} text-gold-light`}>{wins}</dd>
        </div>
        <div className={statBox}>
          <dt className={statLabel}>Derrotas</dt>
          <dd className={`${statValue} text-casino-red`}>{losses}</dd>
        </div>
        <div className={statBox}>
          <dt className={statLabel}>Empates</dt>
          <dd className={`${statValue} text-cream`}>{ties}</dd>
        </div>
      </dl>
    </section>
  )
}

export default ScoreBoard
