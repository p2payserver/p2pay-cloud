import { D1Adapter } from '@auth/d1-adapter'
import { hubDatabase } from '#imports'

export function NuxtHubD1Adapter () {
  const db = hubDatabase()
  return D1Adapter(db)
}