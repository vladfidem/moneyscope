import { FC, ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { AppText } from './AppText'
import { useTheme } from '../store'

interface AppErrorMessageProps {
  message?: string
  children?: ReactNode
}

export const AppErrorMessage: FC<AppErrorMessageProps> = ({ message, children }) => {
  const { spacing, colors } = useTheme()

  const styles = StyleSheet.create({
    container: {
      marginHorizontal: spacing.xs,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.system.error,
      borderRadius: spacing.size10,
      padding: spacing.sm,
      backgroundColor: colors.background.secondary
    },
    errorMessage: {
      marginLeft: spacing.sm,
      color: colors.system.error,
      textAlign: 'center',
      flexShrink: 1,
    },
  })

  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle-outline" size={spacing.lg} color={colors.system.error}/>
      <AppText type="text" variant="bodySmall" style={styles.errorMessage}>
        {message || children}
      </AppText>
    </View>
  )
}
