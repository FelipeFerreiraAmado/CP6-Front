import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { ThemeContext, type Theme, type ThemeContextValue } from './ThemeContext'
import { readStorage, writeStorage } from './storage'

const STORAGE_KEY = 'cp6:theme'

/** Lê o tema salvo; sem preferência salva, segue a configuração do sistema operacional. */
function getInitialTheme(): Theme {
  const stored = readStorage(STORAGE_KEY)
  if (stored === 'dark' || stored === 'light') return stored

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

/**
 * Provider do tema visual.
 *
 * Todo o esquema de cores vive em variáveis CSS (ver `index.css`): o provider apenas
 * escreve `data-theme` no elemento `<html>` e o CSS inverte os tokens de cor,
 * mantendo os contrastes legíveis nos dois temas.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  // Aplica o tema no documento e salva a escolha do usuário.
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    writeStorage(STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, isDark: theme === 'dark', toggleTheme, setTheme }),
    [theme, toggleTheme],
  )

  return <ThemeContext value={value}>{children}</ThemeContext>
}
