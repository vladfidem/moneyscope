import { FC } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import { ThemeProvider, AuthProvider } from './src/store'
import { fontAssets } from './src/constants'
import { AppNavigator } from './src/navigation'
import { AppLoader } from './src/components'

export const App: FC = () => {
  const [fontsLoaded] = useFonts(fontAssets)

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        {!fontsLoaded ? (
          <AppLoader/>
        ) : (
          <AuthProvider>
            <AppNavigator/>
            <StatusBar style="auto"/>
          </AuthProvider>
        )}
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
