import { FC } from 'react'
import { Text, TextProps } from 'react-native'
import { useTheme } from '../hooks'

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'captionBig'
  | 'inputFieldText'
  | 'inputFieldCaption'
  | 'buttonPrimary'

type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold'
type Type = 'text' | 'title' | 'system'
type Color = 'primary' | 'secondary' | 'tertiary' | 'success'

interface AppTextProps extends TextProps {
  variant?: Variant
  type?: Type
  weight?: FontWeight
  color?: Color
}

export const AppText: FC<AppTextProps> = ({
  type = 'text',
  variant = 'body',
  weight = 'medium',
  color = 'primary',
  style,
  ...rest
}) => {
  const { colors, fonts } = useTheme()

  const variantStyle = fonts.sizes[variant] || fonts.sizes.body
  const fontFamily = fonts[weight]
  const section = colors[type]
  const textColor = section[color as keyof typeof section] ?? colors.text.primary

  const textStyle = {
    fontFamily,
    fontSize: variantStyle.fontSize,
    lineHeight: variantStyle.lineHeight,
    color: textColor,
    letterSpacing: 0,
  }

  return <Text suppressHighlighting={!!rest.onPress} style={[textStyle, style]} {...rest}/>
}
