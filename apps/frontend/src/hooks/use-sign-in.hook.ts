'use client'

import { useMutation } from '@tanstack/react-query'
import {
  ISignInActionParams,
  SignInAction,
} from '../actions/auth/sign-in.action'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function useSignIn() {
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: async (data: ISignInActionParams) => {
      const actionResponse = await SignInAction(data)

      if (actionResponse && 'error' in actionResponse) {
        throw new Error(actionResponse.error)
      }

      return actionResponse
    },
    onSuccess: () => {
      toast.success('Autenticado com sucesso')
      router.push('/dashboard')
    },
  })

  return mutation
}
