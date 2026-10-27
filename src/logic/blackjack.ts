import type { Card } from '../types/card'

/** Resultado possível de uma rodada ("playing" = rodada em andamento). */
export type GameResult =
  | 'playing'
  | 'player-blackjack'
  | 'player-bust'
  | 'dealer-bust'
  | 'player-win'
  | 'dealer-win'
  | 'push'

/** Pontuação mínima na qual o dealer é obrigado a parar de comprar. */
export const DEALER_STANDS_AT = 17

/** Pontuação máxima antes de estourar. */
export const BLACKJACK = 21

/**
 * Calcula a pontuação de uma mão tratando o Ás como 11 ou 1:
 * começa contando cada Ás como 11 e, enquanto a mão estourar, rebaixa um Ás para 1.
 */
export function calculateScore(hand: Card[]): number {
  let total = hand.reduce((sum, card) => sum + card.value, 0)
  let aces = hand.filter((card) => card.rank === 'A').length

  while (total > BLACKJACK && aces > 0) {
    total -= 10
    aces -= 1
  }

  return total
}

/** Verdadeiro quando a mão é um Blackjack natural (21 com as duas primeiras cartas). */
export function isBlackjack(hand: Card[]): boolean {
  return hand.length === 2 && calculateScore(hand) === BLACKJACK
}

/** Decide o resultado da rodada comparando as pontuações finais. */
export function determineOutcome(playerScore: number, dealerScore: number): GameResult {
  if (playerScore > BLACKJACK) return 'player-bust'
  if (dealerScore > BLACKJACK) return 'dealer-bust'
  if (playerScore > dealerScore) return 'player-win'
  if (dealerScore > playerScore) return 'dealer-win'
  return 'push'
}

/** Mensagem exibida ao jogador para cada resultado. */
export const RESULT_MESSAGES: Record<GameResult, string> = {
  playing: 'Sua vez!',
  'player-blackjack': 'Blackjack! Você venceu 🎉',
  'player-bust': 'Você estourou! O dealer vence.',
  'dealer-bust': 'O dealer estourou! Você venceu 🎉',
  'player-win': 'Você venceu 🎉',
  'dealer-win': 'O dealer vence.',
  push: 'Empate!',
}
