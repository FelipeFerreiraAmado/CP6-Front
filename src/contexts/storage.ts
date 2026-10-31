/**
 * Pequeno utilitário de persistência usado pelos providers.
 * O `localStorage` pode lançar erro (navegação anônima, storage bloqueado),
 * por isso toda leitura/escrita é protegida e simplesmente não persiste em caso de falha.
 */
export function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

export function writeStorage(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Persistência é um extra: se não for possível salvar, o app segue funcionando.
  }
}

export function removeStorage(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    // Mesmo caso do `writeStorage`: falhar aqui não quebra a aplicação.
  }
}
