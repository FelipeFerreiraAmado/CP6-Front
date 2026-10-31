/**
 * Validação do formulário de login.
 *
 * Fica fora do componente para poder ser reaproveitada (no `onBlur` de cada campo
 * e novamente no `submit`) e para manter a página focada na interface.
 */

export interface LoginFormValues {
  name: string
  email: string
  password: string
}

/** Erros por campo; um campo ausente no objeto significa "sem erro". */
export type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>

export const NAME_MIN_LENGTH = 3
export const NAME_MAX_LENGTH = 18
export const PASSWORD_MIN_LENGTH = 6

/** Formato de e-mail: algo@algo.dominio, sem espaços. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

/** Valida um único campo — usado na saída do campo (`onBlur`). */
export function validateLoginField(
  field: keyof LoginFormValues,
  values: LoginFormValues,
): string | undefined {
  const value = values[field].trim()

  if (field === 'name') {
    if (!value) return 'Informe o nome que aparecerá na mesa.'
    if (value.length < NAME_MIN_LENGTH) return `Use pelo menos ${NAME_MIN_LENGTH} caracteres.`
    if (value.length > NAME_MAX_LENGTH) return `Use no máximo ${NAME_MAX_LENGTH} caracteres.`
    return undefined
  }

  if (field === 'email') {
    if (!value) return 'Informe o seu e-mail.'
    if (!EMAIL_PATTERN.test(value)) return 'Digite um e-mail válido, como jogador@cassino.com.'
    return undefined
  }

  if (!value) return 'Informe a sua senha.'
  if (value.length < PASSWORD_MIN_LENGTH) {
    return `A senha precisa ter pelo menos ${PASSWORD_MIN_LENGTH} caracteres.`
  }
  return undefined
}

/** Valida o formulário inteiro — usado no envio. */
export function validateLoginForm(values: LoginFormValues): LoginFormErrors {
  const errors: LoginFormErrors = {}

  for (const field of ['name', 'email', 'password'] as const) {
    const error = validateLoginField(field, values)
    if (error) errors[field] = error
  }

  return errors
}
