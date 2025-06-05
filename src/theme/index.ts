import { lightTheme } from './lightTheme'
import { darkTheme } from './darkTheme'
import { Spacing, Fonts } from '../constants'

export { lightTheme, darkTheme }
export type ThemeColors = typeof lightTheme

export interface Theme {
  colors: ThemeColors
  fonts: Fonts
  spacing: Spacing
  isDark: boolean
}
