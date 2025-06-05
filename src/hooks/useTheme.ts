import { useColorScheme } from 'react-native'
import { darkTheme, lightTheme, Theme } from '../theme'
import { spacing, fonts } from '../constants'

export const useTheme = (): Theme => {
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'

  const colors = isDark ? darkTheme : lightTheme

  return {
    colors,
    fonts,
    spacing,
    isDark
  }
}
