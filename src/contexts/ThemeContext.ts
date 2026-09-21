import { createContext } from 'react'

/** Temas disponíveis: a versão noturna (padrão) e a versão diurna (cores invertidas). */
export type Theme = 'dark' | 'light'

export interface ThemeContextValue {
  /** Tema ativo no momento. */
  theme: Theme
  /** Atalho de leitura para condicionais na interface. */
  isDark: boolean
  /** Alterna entre o tema noturno e o diurno. */
  toggleTheme: () => void
  /** Define um tema específico. */
  setTheme: (theme: Theme) => void
}

/**
 * Contexto do tema visual. Fica `null` fora do provider — o hook `useTheme`
 * transforma esse caso em um erro explícito.
 */
export const ThemeContext = createContext<ThemeContextValue | null>(null)
