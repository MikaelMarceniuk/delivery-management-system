import axios from 'axios'
import env from './env'

const tenSeconds = 10000

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: tenSeconds
})

export default api
