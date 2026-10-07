import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BackArrowIcon from './icons/BackArrowIcon';
import { colors, spacing, typography, fontFamily } from '../theme';

export default function ScreenHeader({ title, subtitle, onBack, rightIconName, onRightPress, large = false, transparent = false, titleStyle }) {
  const isLarge = large || !!subtitle;

  return (
    <View style={[styles.container, isLarge && styles.containerLarge, !!subtitle && styles.containerWithSubtitle, transparent && styles.transparent]}>
      <TouchableOpacity style={[styles.side, isLarge && styles.sideLarge]} onPress={onBack} hitSlop={12} accessibilityLabel="Go back">
        <BackArrowIcon size={isLarge ? 40 : 36} />
      </TouchableOpacity>

      <View style={styles.titleBlock}>
        <Text style={[styles.title, isLarge && styles.titleLarge, !!subtitle && styles.titleWithSubtitle, titleStyle]} numberOfLines={1}>{title}</Text>
        {!!subtitle && <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>}
      </View>

      <TouchableOpacity
        style={[styles.side, isLarge && styles.sideLarge]}
        onPress={onRightPress}
        hitSlop={12}
        disabled={!rightIconName}
      >
        {!!rightIconName && (
          <Ionicons name={rightIconName} size={24} color={colors.textPrimary} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    backgroundColor: colors.white,
  },
  containerLarge: {
    paddingVertical: spacing.md + 2,
  },
  containerWithSubtitle: {
    paddingTop: spacing.xs,
    paddingBottom: spacing.sm,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  side: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideLarge: {
    width: 40,
    height: 40,
  },
  titleBlock: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    ...typography.heading3,
    fontFamily: fontFamily.bold,
    fontSize: 18,
    textAlign: 'center',
  },
  titleLarge: {
    fontSize: 24,
    lineHeight: 31,
  },
  titleWithSubtitle: {
    color: colors.textHeading,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
});
