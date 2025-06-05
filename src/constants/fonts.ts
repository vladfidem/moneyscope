export const fontAssets = {
  'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'), // 400
  'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'), // 500
  'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.ttf'), //600
  'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'), // 700
}

export const fonts = {
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  semibold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
  sizes: {
    h1: { fontSize: 32, lineHeight: 40 },
    h2: { fontSize: 24, lineHeight: undefined },
    h3: { fontSize: 16, lineHeight: 20 },
    body: { fontSize: 16, lineHeight: 24 },
    bodySmall: { fontSize: 14, lineHeight: 22 },
    caption: { fontSize: 12, lineHeight: undefined },
    captionBig: { fontSize: 14, lineHeight: undefined },
    inputFieldText: { fontSize: 14, lineHeight: undefined },
    inputFieldCaption: { fontSize: 10, lineHeight: undefined },
    buttonPrimary: { fontSize: 16, lineHeight: 24 },
  }
}
