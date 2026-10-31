import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import RequireAuth from './components/RequireAuth/RequireAuth'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Login/LoginPage'
import GamePage from './pages/Game/GamePage'
import NotFoundPage from './pages/NotFound/NotFoundPage'
import { ROUTES } from './routes/paths'

/**
 * Mapa de rotas da aplicação.
 *
 * Todas as páginas ficam dentro do `Layout` (cabeçalho + rodapé), e `/game`
 * passa antes pelo `RequireAuth`, que exige uma sessão ativa.
 */
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.login} element={<LoginPage />} />

        <Route element={<RequireAuth />}>
          <Route path={ROUTES.game} element={<GamePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
