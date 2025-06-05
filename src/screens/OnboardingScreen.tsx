import { FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppText } from '../components'

export const OnboardingScreen: FC = () => {
  return (
    <SafeAreaView>
      <AppText>Onboarding Screen</AppText>
    </SafeAreaView>
  )
}
