'use client'

import { useMutation } from '@tanstack/react-query'
import {
  ISignUpActionParams,
  SignUpAction,
} from '../actions/auth/sign-up.action'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function useSignUp() {
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: async (data: ISignUpActionParams) => {
      const actionResponse = await SignUpAction(data)

      if ('error' in actionResponse) {
        throw new Error(actionResponse.error)
      }

      return actionResponse
    },
    onSuccess: ({ email }) => {
      toast.success('Usuário criado com sucesso! Redirecionando...')

      const params = new URLSearchParams()
      params.append('email', email)

      router.push(`/sign-in?${params.toString()}`)
    },
    onError(error) {
      toast.error(error.message)
    },
  })

  return mutation
}
