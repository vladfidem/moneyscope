import { FC } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { useTheme } from '../store'

export const AppLoader: FC = () => {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <ActivityIndicator size="large" color={colors.system.primary} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
