import { useQuery } from '@tanstack/react-query'
import {
  GetDriversAction,
  IGetDriversActionParams,
} from '../actions/get-drivers.action'
import { toast } from 'sonner'
import { Driver } from '../types/driver.type'
import { PaginatedResponse } from '@/src/types/paginated-response.type'

interface IUseDriversResponse extends PaginatedResponse {
  drivers: Driver[]
}

export function useDrivers(
  params: IGetDriversActionParams
): IUseDriversResponse {
  const { data } = useQuery({
    queryKey: ['/drivers', { ...params }],
    queryFn: async () => {
      const actionResponse = await GetDriversAction({ ...params })

      if ('error' in actionResponse) {
        toast.error(actionResponse.error)
        return
      }

      return actionResponse
    },
  })

  return {
    drivers: data?.drivers || [],
    total: data?.meta.total || 0,
    page: data?.meta.page || 1,
    size: data?.meta.size || 10,
    totalPages: data?.meta.totalPages || 0,
    hasNext: data?.meta.hasNext || false,
    hasPrev: data?.meta.hasPrev || false,
  }
}
