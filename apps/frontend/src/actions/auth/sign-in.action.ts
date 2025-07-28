'use client'

import api from '@/src/lib/axios'
import { FormattedApiError } from '@/src/types/formated-api-error.type'
import { handleApiError } from '@/src/utils/handleApiError'

export interface ISignInActionParams {
  email: string
  password: string
}

export async function SignInAction({
  email,
  password,
}: ISignInActionParams): Promise<undefined | FormattedApiError> {
  try {
    return await api.post('/auth/sign-in', {
      email,
      password,
    })
  } catch (err) {
    return handleApiError(err)
  }
}
