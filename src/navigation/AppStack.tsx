import { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList, Routes } from '../types'
import { MyAccountScreen } from '../screens'

const Stack = createNativeStackNavigator<RootStackParamList>()

export const AppStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.MyAccount} component={MyAccountScreen}/>
    </Stack.Navigator>
  )
}
