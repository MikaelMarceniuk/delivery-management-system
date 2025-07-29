'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '../types/user.type'
import { useQuery } from '@tanstack/react-query'
import { GetSessionAction } from '../actions/auth/get-session.action'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type SessionContextType = {
  user?: User
  isAuthenticated: boolean
  isLoading: boolean
}

const SessionContext = createContext<SessionContextType>({
  user: undefined,
  isAuthenticated: false,
  isLoading: true,
})

export const useSession = () => useContext(SessionContext)

const oneMinute = 1 * 60 * 1000

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const router = useRouter()

  const { data, isLoading } = useQuery({
    queryKey: ['/auth/session'],
    queryFn: async () => {
      const actionResponse = await GetSessionAction()

      if ('error' in actionResponse) {
        toast.error('Sessão finalizada, faça login novamente')
        router.replace('/sign-in')
      }

      return actionResponse as User
    },
    refetchInterval: oneMinute,
  })

  return (
    <SessionContext.Provider
      value={{
        user: data,
        isAuthenticated: !!data,
        isLoading,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}
