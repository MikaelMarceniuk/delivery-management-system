'use client'

import { useContext } from 'react'
import { SessionContext } from '../providers/session.provider'

export function useSession() {
  const session = useContext(SessionContext)

  if (!session) {
    throw new Error('SessionProvider is required to use "useSession" hook')
  }

  return session
}
