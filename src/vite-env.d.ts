/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Senha de acesso à mesa (/game), definida no `.env` e no painel da Vercel. */
  readonly VITE_GAME_PASSWORD?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
