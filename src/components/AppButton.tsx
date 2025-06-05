import { FC } from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ActivityIndicator,
  View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../hooks'

interface AppButtonProps extends TouchableOpacityProps {
  title?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  isLoading?: boolean;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
}

export const AppButton: FC<AppButtonProps> = ({
  title,
  variant = 'primary',
  isLoading = false,
  iconName,
  iconSize = 20,
  style,
  disabled,
  children,
  ...rest
}) => {
  const { colors, spacing, fonts } = useTheme()

  const getButtonVariantStyle = () => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: colors.button.secondary,
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.sm,
        }
      case 'tertiary':
        return {
          backgroundColor: colors.button.tertiary,
          paddingVertical: spacing.xs,
          paddingHorizontal: spacing.xs,
        }
      default:
        return {
          backgroundColor: colors.button.primary,
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.md,
        }
    }
  }

  const getButtonContentColor = () => {
    switch (variant) {
      case 'secondary':
        return colors.button.secondaryButtonContents
      case 'tertiary':
        return colors.button.tertiaryButtonContents
      default:
        return colors.button.primaryButtonContents
    }
  }

  const buttonTextStyle = {
    fontSize: fonts.sizes.buttonPrimary.fontSize,
    lineHeight: fonts.sizes.buttonPrimary.lineHeight,
    fontFamily: variant === 'primary' ? fonts.semibold : fonts.medium,
    color: getButtonContentColor(),
  }

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    button: {
      borderRadius: spacing.xl,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled || isLoading ? 0.8 : 1,
    },
    iconStyle: {
      color: getButtonContentColor(),
      fontSize: iconSize,
    }
  })

  return (
    <TouchableOpacity
      style={[styles.button, getButtonVariantStyle(), style]}
      onPress={rest.onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={getButtonContentColor()}/>
      ) : (
        <View style={styles.container}>
          {iconName && <Ionicons name={iconName} style={styles.iconStyle}/>}
          {title && <Text style={buttonTextStyle}>{title}</Text>}
          {children && children}
        </View>
      )}
    </TouchableOpacity>
  )
}
