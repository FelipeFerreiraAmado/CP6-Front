import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Card } from '../types/card'
import {
  calculateScore,
  createShuffledDeck,
  determineOutcome,
  isBlackjack,
  DEALER_STANDS_AT,
  RESULT_MESSAGES,
  type GameResult,
} from '../logic/blackjack'

export interface Stats {
  wins: number
  losses: number
  ties: number
}

const EMPTY_STATS: Stats = { wins: 0, losses: 0, ties: 0 }

interface BlackjackOptions {
  /** Pontuação em que o dealer para de comprar (vem das configurações globais). */
  dealerStandsAt?: number
}

/**
 * Encapsula todo o estado e as regras do Blackjack usando os hooks
 * useState, useEffect e useCallback. Trabalha sobre dados mockados
 * (baralho gerado em código).
 *
 * A partir do step-5 este hook é consumido uma única vez, pelo `GameProvider`,
 * que publica o resultado para toda a árvore via Context API.
 */
export function useBlackjack({ dealerStandsAt = DEALER_STANDS_AT }: BlackjackOptions = {}) {
  const [deck, setDeck] = useState<Card[]>([])
  const [playerHand, setPlayerHand] = useState<Card[]>([])
  const [dealerHand, setDealerHand] = useState<Card[]>([])
  const [result, setResult] = useState<GameResult>('playing')
  const [stats, setStats] = useState<Stats>(EMPTY_STATS)

  const playerScore = calculateScore(playerHand)
  const dealerScore = calculateScore(dealerHand)
  const isRoundOver = result !== 'playing'

  // Atualiza o placar da sessão de acordo com o resultado da rodada.
  const registerResult = useCallback((outcome: GameResult) => {
    setStats((prev) => {
      if (outcome === 'player-win' || outcome === 'dealer-bust' || outcome === 'player-blackjack') {
        return { ...prev, wins: prev.wins + 1 }
      }
      if (outcome === 'dealer-win' || outcome === 'player-bust') {
        return { ...prev, losses: prev.losses + 1 }
      }
      if (outcome === 'push') {
        return { ...prev, ties: prev.ties + 1 }
      }
      return prev
    })
  }, [])

  // Zera o placar acumulado da sessão sem interromper a rodada atual.
  const resetStats = useCallback(() => setStats(EMPTY_STATS), [])

  // Reinicia a partida: baralho novo e duas cartas para cada lado.
  const startNewRound = useCallback(() => {
    const freshDeck = createShuffledDeck()
    const player = [freshDeck[0], freshDeck[2]]
    const dealer = [freshDeck[1], freshDeck[3]]

    setDeck(freshDeck.slice(4))
    setPlayerHand(player)
    setDealerHand(dealer)

    if (isBlackjack(player)) {
      setResult('player-blackjack')
      registerResult('player-blackjack')
    } else {
      setResult('playing')
    }
  }, [registerResult])

  // Comprar: dá mais uma carta ao jogador e verifica se estourou.
  const hit = useCallback(() => {
    if (isRoundOver || deck.length === 0) return

    const [card, ...rest] = deck
    const newHand = [...playerHand, card]
    setPlayerHand(newHand)
    setDeck(rest)

    if (calculateScore(newHand) > 21) {
      setResult('player-bust')
      registerResult('player-bust')
    }
  }, [deck, playerHand, isRoundOver, registerResult])

  // Parar: o dealer compra até atingir o limite configurado e então comparamos as mãos.
  const stand = useCallback(() => {
    if (isRoundOver) return

    const workingDealer = [...dealerHand]
    const workingDeck = [...deck]
    while (calculateScore(workingDealer) < dealerStandsAt && workingDeck.length > 0) {
      workingDealer.push(workingDeck.shift() as Card)
    }

    const outcome = determineOutcome(calculateScore(playerHand), calculateScore(workingDealer))
    setDealerHand(workingDealer)
    setDeck(workingDeck)
    setResult(outcome)
    registerResult(outcome)
  }, [dealerHand, deck, playerHand, isRoundOver, dealerStandsAt, registerResult])

  // Distribui a primeira rodada uma única vez (resiste ao double-invoke do StrictMode).
  const dealtRef = useRef(false)
  useEffect(() => {
    if (dealtRef.current) return
    dealtRef.current = true
    startNewRound()
  }, [startNewRound])

  // Reflete o estado atual do jogo no título da aba do navegador.
  useEffect(() => {
    document.title = isRoundOver
      ? `Blackjack — ${RESULT_MESSAGES[result]}`
      : 'Blackjack — sua vez'
  }, [result, isRoundOver])

  // Objeto estável: evita renderizações desnecessárias em quem consome o Context.
  return useMemo(
    () => ({
      playerHand,
      dealerHand,
      playerScore,
      dealerScore,
      result,
      isRoundOver,
      stats,
      hit,
      stand,
      restart: startNewRound,
      resetStats,
    }),
    [
      playerHand,
      dealerHand,
      playerScore,
      dealerScore,
      result,
      isRoundOver,
      stats,
      hit,
      stand,
      startNewRound,
      resetStats,
    ],
  )
}
