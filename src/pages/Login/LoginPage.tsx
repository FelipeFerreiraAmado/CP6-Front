import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import TextField from '../../components/TextField/TextField'
import { useAuth } from '../../hooks/useAuth'
import { useGame } from '../../hooks/useGame'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { ROUTES } from '../../routes/paths'
import {
  NAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  validateLoginField,
  validateLoginForm,
  type LoginFormErrors,
  type LoginFormValues,
} from '../../logic/validation'

const EMPTY_VALUES: LoginFormValues = { name: '', email: '', password: '' }

/**
 * Página de login.
 *
 * Formulário controlado pelo React: cada campo vive no estado, a validação roda
 * na saída do campo (`onBlur`) e novamente no envio, e o botão fica bloqueado
 * enquanto a autenticação simulada está em andamento.
 */
function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const { updateSettings } = useGame()
  const navigate = useNavigate()
  const location = useLocation()

  const [values, setValues] = useState<LoginFormValues>(EMPTY_VALUES)
  const [errors, setErrors] = useState<LoginFormErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useDocumentTitle('Entrar')

  // Rota que o jogador tentou abrir antes de ser mandado para o login.
  const from = (location.state as { from?: string } | null)?.from ?? ROUTES.game

  // Quem já entrou não precisa ver o formulário de novo.
  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  const setField = (field: keyof LoginFormValues) => (value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    // Limpa o erro do campo assim que o jogador começa a corrigi-lo.
    setErrors((current) => ({ ...current, [field]: undefined }))
    setFormError(null)
  }

  const validateField = (field: keyof LoginFormValues) => () => {
    setErrors((current) => ({ ...current, [field]: validateLoginField(field, values) }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationErrors = validateLoginForm(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setFormError('Corrija os campos destacados para continuar.')
      return
    }

    setIsSubmitting(true)
    setFormError(null)

    try {
      const user = await login(values)
      // O nome informado no login passa a ser o nome exibido na mesa.
      updateSettings({ playerName: user.name })
      // `replace` evita que o botão "voltar" traga o jogador de volta ao login.
      navigate(from, { replace: true })
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Não foi possível entrar.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="w-[min(440px,100%)] mx-auto flex flex-col gap-5 p-[clamp(1.5rem,5vw,2.25rem)] border border-accent/50 rounded-[18px] bg-panel shadow-panel">
      <div className="text-center">
        <h2 className="font-display text-accent-strong text-[clamp(1.4rem,4vw,1.9rem)] tracking-[0.06em]">
          Entrar na mesa
        </h2>
        <p className="mt-2 text-[0.85rem] text-fg-muted">
          Identifique-se para abrir a mesa de Blackjack.
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <TextField
          id="login-name"
          label="Nome na mesa"
          value={values.name}
          onChange={setField('name')}
          onBlur={validateField('name')}
          error={errors.name}
          placeholder="Felipe"
          autoComplete="nickname"
          maxLength={NAME_MAX_LENGTH}
          disabled={isSubmitting}
        />

        <TextField
          id="login-email"
          label="E-mail"
          type="email"
          value={values.email}
          onChange={setField('email')}
          onBlur={validateField('email')}
          error={errors.email}
          placeholder="jogador@cassino.com"
          autoComplete="email"
          disabled={isSubmitting}
        />

        <TextField
          id="login-password"
          label="Senha"
          type="password"
          value={values.password}
          onChange={setField('password')}
          onBlur={validateField('password')}
          error={errors.password}
          hint={`Mínimo de ${PASSWORD_MIN_LENGTH} caracteres.`}
          placeholder="••••••"
          autoComplete="current-password"
          disabled={isSubmitting}
        />

        {/* Erro geral do formulário, anunciado por leitores de tela. */}
        {formError && (
          <p
            role="alert"
            className="py-2 px-3 rounded-lg border border-danger/60 bg-panel-soft text-[0.8rem] text-danger"
          >
            {formError}
          </p>
        )}

        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Entrando…' : 'Entrar'}
        </Button>
      </form>

      <p className="text-center text-[0.75rem] text-fg-muted">
        Autenticação simulada: não há servidor, qualquer dado válido abre a mesa.
      </p>
    </section>
  )
}

export default LoginPage
