import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  AuthContext,
  type AuthContextValue,
  type AuthUser,
  type LoginCredentials,
} from './AuthContext'
import { readStorage, removeStorage, writeStorage } from './storage'
import { validateLoginForm } from '../logic/validation'

const STORAGE_KEY = 'cp6:user'

/** Recupera a sessão salva, se houver uma válida. */
function getInitialUser(): AuthUser | null {
  const stored = readStorage(STORAGE_KEY)
  if (!stored) return null

  try {
    const parsed = JSON.parse(stored) as Partial<AuthUser>
    if (typeof parsed.name === 'string' && typeof parsed.email === 'string') {
      return { name: parsed.name, email: parsed.email }
    }
    return null
  } catch {
    return null
  }
}

/**
 * Provider da sessão do jogador.
 *
 * Não existe back-end neste projeto: a autenticação é **simulada**. O `login`
 * revalida as credenciais (as mesmas regras do formulário), espera um instante
 * para imitar a latência de uma API e então guarda o jogador no contexto e no
 * `localStorage`, para a sessão sobreviver a um recarregamento da página.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(getInitialUser)

  // Mantém o `localStorage` em sincronia com a sessão.
  useEffect(() => {
    if (user) {
      writeStorage(STORAGE_KEY, JSON.stringify(user))
    } else {
      removeStorage(STORAGE_KEY)
    }
  }, [user])

  const login = useCallback(async ({ name, email, password }: LoginCredentials) => {
    // O provider não confia no formulário: valida de novo antes de autenticar.
    const errors = validateLoginForm({ name, email, password })
    if (Object.keys(errors).length > 0) {
      throw new Error('Credenciais inválidas. Confira os campos e tente de novo.')
    }

    // Latência simulada, para o formulário exercitar o estado de "entrando...".
    await new Promise((resolve) => setTimeout(resolve, 500))

    const authenticated: AuthUser = { name: name.trim(), email: email.trim().toLowerCase() }
    setUser(authenticated)
    return authenticated
  }, [])

  const logout = useCallback(() => setUser(null), [])

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated: user !== null, login, logout }),
    [user, login, logout],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}
