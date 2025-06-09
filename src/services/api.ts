import axios, { AxiosError } from 'axios'

const API_BASE_URL = 'https://artjoms-spole.fly.dev'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response) {
      throw new Error(`API Error: ${error.response.status}`)
    } else if (error.request) {
      throw new Error('Network error: Please check your internet connection')
    } else {
      throw new Error(error.message)
    }
  }
)
