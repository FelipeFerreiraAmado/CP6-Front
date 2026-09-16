import type { ReactNode } from 'react'
import './Button.css'

type ButtonVariant = 'primary' | 'secondary' | 'danger'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: ButtonVariant
  disabled?: boolean
  type?: 'button' | 'submit'
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
      className={`btn btn--${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
