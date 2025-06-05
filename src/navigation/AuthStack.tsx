import { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList, Routes } from '../types'
import { OnboardingScreen, SignUpScreen } from '../screens'

const Stack = createNativeStackNavigator<RootStackParamList>()

type AuthRouteType = Routes.Onboarding | Routes.SignUp

interface AuthStackProps {
  initialRouteName: AuthRouteType
}

export const AuthStack: FC<AuthStackProps> = ({ initialRouteName = Routes.Onboarding }) => {
  return (
    <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.Onboarding} component={OnboardingScreen}/>
      <Stack.Screen name={Routes.SignUp} component={SignUpScreen}/>
    </Stack.Navigator>
  )
}
