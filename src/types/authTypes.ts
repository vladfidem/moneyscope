export interface AuthCredentials {
  username: string
  password: string
}

export interface SignUpResponseData {
  message: string
  nextStep: string
  basicAuthCredentials: AuthCredentials
}

export interface Transaction {
  name: string
  bank: string
  time: string
  amount: number
}

export interface AccountData {
  accountType: string
  availableBalance: number
  currency: string
  dateAdded: string
  transactions: Transaction[]
}
