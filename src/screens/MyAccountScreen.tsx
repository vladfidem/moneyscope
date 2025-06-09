import { FC, useCallback, useEffect, useState } from 'react'
import { Image, ScrollView, View, StyleSheet, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KudaBankLightImage, KudaBankDarkImage } from '../../assets/images'
import { AppButton, AppLoader, AppText } from '../components'
import { useAuth, useTheme } from '../store'
import { accountService } from '../services'
import { AccountData } from '../types'

export const MyAccountScreen: FC = () => {
  const { spacing, colors, isDark } = useTheme()
  const { userAuthData, logout } = useAuth()
  const [accountData, setAccountData] = useState<AccountData>()
  const [refreshing, setRefreshing] = useState(false)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacing.md,
      backgroundColor: colors.background.primary,
    },
    header: {
      paddingVertical: spacing.md - spacing.xxs,
      alignItems: 'center',
      marginBottom: spacing.xl - spacing.xs
    },
    bankContainer: {
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    bankLogo: {
      width: spacing.xxl,
      height: spacing.xxl,
      marginBottom: spacing.md,
    },
    card: {
      marginTop: spacing.lg,
      backgroundColor: colors.background.secondary,
      borderRadius: spacing.md,
      padding: spacing.md,
      paddingBottom: spacing.lg,
    },
    cardTitle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    cardTitleText: {
      opacity: 0.75,
    },
    accountInfoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: spacing.sm,
    },
    transactionContainer: {
      gap: spacing.lg,
    },
    transactionItemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    transactionInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm + spacing.xs,
    },
    transactionAvatar: {
      width: spacing.xl + spacing.xs,
      height: spacing.xl + spacing.xs,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: spacing.xxl,
      backgroundColor: colors.background.primary,
    },
    transactionInfo: {
      gap: spacing.xs,
    },
    transactionInfoCaption: {
      opacity: 0.5,
    },
  })

  const formatCurrency = useCallback((amount: number, currency: string, isTransaction: boolean = false) => {
    const sign = amount < 0 ? '-' : isTransaction ? '+' : ''
    const formattedAmount = Math.abs(amount).toLocaleString('en-US')

    return `${sign}${currency}${formattedAmount}`
  }, [])

  const renderAccountInfoRow = useCallback((title: string, description: string) => (
    <View style={styles.accountInfoContainer}>
      <AppText type="text" variant="bodySmall" color="secondary">{title}</AppText>
      <AppText
        type={title === 'Available Balance' ? 'system' : 'text'}
        variant="bodySmall"
        color={title === 'Available Balance' ? 'success' : 'primary'}
      >
        {description}
      </AppText>
    </View>
  ), [])

  const fetchAccountData = useCallback(async () => {
    try {
      userAuthData && setAccountData(await accountService.getAccountData(userAuthData))
    } catch (error: any) {
      console.error('Failed to fetch account data:', error)
      await logout()
    } finally {
      setRefreshing(false)
    }
  }, [userAuthData, logout])

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await fetchAccountData()
  }, [fetchAccountData])

  useEffect(() => {
    (async () => await fetchAccountData())()
  }, [fetchAccountData])

  if (!accountData) return <AppLoader/>

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }
      >
        <View style={styles.header}>
          <AppText type="title" variant="h3" color="secondary">My Account</AppText>
        </View>

        <View style={styles.bankContainer}>
          <Image source={isDark ? KudaBankDarkImage : KudaBankLightImage} style={styles.bankLogo}/>
          <AppText type="text" variant="captionBig" weight="semibold">Kuda Bank</AppText>
        </View>

        <View style={styles.card}>
          {renderAccountInfoRow('Type of account', 'Saving')}
          {renderAccountInfoRow('Account No', accountData.accountType)}
          {renderAccountInfoRow('Available Balance', formatCurrency(accountData.availableBalance, accountData.currency))}
          {renderAccountInfoRow('Date added', accountData.dateAdded)}
        </View>

        <View style={styles.card}>
          <View style={styles.cardTitle}>
            <AppText type="text" variant="caption" weight="semibold" color="primary" style={styles.cardTitleText}>
              Recent Transactions
            </AppText>
            <AppButton iconName="chevron-forward" variant="tertiary" iconSize={12}/>
          </View>

          <View style={styles.transactionContainer}>
            {accountData.transactions.map(({ name, bank, time, amount }, index) => (
              <View key={`${name}-${time}-${index}`} style={styles.transactionItemContainer}>
                <View style={styles.transactionInfoContainer}>
                  <View style={styles.transactionAvatar}>
                    <AppText type="system" variant="bodySmall" color="primary">
                      {name[0].toUpperCase()}
                    </AppText>
                  </View>

                  <View style={styles.transactionInfo}>
                    <AppText type="text" variant="captionBig" weight="semibold" color="primary">
                      {name}
                    </AppText>
                    <AppText
                      type="text"
                      variant="caption"
                      weight="regular"
                      color="primary"
                      style={styles.transactionInfoCaption}
                    >
                      {bank} {time}
                    </AppText>
                  </View>
                </View>

                <AppText
                  type={amount > 0 ? 'system' : 'text'}
                  variant="bodySmall"
                  color={amount > 0 ? 'success' : 'primary'}
                >
                  {formatCurrency(amount, accountData.currency, true)}
                </AppText>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
