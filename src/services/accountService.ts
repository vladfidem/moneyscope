import { Buffer } from 'buffer'
import { api } from './api'
import { AccountData, AuthCredentials } from '../types'

export const accountService = {
  getAccountData: async ({ username, password }: AuthCredentials): Promise<AccountData> => {
    const token = Buffer.from(`${username}:${password}`).toString('base64')
    const response = await api.get('/account', {
      headers: {
        Authorization: `Basic ${token}`,
      }
    })

    return response.data
  }
}
