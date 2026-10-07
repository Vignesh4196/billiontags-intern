import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, fontFamily, shadow } from '../theme';

// Partner connection card used on the profile form: "Invite Your Partner" / "Connected with …".
export default function PartnerBanner({ title, subtitle, badgeLabel, onBadgePress, tone = 'neutral', compactSubtitle = false }) {
  const Badge = onBadgePress ? TouchableOpacity : View;

  return (
    <View style={styles.card}>
      <View style={[styles.iconCircle, tone === 'pink' && styles.iconCirclePink]}>
        <Ionicons name="heart-outline" size={24} color={colors.pink} />
      </View>

      <View style={styles.text}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={[styles.subtitle, compactSubtitle && styles.subtitleCompact]}>{subtitle}</Text>
      </View>

      <Badge
        style={styles.badge}
        onPress={onBadgePress}
        activeOpacity={0.7}
        accessibilityRole={onBadgePress ? 'button' : undefined}
      >
        <Text style={styles.badgeText}>{badgeLabel}</Text>
      </Badge>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md + 2,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: 14,
    paddingVertical: 13,
    ...shadow.cardSoft,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.iconBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCirclePink: {
    backgroundColor: colors.pinkSoftBackground,
  },
  text: {
    flex: 1,
  },
  title: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: -0.2,
    color: colors.textMuted,
  },
  subtitleCompact: {
    fontSize: 12,
    letterSpacing: 0,
  },
  badge: {
    borderRadius: 15,
    backgroundColor: colors.successSoftBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 18,
    color: colors.successText,
  },
});
