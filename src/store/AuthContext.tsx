import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthContextProps {
  isLoggedIn: boolean
  login: (token: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  login: async () => {},
  logout: async () => {},
})

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('accessToken')
      setIsLoggedIn(!!token)
    })()
  }, [])

  const login = async (token: string) => {
    await AsyncStorage.setItem('accessToken', token)
    setIsLoggedIn(true)
  }

  const logout = async () => {
    await AsyncStorage.removeItem('accessToken')
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
