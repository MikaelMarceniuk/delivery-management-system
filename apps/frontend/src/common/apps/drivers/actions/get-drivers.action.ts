import api from '@/src/lib/axios'
import { FormattedApiError } from '@/src/types/formated-api-error.type'
import { handleApiError } from '@/src/utils/handleApiError'
import { Driver } from '../types/driver.type'
import { PaginatedResponse } from '@/src/types/paginated-response.type'

export interface IGetDriversActionParams {
  page?: number
  size?: number
}

interface IGetDriversActionResponse {
  meta: PaginatedResponse
  drivers: Driver[]
}

export async function GetDriversAction({
  size,
  page,
}: IGetDriversActionParams): Promise<
  IGetDriversActionResponse | FormattedApiError
> {
  try {
    return (await api.get('/driver', { params: { size, page } })).data
  } catch (err) {
    return handleApiError(err)
  }
}
