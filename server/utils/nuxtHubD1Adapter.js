import { D1Adapter, up } from '@auth/d1-adapter'

let migrationsStarted = false

export function NuxtHubD1Adapter () {
  const db = hubDatabase()

  if (!migrationsStarted) {
    migrationsStarted = true

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
