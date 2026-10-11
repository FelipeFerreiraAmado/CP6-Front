import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  GameContext,
  DEFAULT_SETTINGS,
  type GameContextValue,
  type GameSettings,
} from './GameContext'
import { readStorage, writeStorage } from './storage'
import { useBlackjack } from '../hooks/useBlackjack'

const STORAGE_KEY = 'cp6:settings'

/** Lê as configurações salvas, completando com os padrões o que estiver faltando. */
function getInitialSettings(): GameSettings {
  const stored = readStorage(STORAGE_KEY)
  if (!stored) return DEFAULT_SETTINGS

  try {
    const parsed = JSON.parse(stored) as Partial<GameSettings>
    return { ...DEFAULT_SETTINGS, ...parsed }
  } catch {
    return DEFAULT_SETTINGS
  }
}

/**
 * Provider do estado global da partida.
 *
 * Reúne em um único lugar (1) o estado do jogo, produzido pelo hook `useBlackjack`,
 * e (2) as configurações globais da aplicação — que por sua vez alimentam as regras
 * do jogo, como a pontuação em que o dealer para de comprar.
 */
export function GameProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<GameSettings>(getInitialSettings)

  const updateSettings = useCallback((patch: Partial<GameSettings>) => {
    setSettings((current) => ({ ...current, ...patch }))
  }, [])

  // Mantém as preferências do jogador entre as visitas.
  useEffect(() => {
    writeStorage(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  const game = useBlackjack({ dealerStandsAt: settings.dealerStandsAt })

  const statusMessage = game.isRoundOver
    ? 'Rodada encerrada — clique em Reiniciar'
    : 'Sua vez — compre ou pare'

  const value = useMemo<GameContextValue>(
    () => ({ ...game, statusMessage, settings, updateSettings }),
    [game, statusMessage, settings, updateSettings],
  )

  return <GameContext value={value}>{children}</GameContext>
}
