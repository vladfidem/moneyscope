import { FC } from 'react'
import { Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'

export const App: FC = () => {
  return (
    <View>
      <StatusBar style="auto"/>
      <Text>MoneyScope App</Text>
    </View>
  )
}
