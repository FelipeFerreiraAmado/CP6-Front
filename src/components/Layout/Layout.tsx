import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'

/**
 * Moldura comum a todas as rotas: cabeçalho com navegação, o conteúdo da rota
 * atual (`<Outlet />`) e o rodapé. Fica no topo da árvore de rotas, então o
 * cabeçalho não é remontado a cada troca de página.
 */
function Layout() {
  return (
    <div className="w-[min(960px,100%)] flex flex-col gap-6">
      <Header title="Blackjack" subtitle="Cassino Clássico" />

      <main className="flex flex-col gap-6">
        <Outlet />
      </main>

      <footer className="text-center text-[0.8rem] tracking-[0.03em] text-fg-muted">
        <p>Felipe Ferreira Amado · RM 572567 — FIAP Front-End Design Engineering</p>
      </footer>
    </div>
  )
}

export default Layout
