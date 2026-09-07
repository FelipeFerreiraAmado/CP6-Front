import type { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'danger'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: ButtonVariant
  disabled?: boolean
  type?: 'button' | 'submit'
}

const base =
  'inline-flex items-center justify-center font-display font-bold uppercase tracking-[0.08em] ' +
  'text-[clamp(0.9rem,2.2vw,1.05rem)] py-3 px-10 border-2 rounded-full shadow-card cursor-pointer ' +
  'transition-[transform,box-shadow,filter] duration-150 ' +
  'enabled:hover:-translate-y-0.5 enabled:hover:brightness-110 enabled:active:translate-y-0 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ' +
  'disabled:opacity-45 disabled:cursor-not-allowed'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-gradient-to-b from-gold-light to-gold-deep border-gold-light text-[#2a1e00]',
  secondary: 'bg-gradient-to-b from-[#16324a] to-[#0c1f30] border-gold text-cream',
  danger: 'bg-gradient-to-b from-casino-red to-casino-red-dark border-gold text-cream',
}

function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${base} ${variants[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
