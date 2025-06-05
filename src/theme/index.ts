import { lightTheme } from './lightTheme'
import { darkTheme } from './darkTheme'
import { Spacing } from '../constants/spacing'
import { Fonts } from '../constants/fonts'

export { lightTheme, darkTheme }
export type ThemeColors = typeof lightTheme

export interface Theme {
  colors: ThemeColors
  fonts: Fonts
  spacing: Spacing
  isDark: boolean
}
