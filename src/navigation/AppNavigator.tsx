import { FC, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Routes } from '../types'
import { AppLoader } from '../components'
import { useAuth } from '../store'
import { AppStack } from './AppStack'
import { AuthStack } from './AuthStack'

export const AppNavigator: FC = () => {
  const [firstLaunch, setFirstLaunch] = useState<boolean | null>(null)
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    (async () => {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched')

      hasLaunched === null ? setFirstLaunch(true) : setFirstLaunch(false)
    })()
  }, [])

  if (firstLaunch === null) return <AppLoader/>

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack/> : <AuthStack initialRouteName={firstLaunch ? Routes.Onboarding : Routes.SignUp}/>}
    </NavigationContainer>
  )
}
