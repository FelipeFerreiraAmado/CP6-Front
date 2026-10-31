import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { ROUTES } from '../../routes/paths'

/**
 * Rota protegida. Sem sessão, manda o jogador para o login guardando em
 * `state.from` a rota que ele tentou abrir — é isso que permite ao login
 * devolvê-lo ao destino original depois de entrar.
 */
function RequireAuth() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} state={{ from: location.pathname }} replace />
  }

  return <Outlet />
}

export default RequireAuth
