import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontFamily, shadow } from '../theme';

// variant: 'filled' (dark "Add"), 'outline' (dark label), 'muted' (grey icon + label)
export default function Chip({ label, iconName, variant = 'outline', onPress }) {
  const isFilled = variant === 'filled';
  const isMuted = variant === 'muted';
  const textColor = isFilled ? colors.white : isMuted ? colors.fieldLabel : colors.textPrimary;

  return (
    <TouchableOpacity
      style={[styles.chip, isFilled ? styles.chipFilled : styles.chipOutline]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      {!!iconName && (
        <Ionicons
          name={iconName}
          size={isFilled ? 16 : 14}
          color={isFilled ? colors.white : colors.fieldLabel}
          style={styles.icon}
        />
      )}
      <Text style={[styles.label, isMuted && styles.labelMuted, { color: textColor }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipFilled: {
    backgroundColor: colors.tabActive,
    borderColor: colors.tabActive,
  },
  chipOutline: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    ...shadow.cardSoft,
  },
  icon: {
    marginRight: spacing.xs + 2,
  },
  label: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 18,
  },
  labelMuted: {
    fontFamily: fontFamily.medium,
  },
});
