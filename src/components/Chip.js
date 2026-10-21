import React from 'react';
import { Animated, Easing, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontFamily, shadow } from '../theme';

// onRemove: tap the chip to remove it (shows a small "x").
// variant: 'filled' (dark "Add"), 'outline' (dark label), 'muted' (grey icon + label)
export default function Chip({ label, iconName, variant = 'outline', onPress, onRemove }) {
  const isFilled = variant === 'filled';
  const isMuted = variant === 'muted';
  const scale = React.useRef(new Animated.Value(0.6)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  // Pops in when it appears (e.g. after "Add").
  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, friction: 6, tension: 140, useNativeDriver: false }),
      Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: false }),
    ]).start();
  }, [scale, opacity]);

  // Shrinks away, then tells the parent to remove it.
  const handleRemove = () => {
    Animated.parallel([
      Animated.timing(scale, { toValue: 0.6, duration: 160, easing: Easing.in(Easing.quad), useNativeDriver: false }),
      Animated.timing(opacity, { toValue: 0, duration: 160, useNativeDriver: false }),
    ]).start(() => onRemove());
  };

  const textColor = isFilled ? colors.white : isMuted ? colors.fieldLabel : colors.textPrimary;

  return (
    <Animated.View style={{ opacity, transform: [{ scale }] }}>
    <TouchableOpacity
      style={[styles.chip, isFilled ? styles.chipFilled : styles.chipOutline]}
      onPress={onRemove ? handleRemove : onPress}
      disabled={!onPress && !onRemove}
      accessibilityLabel={onRemove ? `Remove ${label}` : undefined}
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
      {!!onRemove && <Ionicons name="close" size={14} color={colors.fieldLabel} style={styles.removeIcon} />}
    </TouchableOpacity>
    </Animated.View>
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
  removeIcon: {
    marginLeft: spacing.xs + 2,
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
