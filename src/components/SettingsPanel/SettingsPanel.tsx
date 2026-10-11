import Button from '../Button/Button'
import { useGame } from '../../hooks/useGame'
import { useTheme } from '../../hooks/useTheme'
import { DEALER_STAND_OPTIONS } from '../../contexts/GameContext'

const fieldLabel = 'block mb-1 text-[0.68rem] uppercase tracking-[0.12em] text-fg-muted'
const fieldControl =
  'w-full py-2 px-3 rounded-lg border border-accent/50 bg-panel-strong text-fg ' +
  'focus:outline-none focus:ring-2 focus:ring-accent'

/**
 * Configurações globais da aplicação.
 *
 * Escreve no GameContext (nome, regra do dealer, modo treino) e no ThemeContext
 * (tema visual); qualquer componente que dependa desses valores reage sozinho.
 */
function SettingsPanel() {
  const { settings, updateSettings, resetStats } = useGame()
  const { theme, setTheme } = useTheme()

  return (
    <details className="border border-accent/50 rounded-[14px] bg-panel overflow-hidden">
      <summary className="py-3 px-6 font-display uppercase tracking-[0.18em] text-accent-strong text-[0.85rem] cursor-pointer select-none marker:text-accent">
        Configurações
      </summary>

      <div className="grid gap-4 py-4 px-6 border-t border-accent/30 sm:grid-cols-3">
        <div>
          <label className={fieldLabel} htmlFor="setting-player-name">
            Nome do jogador
          </label>
          <input
            id="setting-player-name"
            type="text"
            maxLength={18}
            className={fieldControl}
            value={settings.playerName}
            onChange={(event) => updateSettings({ playerName: event.target.value })}
          />
        </div>

        <div>
          <label className={fieldLabel} htmlFor="setting-dealer-stands">
            Dealer para em
          </label>
          <select
            id="setting-dealer-stands"
            className={fieldControl}
            value={settings.dealerStandsAt}
            onChange={(event) => updateSettings({ dealerStandsAt: Number(event.target.value) })}
          >
            {DEALER_STAND_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option} pontos
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className={fieldLabel}>Tema visual</span>
          <select
            aria-label="Tema visual"
            className={fieldControl}
            value={theme}
            onChange={(event) => setTheme(event.target.value === 'light' ? 'light' : 'dark')}
          >
            <option value="dark">Noturno</option>
            <option value="light">Diurno</option>
          </select>
        </div>

        <label className="flex items-center gap-3 text-[0.85rem] text-fg sm:col-span-2">
          <input
            type="checkbox"
            className="size-4 accent-[var(--color-accent)]"
            checked={settings.trainingMode}
            onChange={(event) => updateSettings({ trainingMode: event.target.checked })}
          />
          Modo treino (mostra a carta virada do dealer)
        </label>

        <div className="flex items-end justify-start sm:justify-end">
          <Button variant="secondary" size="sm" onClick={resetStats}>
            Zerar placar
          </Button>
        </div>
      </div>
    </details>
  )
}

export default SettingsPanel
