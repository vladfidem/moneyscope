import React, { FC } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../store'

interface AppCheckboxProps {
  isChecked: boolean;
  onToggle: () => void;
  size?: number;
}

export const AppCheckbox: FC<AppCheckboxProps> = ({
  isChecked,
  onToggle,
  size = 24,
}) => {
  const { colors, spacing } = useTheme()

  const styles = StyleSheet.create({
    checkboxContainer: {
      width: size,
      height: size,
      borderRadius: spacing.xs,
      borderWidth: 2,
      borderColor: `${colors.button.primary}1A`,
      backgroundColor: isChecked ? colors.button.primary : colors.background.secondary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tickIcon: {
      color: colors.button.primaryButtonContents,
    },
  })

  return (
    <TouchableOpacity onPress={onToggle} style={styles.checkboxContainer}>
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
