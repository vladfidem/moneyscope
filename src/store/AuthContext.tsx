import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthCredentials } from '../types'

interface AuthContextProps {
  isLoggedIn: boolean
  userData: AuthCredentials | null
  login: (data: AuthCredentials) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  userData: null,
  login: async () => {},
  logout: async () => {},
})

const USER_DATA_STORAGE_KEY = 'userData'

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState<AuthCredentials | null>(null)

  useEffect(() => {
    (async () => {
      const storedUserData = await AsyncStorage.getItem(USER_DATA_STORAGE_KEY)

      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData)

        setUserData(parsedUserData)
        setIsLoggedIn(true)
      } else {
        setUserData(null)
        setIsLoggedIn(false)
      }
    })()
  }, [])

  const login = async (data: AuthCredentials) => {
    await AsyncStorage.setItem(USER_DATA_STORAGE_KEY, JSON.stringify(data))
    setUserData(data)
    setIsLoggedIn(true)
  }

  const logout = async () => {
    await AsyncStorage.removeItem(USER_DATA_STORAGE_KEY)
    setUserData(null)
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
