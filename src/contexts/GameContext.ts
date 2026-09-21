import { createContext } from 'react'
import type { Card } from '../types/card'
import type { GameResult } from '../logic/blackjack'
import type { Stats } from '../hooks/useBlackjack'

/** Configurações globais da aplicação, editáveis pelo jogador. */
export interface GameSettings {
  /** Nome exibido no lugar de "Você" na mesa. */
  playerName: string
  /** Pontuação a partir da qual o dealer é obrigado a parar de comprar. */
  dealerStandsAt: number
  /** Modo treino: revela a carta virada do dealer durante a rodada. */
  trainingMode: boolean
}

/** Valores iniciais das configurações globais. */
export const DEFAULT_SETTINGS: GameSettings = {
  playerName: 'Você',
  dealerStandsAt: 17,
  trainingMode: false,
}

/** Opções aceitas pelo seletor de regra do dealer. */
export const DEALER_STAND_OPTIONS = [16, 17, 18] as const

export interface GameContextValue {
  /* ---- Estado global da partida ---- */
  playerHand: Card[]
  dealerHand: Card[]
  playerScore: number
  dealerScore: number
  result: GameResult
  isRoundOver: boolean
  stats: Stats
  /** Mensagem de estado da rodada, derivada do resultado atual. */
  statusMessage: string

  /* ---- Ações da partida ---- */
  hit: () => void
  stand: () => void
  restart: () => void
  resetStats: () => void

  /* ---- Configurações globais ---- */
  settings: GameSettings
  updateSettings: (patch: Partial<GameSettings>) => void
}

/**
 * Contexto da partida. Fica `null` fora do provider — o hook `useGame`
 * transforma esse caso em um erro explícito.
 */
export const GameContext = createContext<GameContextValue | null>(null)
