import { NavLink } from 'react-router-dom'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import Button from '../Button/Button'
import { useAuth } from '../../hooks/useAuth'
import { ROUTES } from '../../routes/paths'

interface HeaderProps {
  title: string
  subtitle?: string
}

const chipBase =
  'hidden min-[480px]:grid place-items-center aspect-square w-[clamp(44px,9vw,60px)] ' +
  'rounded-full border-[3px] border-dashed border-accent-strong text-accent-strong font-display font-bold shadow-card'

const navLinkBase =
  'py-1.5 px-3 rounded-full font-display uppercase tracking-[0.12em] text-[0.72rem] ' +
  'border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'

/** Estilo do link de navegação conforme a rota ativa (fornecido pelo `NavLink`). */
function navLinkClass({ isActive }: { isActive: boolean }) {
  return isActive
    ? `${navLinkBase} border-accent-strong bg-panel-strong text-accent-strong`
    : `${navLinkBase} border-transparent text-fg-muted hover:text-accent-strong`
}

function Header({ title, subtitle }: HeaderProps) {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <header className="flex flex-col gap-3 py-4 px-6 border-2 border-accent rounded-[22px] shadow-panel bg-gradient-to-b from-panel-strong to-panel">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav className="flex flex-wrap items-center gap-1" aria-label="Navegação principal">
          <NavLink to={ROUTES.home} className={navLinkClass} end>
            Início
          </NavLink>
          <NavLink to={ROUTES.game} className={navLinkClass}>
            Mesa
          </NavLink>
          {!isAuthenticated && (
            <NavLink to={ROUTES.login} className={navLinkClass}>
              Entrar
            </NavLink>
          )}
        </nav>

        <div className="flex flex-wrap items-center gap-3">
          {isAuthenticated && (
            <>
              <span className="text-[0.72rem] uppercase tracking-[0.12em] text-fg-muted">
                {user?.name}
              </span>
              <Button variant="secondary" size="sm" onClick={logout}>
                Sair
              </Button>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>

      <div className="flex items-center justify-center gap-6">
        <span className={`${chipBase} chip-a`} aria-hidden="true">
          21
        </span>
        <div className="text-center">
          <h1 className="font-display font-bold leading-none tracking-[0.12em] text-accent-strong text-[clamp(2rem,6vw,3.4rem)] [text-shadow:0_2px_0_var(--color-accent-deep),0_3px_10px_rgb(0_0_0/0.25)]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 uppercase tracking-[0.35em] text-fg-muted text-[clamp(0.7rem,2vw,0.9rem)]">
              {subtitle}
            </p>
          )}
        </div>
        <span className={`${chipBase} chip-b`} aria-hidden="true">
          21
        </span>
      </div>
    </header>
  )
}

export default Header
