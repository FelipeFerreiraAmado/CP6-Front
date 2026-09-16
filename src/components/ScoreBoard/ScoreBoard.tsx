import './ScoreBoard.css'

interface ScoreBoardProps {
  wins: number
  losses: number
  ties: number
  /** Mensagem de estado da rodada atual. */
  status: string
}

function ScoreBoard({ wins, losses, ties, status }: ScoreBoardProps) {
  return (
    <section className="scoreboard" aria-label="Placar da sessão">
      <p className="scoreboard__status">{status}</p>
      <dl className="scoreboard__stats">
        <div className="scoreboard__stat scoreboard__stat--win">
          <dt>Vitórias</dt>
          <dd>{wins}</dd>
        </div>
        <div className="scoreboard__stat scoreboard__stat--loss">
          <dt>Derrotas</dt>
          <dd>{losses}</dd>
        </div>
        <div className="scoreboard__stat scoreboard__stat--tie">
          <dt>Empates</dt>
          <dd>{ties}</dd>
        </div>
      </dl>
    </section>
  )
}

export default ScoreBoard
