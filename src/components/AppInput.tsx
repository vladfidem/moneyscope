import React, { useRef, useState } from 'react'
import {
  TextInput,
  TextInputProps,
  View,
  Text,
  TouchableOpacity,
  StyleSheet, TouchableWithoutFeedback,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../store'
import { AppText } from './AppText'

interface AppInputProps extends TextInputProps {
  label?: string
  isPassword?: boolean
  error?: string
}

export const AppInput: React.FC<AppInputProps> = ({
  label,
  value,
  isPassword = false,
  style,
  error,
  ...rest
}) => {
  const { colors, fonts, spacing } = useTheme()
  const [showPassword, setShowPassword] = useState(false)
  const inputRef = useRef<TextInput>(null)

  const secure = isPassword && !showPassword
  const showLabel = !!label && !!value

  const styles = StyleSheet.create({
    container: {
      borderRadius: spacing.size10,
      backgroundColor: colors.background.secondary,
      paddingHorizontal: spacing.size10 * 2,
      paddingVertical: spacing.size10 * 2,
      flexDirection: 'row',
      alignItems: 'center',
      height: spacing.size10 * 6,
      borderWidth: error ? 1 : 0,
      borderColor: error && colors.system.error
    },
    valueContainer: { flex: 1 },
    value: {
      fontFamily: fonts.medium,
      fontSize: fonts.sizes.inputFieldText.fontSize,
      color: colors.text.primary,
      padding: 0,
      margin: 0,
    },
    label: {
      color: error ? colors.system.error : colors.text.tertiary,
      fontFamily: fonts.semibold,
      fontSize: fonts.sizes.inputFieldCaption.fontSize,
      marginBottom: spacing.sm,
    },
    icon: { marginLeft: spacing.size10 * 2 },
    errorText: {
      color: colors.system.error,
      fontFamily: fonts.regular,
      marginTop: spacing.xs,
    },
  })

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
        <View style={styles.container}>
          <View style={styles.valueContainer}>
            {showLabel && <Text style={styles.label}>{label}</Text>}
            <TextInput
              ref={inputRef}
              secureTextEntry={secure}
              placeholderTextColor={colors.text.tertiary}
              style={styles.value} {...rest}
            />
          </View>

          {isPassword && (
            <TouchableOpacity
              onPress={() => setShowPassword(prev => !prev)}
              style={styles.icon}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={spacing.size10 * 2}
                color={colors.system.primary}
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
      {error && (
        <AppText type="text" variant="caption" style={styles.errorText}>
          {error}
        </AppText>
      )}
    </View>
  )
}
