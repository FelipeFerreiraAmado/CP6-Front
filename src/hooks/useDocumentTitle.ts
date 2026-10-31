import { useEffect } from 'react'

const SUFFIX = 'Blackjack — Cassino Clássico'

/**
 * Escreve o título da aba do navegador.
 *
 * Com várias rotas, cada página precisa anunciar o seu próprio título — por isso
 * o efeito vive aqui, e não dentro do hook do jogo.
 */
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${SUFFIX}` : SUFFIX
  }, [title])
}
