import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthCredentials } from '../types'

interface AuthContextProps {
  isLoggedIn: boolean
  userAuthData: AuthCredentials | null
  login: (data: AuthCredentials) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  userAuthData: null,
  login: async () => {},
  logout: async () => {},
})

const USER_AUTH_DATA_STORAGE_KEY = 'userAuthData'

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userAuthData, setUserAuthData] = useState<AuthCredentials | null>(null)

  useEffect(() => {
    (async () => {
      const storedUserAuthData = await AsyncStorage.getItem(USER_AUTH_DATA_STORAGE_KEY)

      if (storedUserAuthData) {
        const parsedUserAuthData = JSON.parse(storedUserAuthData)

        setUserAuthData(parsedUserAuthData)
        setIsLoggedIn(true)
      } else {
        setUserAuthData(null)
        setIsLoggedIn(false)
      }
    })()
  }, [])

  const login = async (data: AuthCredentials) => {
    await AsyncStorage.setItem(USER_AUTH_DATA_STORAGE_KEY, JSON.stringify(data))
    setUserAuthData(data)
    setIsLoggedIn(true)
  }

  const logout = async () => {
    await AsyncStorage.removeItem(USER_AUTH_DATA_STORAGE_KEY)
    setUserAuthData(null)
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userAuthData, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
