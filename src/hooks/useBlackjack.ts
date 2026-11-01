import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Card } from '../types/card'
import {
  calculateScore,
  determineOutcome,
  isBlackjack,
  BLACKJACK,
  DEALER_STANDS_AT,
  type GameResult,
} from '../logic/blackjack'
import { DeckApiError, drawCards, fetchNewDeck, shuffleDeck } from '../services/deckOfCards'

export interface Stats {
  wins: number
  losses: number
  ties: number
}

const EMPTY_STATS: Stats = { wins: 0, losses: 0, ties: 0 }

/** Quantas cartas são distribuídas no início da rodada (duas para cada lado). */
const OPENING_DRAW = 4

interface BlackjackOptions {
  /** Pontuação em que o dealer para de comprar (vem das configurações globais). */
  dealerStandsAt?: number
}

/** Mensagem amigável para qualquer falha vinda da camada de API. */
function describeError(error: unknown): string {
  if (error instanceof DeckApiError) return error.message
  return 'Algo deu errado ao falar com a API das cartas. Tente de novo.'
}

/** Verdadeiro quando o erro é um cancelamento nosso, e não uma falha real. */
function isAbort(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}

/**
 * Estado e regras do Blackjack.
 *
 * A partir do step-7 as cartas vêm da API Deck of Cards: o hook guarda o
 * `deck_id` da partida e cada ação (distribuir, comprar, jogada do dealer) é uma
 * chamada de verdade. A pontuação e a decisão do vencedor seguem calculadas
 * localmente pelas funções puras de `logic/blackjack.ts`.
 *
 * É consumido uma única vez, pelo `GameProvider`, que publica o resultado para
 * toda a árvore via Context API.
 */
