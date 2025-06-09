import React, { FC } from 'react'
import { TouchableOpacity, StyleSheet, TouchableWithoutFeedbackProps } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../store'

interface AppCheckboxProps extends TouchableWithoutFeedbackProps {
  isChecked: boolean;
  onToggle: () => void;
  size?: number;
  isError?: boolean;
}

export const AppCheckbox: FC<AppCheckboxProps> = ({
  isChecked,
  onToggle,
  size = 24,
  style,
  isError = false,
}) => {
  const { colors, spacing } = useTheme()

  const styles = StyleSheet.create({
    checkboxContainer: {
      width: size,
      height: size,
      borderRadius: spacing.xs,
      borderWidth: spacing.size1,
      borderColor: isError ? colors.system.error : `${colors.button.primary}1A`,
      backgroundColor: isChecked ? colors.button.primary : colors.background.secondary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tickIcon: {
      color: colors.button.primaryButtonContents,
    },
  })

  return (
    <TouchableOpacity
      onPress={onToggle}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      style={[style, styles.checkboxContainer]}
    >
      {isChecked && (
        <Ionicons
          name="checkmark"
          size={size * 0.7}
          style={styles.tickIcon}
        />
      )}
    </TouchableOpacity>
  )
}
