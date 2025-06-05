import { FC } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import { ThemeProvider } from './src/store/ThemeContext'
import { fontAssets } from './src/constants/fonts'

export const App: FC = () => {
  const [fontsLoaded] = useFonts(fontAssets)

  if (!fontsLoaded) return <View style={styles.container}><ActivityIndicator/></View>

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <View style={styles.container}>
          <StatusBar style="auto"/>
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
