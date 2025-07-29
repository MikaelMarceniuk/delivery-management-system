'use client'

import api from '@/src/lib/axios'
import { FormattedApiError } from '@/src/types/formated-api-error.type'
import { User } from '@/src/types/user.type'
import { handleApiError } from '@/src/utils/handleApiError'

export async function GetSessionAction(): Promise<User | FormattedApiError> {
  try {
    return await api.get('/auth/session')
  } catch (err) {
    return handleApiError(err)
  }
}
