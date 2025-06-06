import { FC, useRef, useState } from 'react'
import { Dimensions, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { OnboardingImage } from '../../assets/images'
import { AppText, AppButton } from '../components'
import { useTheme } from '../store'
import { Routes } from '../types'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface OnboardingScreenProps {
  navigation: any
}

type SlideType = {
  id: string
  title: string
  description: string
}

const { width } = Dimensions.get('window')

const slides: SlideType[] = [
  {
    id: '1',
    title: 'You ought to know where your money goes',
    description: 'Get an overview of how you are performing and motivate yourself to achieve even more.'
  },
  {
    id: '2',
    title: 'Track Your Spending',
    description: 'See where your money goes with detailed insights and categorization.',
  },
  {
    id: '3',
    title: 'Achieve Financial Goals',
    description: 'Set and reach your savings and investment targets with ease.',
  },
  {
    id: '4',
    title: 'You ought to know where your money goes',
    description: 'Get an overview of how you are performing and motivate yourself to achieve even more.'
  },
]

export const OnboardingScreen: FC<OnboardingScreenProps> = ({ navigation }) => {
  const { colors, spacing } = useTheme()
  const [currentIndex, setCurrentIndex] = useState(0)
  const slidesRef = useRef<FlatList>(null)

  const slideWidth = width - (spacing.lg * 2) - (spacing.md * 2)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacing.md,
      backgroundColor: colors.background.primary,
    },
    skipButtonContainer: {
      alignSelf: 'flex-end',
      marginTop: spacing.sm,
      zIndex: 999,
    },
    skipButton: {
      paddingHorizontal: spacing.md,
    },
    imageSection: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width,
      resizeMode: 'contain'
    },
    contentCard: {
      backgroundColor: colors.background.secondary,
      borderRadius: spacing.xxl,
      paddingVertical: spacing.xl + spacing.xs,
      paddingHorizontal: spacing.lg,
      shadowOffset: { width: 0, height: spacing.md },
      shadowColor: colors.black,
      shadowOpacity: 0.08,
      shadowRadius: spacing.size10,
      elevation: spacing.size10,
    },
    slideContainer: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: spacing.lg,
      width: slideWidth,
    },
    title: {
      textAlign: 'center',
      marginBottom: spacing.md,
    },
    description: {
      textAlign: 'center',
      paddingHorizontal: spacing.lg,
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.xl,
    },
    dot: {
      width: spacing.xs + spacing.xxs,
      height: spacing.xs + spacing.xxs,
      borderRadius: spacing.xxl,
      backgroundColor: colors.system.secondary,
      marginHorizontal: spacing.xxs,
    },
    activeDot: {
      height: spacing.md + spacing.xxs,
      backgroundColor: colors.system.primary,
    },
  })

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x
    const newIndex = Math.round(contentOffsetX / (width - (spacing.md * 2)))
    setCurrentIndex(newIndex)
  }

  const handleFinishOnboarding = async () => {
    await AsyncStorage.setItem('hasLaunched', 'true')
    navigation.replace(Routes.SignUp)
  }

  const scrollToNext = async () => {
    if (slidesRef.current && currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1, animated: true })
    } else {
      await handleFinishOnboarding()
    }
  }

  const renderSlideContent = ({ item }: { item: SlideType }) => (
    <View style={styles.slideContainer}>
      <AppText type="title" variant="h2" weight="bold" style={styles.title}>
        {item.title}
      </AppText>
      <AppText type="text" variant="bodySmall" weight="medium" color="secondary" style={styles.description}>
        {item.description}
      </AppText>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.skipButtonContainer}>
        <AppButton
          title="Skip"
          variant="secondary"
          style={styles.skipButton}
          onPress={handleFinishOnboarding}
        />
      </View>

      <View style={styles.imageSection}>
        <Image source={OnboardingImage} style={styles.image}/>
      </View>

      <View style={styles.contentCard}>
        <FlatList
          ref={slidesRef}
          data={slides}
          renderItem={renderSlideContent}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          initialScrollIndex={0}
          getItemLayout={(_, index) => ({
            length: slideWidth,
            offset: slideWidth * index,
            index
          })}
          contentContainerStyle={{ alignItems: 'center' }}
        />

        {slides.length > 1 && (
          <View style={styles.paginationContainer}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, index === currentIndex && styles.activeDot]}
              />
            ))}
          </View>
        )}

        <AppButton
          title={currentIndex < slides.length - 1 ? 'Next' : 'Get Started'}
          variant="primary"
          onPress={scrollToNext}
        />
      </View>
    </SafeAreaView>
  )
}
