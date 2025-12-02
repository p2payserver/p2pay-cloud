import { up } from '@auth/d1-adapter'
import { hubDatabase } from '#imports'

let migrated = false

export default defineNitroPlugin(async () => {
  if (migrated) return
  try {
    const db = hubDatabase()
    await up(db)
    migrated = true
    console.log('[auth] D1 migrations ran successfully')
  } catch (e) {
    console.error('[auth] D1 migration failed', e)
  }
})