export function useBlackjack({ dealerStandsAt = DEALER_STANDS_AT }: BlackjackOptions = {}) {
  const [remaining, setRemaining] = useState<number | null>(null)
  const [playerHand, setPlayerHand] = useState<Card[]>([])
  const [dealerHand, setDealerHand] = useState<Card[]>([])
  const [result, setResult] = useState<GameResult>('playing')
  const [stats, setStats] = useState<Stats>(EMPTY_STATS)

  /** Rótulo da operação em andamento, ou `null` quando não há chamada em voo. */
  const [pending, setPending] = useState<string | null>('Buscando o baralho…')
  const [error, setError] = useState<string | null>(null)

  /**
   * `deck_id` da partida.
   *
   * Fica em uma ref porque as ações assíncronas precisam lê-lo sem entrar nas
   * suas dependências (o que as recriaria no meio de uma chamada). A cópia em
   * estado existe só para a interface poder exibir o identificador.
   */
  const deckIdRef = useRef<string | null>(null)
  const [deckId, setDeckId] = useState<string | null>(null)

  const isBusy = pending !== null
  const playerScore = calculateScore(playerHand)
  const dealerScore = calculateScore(dealerHand)
  const isRoundOver = result !== 'playing'

  /**
   * Controller da ação disparada pelo jogador.
   *
   * Cada ação ganha um controller novo — um único controller para todo o hook
   * não serve, porque depois de abortado ele continuaria abortado e as chamadas
   * seguintes nunca sairiam.
   */
  const actionAbortRef = useRef<AbortController | null>(null)
  const nextActionSignal = useCallback(() => {
    actionAbortRef.current?.abort()
    const controller = new AbortController()
    actionAbortRef.current = controller
    return controller.signal
  }, [])

  // Cancela o que estiver em voo se o provider sair da árvore.
  useEffect(() => () => actionAbortRef.current?.abort(), [])

  /** Reporta a falha, a não ser que ela seja só o nosso cancelamento. */
  const reportError = useCallback((caught: unknown) => {
    if (isAbort(caught)) return
    setError(describeError(caught))
  }, [])

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

  /**
   * Abre uma rodada.
   *
   * Na primeira vez **busca o baralho** (que vem sem embaralhar, por isso o
   * `shuffle` em seguida); nas rodadas seguintes basta **embaralhar** o mesmo
   * baralho, o que já devolve as 52 cartas a ele. Depois **compra** as quatro
   * cartas iniciais.
   *
   * Nenhum `setState` acontece antes da primeira chamada: assim a função pode ser
   * disparada de dentro de um efeito sem provocar renderizações em cascata.
   */
  const dealRound = useCallback(
    async (signal: AbortSignal) => {
      try {
        const known = deckIdRef.current
        const deck = known ? await shuffleDeck(known, signal) : await fetchNewDeck(signal)

        deckIdRef.current = deck.id
        setDeckId(deck.id)
        setRemaining(deck.remaining)

        if (!known) {
          setPending('Embaralhando as cartas…')
          const shuffled = await shuffleDeck(deck.id, signal)
          setRemaining(shuffled.remaining)
        }

        setPending('Distribuindo as cartas…')
        const { cards, remaining: left } = await drawCards(deck.id, OPENING_DRAW, signal)

        // Como numa mesa real: alterna as cartas entre jogador e dealer.
        const player = [cards[0], cards[2]]
        const dealer = [cards[1], cards[3]]

        setPlayerHand(player)
        setDealerHand(dealer)
        setRemaining(left)

        if (isBlackjack(player)) {
          setResult('player-blackjack')
          registerResult('player-blackjack')
        } else {
          setResult('playing')
        }
      } catch (caught) {
        reportError(caught)
      } finally {
        // Se fomos cancelados, quem nos substituiu cuida do próprio rótulo.
        if (!signal.aborted) setPending(null)
      }
    },
    [registerResult, reportError],
  )

  /**
   * Distribui a primeira rodada.
   *
   * O controller é criado dentro do efeito: no StrictMode o React monta, desmonta
   * e monta de novo, então a primeira tentativa é cancelada pela limpeza e a
   * segunda execução do efeito distribui de verdade.
   */
  useEffect(() => {
    const controller = new AbortController()
    void dealRound(controller.signal)
    return () => controller.abort()
  }, [dealRound])

  /**
   * Reinicia a rodada a pedido do jogador (botão Reiniciar / nova tentativa).
   *
   * Aqui o rótulo e a limpeza do erro são imediatos — é um handler de clique, e o
   * jogador precisa ver na hora que a ação foi aceita.
   */
  const restart = useCallback(() => {
    setError(null)
    setPending('Preparando a mesa…')
    return dealRound(nextActionSignal())
  }, [dealRound, nextActionSignal])

  /** **Comprar cartas** — pede mais uma carta à API e verifica se o jogador estourou. */
  const hit = useCallback(async () => {
    if (isRoundOver || isBusy || !deckIdRef.current) return

    const signal = nextActionSignal()
    setPending('Comprando carta…')
    setError(null)

    try {
      const { cards, remaining: left } = await drawCards(deckIdRef.current, 1, signal)
      const newHand = [...playerHand, cards[0]]

      setPlayerHand(newHand)
      setRemaining(left)

      if (calculateScore(newHand) > BLACKJACK) {
        setResult('player-bust')
        registerResult('player-bust')
      }
    } catch (caught) {
      reportError(caught)
    } finally {
      if (!signal.aborted) setPending(null)
    }
  }, [playerHand, isRoundOver, isBusy, nextActionSignal, registerResult, reportError])

  /**
   * Parar: o dealer compra até o limite da casa e então comparamos as mãos.
   *
   * As compras são feitas uma a uma, e a mão é atualizada a cada resposta — assim
   * as cartas do dealer aparecem na mesa conforme vão sendo viradas.
   */
  const stand = useCallback(async () => {
    if (isRoundOver || isBusy || !deckIdRef.current) return

    const signal = nextActionSignal()
    setPending('Vez do dealer…')
    setError(null)

    try {
      let hand = dealerHand

      while (calculateScore(hand) < dealerStandsAt) {
        const { cards, remaining: left } = await drawCards(deckIdRef.current, 1, signal)
        hand = [...hand, cards[0]]
        setDealerHand(hand)
        setRemaining(left)
      }

      const outcome = determineOutcome(calculateScore(playerHand), calculateScore(hand))
      setResult(outcome)
      registerResult(outcome)
    } catch (caught) {
      reportError(caught)
    } finally {
      if (!signal.aborted) setPending(null)
    }
  }, [
    dealerHand,
    playerHand,
    isRoundOver,
    isBusy,
    dealerStandsAt,
    nextActionSignal,
    registerResult,
    reportError,
  ])

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
      deckId,
      remaining,
      pending,
      isBusy,
      error,
      hit,
      stand,
      restart,
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
      deckId,
      remaining,
      pending,
      isBusy,
      error,
      hit,
      stand,
      restart,
      resetStats,
    ],
  )
}
