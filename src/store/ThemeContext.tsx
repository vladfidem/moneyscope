import { createContext, FC, ReactNode, useContext } from 'react'
import { useTheme as useAppTheme } from '../hooks/useTheme'
import { Theme } from '../theme'

const ThemeContext = createContext<Theme | undefined>(undefined)

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useAppTheme()

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (!context) throw new Error('useTheme must be used within ThemeProvider')

  return context
}
