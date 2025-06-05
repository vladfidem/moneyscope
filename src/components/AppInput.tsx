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

interface AppInputProps extends TextInputProps {
  label?: string
  isPassword?: boolean
}

export const AppInput: React.FC<AppInputProps> = ({
  label,
  value,
  isPassword = false,
  style,
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
      paddingHorizontal: spacing.size20,
      paddingVertical: spacing.size20,
      flexDirection: 'row',
      alignItems: 'center',
      height: spacing.size10 * 6
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
      color: colors.text.tertiary,
      fontFamily: fonts.semibold,
      fontSize: fonts.sizes.inputFieldCaption.fontSize,
      marginBottom: spacing.sm,
    },
    icon: { marginLeft: spacing.size20 },
  })

  return (
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
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={spacing.size20} color={colors.system.primary}/>
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}
