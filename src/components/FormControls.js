import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import SuccessTick from './SuccessTick';
import { colors, spacing, radius, fontFamily } from '../theme';

export function RadioDot({ selected, size = 14, color = colors.textPrimary, idleColor = colors.textSlate }) {
  return (
    <View style={[styles.radio, { width: size, height: size, borderRadius: size / 2, borderColor: selected ? color : idleColor }]}>
      {selected && <View style={{ width: size / 2, height: size / 2, borderRadius: size / 4, backgroundColor: color }} />}
    </View>
  );
}

export function CheckBox({ checked, size = 22 }) {
  return (
    <View style={[styles.checkbox, { width: size, height: size }, checked && styles.checkboxChecked]}>
      {checked && <Ionicons name="checkmark" size={size - 6} color={colors.white} />}
    </View>
  );
}

// Animated success tick (pop + check draw), used on success screens.
export function CheckBadge({ size = 72 }) {
  return <SuccessTick size={size} />;
}

const bannerTones = {
  warning: { background: colors.warningSoft, text: colors.warning, border: colors.warningSoft },
  error: { background: colors.errorSoft, text: colors.errorDeep, border: colors.dangerBorder },
  delete: { background: colors.deleteSoft, text: colors.deleteRed, border: colors.deleteSoft },
  neutral: { background: colors.screenMuted, text: colors.textPrimary, border: colors.border },
};

export function Banner({ tone = 'error', title, message, iconName, style, messageStyle }) {
  const t = bannerTones[tone];
  return (
    <View style={[styles.banner, { backgroundColor: t.background, borderColor: t.border }, style]}>
      {!!iconName && <Feather name={iconName} size={20} color={t.text} style={styles.bannerIcon} />}
      <View style={styles.bannerText}>
        {!!title && <Text style={[styles.bannerTitle, { color: t.text }]}>{title}</Text>}
        {!!message && <Text style={[styles.bannerMessage, { color: tone === 'neutral' ? colors.textMuted : t.text }, !!title && styles.bannerMessageSpaced, messageStyle]}>{message}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  radio: {
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  checkboxChecked: {
    backgroundColor: colors.textPrimary,
  },
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
    gap: spacing.md,
  },
  bannerIcon: {
    marginTop: 1,
  },
  bannerText: {
    flex: 1,
  },
  bannerTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 18,
  },
  bannerMessage: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 17,
  },
  bannerMessageSpaced: {
    marginTop: 8,
  },
});
