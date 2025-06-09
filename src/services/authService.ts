import { api } from './api'
import { SignUpFormDataType } from '../utils'
import { AuthResponseData } from '../types'

export const authService = {
  signUp: async (data: SignUpFormDataType): Promise<AuthResponseData> => {
    const response = await api.post('/signup', data)

    console.log(response)

    return response.data
  }
}
