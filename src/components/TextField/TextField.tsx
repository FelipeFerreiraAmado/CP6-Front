interface TextFieldProps {
  id: string
  label: string
  type?: 'text' | 'email' | 'password'
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  /** Mensagem de erro do campo; quando presente, o campo entra em estado inválido. */
  error?: string
  /** Dica exibida abaixo do campo quando não há erro. */
  hint?: string
  placeholder?: string
  autoComplete?: string
  maxLength?: number
  disabled?: boolean
}

const control =
  'w-full py-2.5 px-3 rounded-lg border bg-panel-strong text-fg ' +
  'placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent'

/**
 * Campo de texto reutilizável do formulário.
 *
 * Concentra a parte acessível em um só lugar: o `label` ligado ao `input`,
 * o `aria-invalid` e o `aria-describedby` apontando para a mensagem de erro
 * ou para a dica — assim o leitor de tela anuncia o problema junto do campo.
 */
function TextField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  hint,
  placeholder,
  autoComplete,
  maxLength,
  disabled = false,
}: TextFieldProps) {
  const messageId = `${id}-message`
  const hasError = Boolean(error)

  return (
    <div>
      <label className="block mb-1 text-[0.68rem] uppercase tracking-[0.12em] text-fg-muted" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={`${control} ${hasError ? 'border-danger' : 'border-accent/50'}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        disabled={disabled}
        aria-invalid={hasError}
        aria-describedby={error || hint ? messageId : undefined}
      />
      {(error || hint) && (
        <p
          id={messageId}
          className={`mt-1 text-[0.75rem] ${hasError ? 'text-danger' : 'text-fg-muted'}`}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  )
}

export default TextField
