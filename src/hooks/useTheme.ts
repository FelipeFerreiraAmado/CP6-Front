import { useContext } from 'react'
import { ThemeContext, type ThemeContextValue } from '../contexts/ThemeContext'

/** Acessa o tema visual global. Só pode ser usado dentro de `<ThemeProvider>`. */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme precisa ser usado dentro de <ThemeProvider>.')
  }

  return context
}
