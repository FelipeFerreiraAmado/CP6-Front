import './Header.css'

interface HeaderProps {
  title: string
  subtitle?: string
}

function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="header">
      <span className="header__chip" aria-hidden="true">
        21
      </span>
      <div className="header__titles">
        <h1 className="header__title">{title}</h1>
        {subtitle && <p className="header__subtitle">{subtitle}</p>}
      </div>
      <span className="header__chip header__chip--alt" aria-hidden="true">
        21
      </span>
    </header>
  )
}

export default Header
