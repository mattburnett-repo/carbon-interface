/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_VEHICLES_URL: string
  readonly VITE_API_KEY: string
  readonly VITE_API_ESTIMATES_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 