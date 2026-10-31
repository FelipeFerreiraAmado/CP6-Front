import Button from '../Button/Button'
import { useTheme } from '../../hooks/useTheme'

/**
 * Botão de troca de tema. Não recebe nenhuma prop: lê e escreve o tema
 * diretamente no ThemeContext, de qualquer ponto da árvore.
 */
function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-pressed={!isDark}
      aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
    >
      <span aria-hidden="true" className="mr-2 text-sm">
        {isDark ? '☀' : '☾'}
      </span>
      {isDark ? 'Tema claro' : 'Tema escuro'}
    </Button>
  )
}

export default ThemeToggle
