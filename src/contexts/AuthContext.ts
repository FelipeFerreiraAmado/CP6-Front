import { createContext } from 'react'

/** Jogador autenticado na sessão. */
export interface AuthUser {
  /** Nome exibido na mesa e no cabeçalho. */
  name: string
  email: string
}

/** Credenciais enviadas pelo formulário de login. */
export interface LoginCredentials {
  name: string
  email: string
  password: string
}

export interface AuthContextValue {
  /** Jogador autenticado, ou `null` quando ninguém entrou. */
  user: AuthUser | null
  /** Atalho de leitura para proteger rotas e condicionar a interface. */
  isAuthenticated: boolean
  /** Autentica o jogador (mock assíncrono). Lança erro se as credenciais não passarem. */
  login: (credentials: LoginCredentials) => Promise<AuthUser>
  /** Encerra a sessão. */
  logout: () => void
}

/**
 * Contexto de autenticação. Fica `null` fora do provider — o hook `useAuth`
 * transforma esse caso em um erro explícito.
 */
export const AuthContext = createContext<AuthContextValue | null>(null)
