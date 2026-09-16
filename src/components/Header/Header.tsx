interface HeaderProps {
  title: string
  subtitle?: string
}

const chipBase =
  'hidden min-[480px]:grid place-items-center aspect-square w-[clamp(44px,9vw,60px)] ' +
  'rounded-full border-[3px] border-dashed border-gold-light text-gold-light font-display font-bold shadow-card'

function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="flex items-center justify-center gap-6 py-4 px-6 border-2 border-gold rounded-[22px] shadow-panel bg-gradient-to-b from-black/35 to-black/15">
      <span className={`${chipBase} chip-red`} aria-hidden="true">
        21
      </span>
      <div className="text-center">
        <h1 className="font-display font-bold leading-none tracking-[0.12em] text-gold-light text-[clamp(2rem,6vw,3.4rem)] [text-shadow:0_2px_0_var(--color-gold-deep),0_3px_10px_rgb(0_0_0/0.5)]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 uppercase tracking-[0.35em] text-muted text-[clamp(0.7rem,2vw,0.9rem)]">
            {subtitle}
          </p>
        )}
      </div>
      <span className={`${chipBase} chip-black`} aria-hidden="true">
        21
      </span>
    </header>
  )
}

export default Header
