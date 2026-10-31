import { Link, useLocation } from 'react-router-dom'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { ROUTES } from '../../routes/paths'

/** Rota curinga (`*`): qualquer endereço que não exista cai aqui. */
function NotFoundPage() {
  const { pathname } = useLocation()

  useDocumentTitle('Página não encontrada')

  return (
    <section className="flex flex-col items-center gap-4 py-10 px-6 border border-accent/50 rounded-[18px] bg-panel text-center">
      <p className="font-display font-bold leading-none text-accent-strong text-[clamp(3.5rem,14vw,6rem)]">
        404
      </p>
      <h2 className="font-display text-fg text-[clamp(1.1rem,3.4vw,1.5rem)] tracking-[0.06em]">
        Esta carta não está no baralho
      </h2>
      <p className="max-w-[46ch] text-[0.85rem] text-fg-muted">
        Não encontramos nada em <code className="text-fg">{pathname}</code>. Volte para o início ou
        siga direto para a mesa.
      </p>
      <nav className="flex flex-wrap justify-center gap-3" aria-label="Rotas disponíveis">
        <Link
          to={ROUTES.home}
          className="py-2 px-6 rounded-full border-2 border-accent-strong bg-panel-strong font-display uppercase tracking-[0.1em] text-[0.75rem] text-accent-strong hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Início
        </Link>
        <Link
          to={ROUTES.game}
          className="py-2 px-6 rounded-full border-2 border-accent bg-panel-strong font-display uppercase tracking-[0.1em] text-[0.75rem] text-fg hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Mesa
        </Link>
      </nav>
    </section>
  )
}

export default NotFoundPage
