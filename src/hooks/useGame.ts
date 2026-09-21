import { useContext } from 'react'
import { GameContext, type GameContextValue } from '../contexts/GameContext'

/** Acessa o estado global da partida. Só pode ser usado dentro de `<GameProvider>`. */
export function useGame(): GameContextValue {
  const context = useContext(GameContext)

  if (!context) {
    throw new Error('useGame precisa ser usado dentro de <GameProvider>.')
  }

  return context
}
