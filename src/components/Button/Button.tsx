import type { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'
type ButtonSize = 'md' | 'sm'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  type?: 'button' | 'submit'
  /** Rótulo acessível quando o conteúdo visível não basta (ex.: botões com ícone). */
  'aria-label'?: string
  'aria-pressed'?: boolean
}

const base =
  'inline-flex items-center justify-center font-display font-bold uppercase tracking-[0.08em] ' +
  'border-2 rounded-full shadow-card cursor-pointer ' +
  'transition-[transform,box-shadow,filter] duration-150 ' +
  'enabled:hover:-translate-y-0.5 enabled:hover:brightness-110 enabled:active:translate-y-0 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ' +
  'disabled:opacity-45 disabled:cursor-not-allowed'

const sizes: Record<ButtonSize, string> = {
  md: 'text-[clamp(0.9rem,2.2vw,1.05rem)] py-3 px-10',
  sm: 'text-[0.72rem] tracking-[0.12em] py-1.5 px-4',
}

/** Cada variante usa tokens próprios de fundo e texto, garantindo contraste nos dois temas. */
const variants: Record<ButtonVariant, string> = {
  primary: 'bg-gradient-to-b from-btn-primary-from to-btn-primary-to border-accent-strong text-btn-primary-fg',
  secondary: 'bg-gradient-to-b from-btn-neutral-from to-btn-neutral-to border-accent text-btn-neutral-fg',
  danger: 'bg-gradient-to-b from-btn-danger-from to-btn-danger-to border-accent text-btn-danger-fg',
  ghost: 'bg-panel-strong border-accent text-accent-strong',
}

function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  'aria-label': ariaLabel,
  'aria-pressed': ariaPressed,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${base} ${sizes[size]} ${variants[variant]}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
    >
      {children}
    </button>
  )
}

export default Button
