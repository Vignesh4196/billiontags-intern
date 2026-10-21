export const fontFamily = {
  regular: 'DMSans_400Regular',
  medium: 'DMSans_500Medium',
  semiBold: 'DMSans_600SemiBold',
  bold: 'DMSans_700Bold',
};

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 20,
  xl: 24,
};

export const typography = {
  headerMedium: {
    fontFamily: fontFamily.semiBold,
    fontSize: 22,
    lineHeight: 29,
  },
  headerSemi: {
    fontFamily: fontFamily.semiBold,
  },
  heading3: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.base,
    color: '#141414',
  },
  body: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: '#666666',
  },
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    color: '#636363',
  },
  buttonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.base,
  },
};
