import { FC, useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, View, StyleSheet, Linking } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Ionicons } from '@expo/vector-icons'
import { AppButton, AppCheckbox, AppInput, AppText } from '../components'
import { signUpSchema, SignUpFormDataType } from '../utils'
import { useAuth, useTheme } from '../store'
import { authService } from '../services'

interface SignUpScreenProps {
  navigation: any
}

export const SignUpScreen: FC<SignUpScreenProps> = ({ navigation }) => {
  const { colors, spacing } = useTheme()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const { control, handleSubmit, formState: { errors }, setError } = useForm<SignUpFormDataType>({
    resolver: yupResolver(signUpSchema),
    defaultValues: { name: '', email: '', password: '', acceptTerms: false }
  })

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
      paddingHorizontal: spacing.md,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.sm,
      marginBottom: navigation.canGoBack() ? spacing.xl + spacing.xs : (spacing.xl + spacing.xs) * 2,
    },
    titleContainer: {
      paddingHorizontal: spacing.xs,
      marginBottom: spacing.xl,
    },
    title: {
      marginBottom: spacing.sm,
    },
    formContainer: {
      flex: 1,
      paddingHorizontal: spacing.xs,
      gap: spacing.md,
    },
    checkboxContainer: {
      marginTop: spacing.md,
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: spacing.sm,
      paddingRight: spacing.xxl,
    },
    checkbox: {
      marginTop: spacing.xs,
    },
    link: {
      color: colors.button.primary,
    },
    alreadyHaveAccountTextContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: spacing.md,
    },
    createAccountButtonContainer: {
      paddingVertical: spacing.md,
    },
    errorMessageContainer: {
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

  const handleGoLink = () => Linking.openURL('https://example.com/')

  const handleSignUp = handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      setError('root', { message: '' })
      const response = await authService.signUp(data)

      await login(response.basicAuthCredentials)
    } catch (error: any) {
      setError('root', {
        type: 'manual',
        message: error.message || 'Something went wrong. Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  })

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.header}>
            {navigation.canGoBack() && (
              <AppButton iconName="chevron-back" variant="secondary" onPress={() => navigation.goBack()}/>
            )}
          </View>

          <View style={styles.titleContainer}>
            <AppText type="title" variant="h1" weight="bold" style={styles.title}>
              Create account
            </AppText>
            <AppText type="text" variant="body" color="secondary">
              Complete the sign up to get started
            </AppText>
          </View>

          <View style={styles.formContainer}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  label="Name"
                  placeholder="Enter Name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  label="Email"
                  placeholder="Enter Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  label="Password"
                  placeholder="Enter Password"
                  isPassword
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="acceptTerms"
              render={({ field: { onChange, value } }) => (
                <View style={styles.checkboxContainer}>
                  <AppCheckbox
                    size={spacing.md}
                    isChecked={value}
                    onToggle={() => onChange(!value)}
                    style={styles.checkbox}
                    isError={!!errors.acceptTerms}
                  />
                  <AppText type="text" variant="bodySmall">
                    By signing up, you agree to the{' '}
                    <AppText
                      type="text"
                      variant="bodySmall"
                      onPress={handleGoLink}
                      style={styles.link}
                    >
                      Terms of Service and Privacy Policy
                    </AppText>
                  </AppText>
                </View>
              )}
            />
          </View>

          {(errors.acceptTerms || errors.root?.message) && (
            <View style={styles.errorMessageContainer}>
              <Ionicons name="alert-circle-outline" size={spacing.lg} color={colors.system.error}/>
              <AppText type="text" variant="bodySmall" style={styles.errorMessage}>
                {errors.acceptTerms?.message || errors.root?.message}
              </AppText>
            </View>
          )}

          <View style={styles.alreadyHaveAccountTextContainer}>
            <AppText type="text" variant="bodySmall">Already have account? </AppText>
            <AppText type="text" variant="bodySmall" onPress={handleGoLink} style={styles.link}>
              Sign In
            </AppText>
          </View>

          <View style={styles.createAccountButtonContainer}>
            <AppButton
              title="Create account"
              isLoading={isLoading}
              disabled={Object.keys(errors).filter(key => key !== 'root').length > 0}
              onPress={handleSignUp}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
