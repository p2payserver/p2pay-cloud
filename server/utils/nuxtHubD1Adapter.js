// server/utils/nuxtHubD1Adapter.js
import { D1Adapter, up } from '@auth/d1-adapter'
import { hubDatabase } from '#imports'

// Make sure we only start migrations once per worker
let migrationsStarted = false

export function NuxtHubD1Adapter () {
  const db = hubDatabase()

  // Run Auth.js D1 migrations lazily, in the real CF runtime
  if (!migrationsStarted) {
    migrationsStarted = true

    // up() is idempotent: safe to call multiple times, it just ensures the 4 tables exist
    // accounts, sessions, users, verification_tokens :contentReference[oaicite:1]{index=1}
    up(db)
      .then(() => {
        console.log('[auth] D1 migrations ran successfully')
      })
      .catch((err) => {
        console.error('[auth] D1 migration failed', err)
      })
  }

  return D1Adapter(db)
}
