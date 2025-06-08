import axios, { isAxiosError } from 'axios'
import { Buffer } from 'buffer'
import { SignUpFormDataType } from '../utils'
import { AccountData, AuthCredentials, SignUpResponseData } from '../types'

const API_BASE_URL = 'https://artjoms-spole.fly.dev'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

const errorHandler = (error: any) => {
  if (isAxiosError(error) && error.response) {
    throw new Error(error.response.data.message)
  } else if (isAxiosError(error) && error.message) {
    throw new Error(`Network error: ${error.message}`)
  } else {
    throw new Error('An unexpected error occurred.')
  }
}

export const signUpService = async (data: SignUpFormDataType): Promise<SignUpResponseData> => {
  try {
    const response = await api.post('/signup', data)

    return response.data
  } catch (error: any) {
    throw errorHandler(error)
  }
}

export const accountService = async ({ username, password }: AuthCredentials): Promise<AccountData> => {
  try {
    const token = Buffer.from(`${username}:${password}`).toString('base64')
    const response = await api.get('/account', {
      headers: {
        Authorization: `Basic ${token}`,
      }
    })

    return response.data
  } catch (error: any) {
    throw errorHandler(error)
  }
}
