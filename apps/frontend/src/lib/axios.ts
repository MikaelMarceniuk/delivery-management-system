import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import env from './env'

const tenSeconds = 10000

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: tenSeconds,
})

type CustomAxiosRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig | undefined

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('auth/refresh')
    ) {
      originalRequest._retry = true

      try {
        await api.post('/auth/refresh')
        return api(originalRequest)
      } catch (refreshError) {
        console.error('Erro ao renovar token:', refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
