'use client'

import api from '@/src/lib/axios'
import { FormattedApiError } from '@/src/types/formated-api-error.type'
import { handleApiError } from '@/src/utils/handleApiError'

export interface ISignUpActionParams {
  email: string
  password: string
}

interface ISignUpActionResponse {
  id: string
  name: string
  email: string
}

export async function SignUpAction({
  email,
  password,
}: ISignUpActionParams): Promise<ISignUpActionResponse | FormattedApiError> {
  try {
    const apiResponse = await api.post<ISignUpActionResponse>('/user', {
      email,
      password,
    })
    return apiResponse.data
  } catch (err) {
    return handleApiError(err)
  }
}
