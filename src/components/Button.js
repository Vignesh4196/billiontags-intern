import React from 'react';
import { View, Pressable, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, typography, shadow } from '../theme';

const variants = {
  primary: {
    background: colors.textPrimary,
    textColor: colors.white,
    borderColor: colors.textPrimary,
  },
  danger: {
    background: colors.white,
    textColor: colors.danger,
    borderColor: colors.border,
  },
  outline: {
    background: colors.white,
    textColor: colors.textPrimary,
    borderColor: colors.border,
  },
  pill: {
    background: colors.white,
    textColor: colors.textPrimary,
    borderColor: colors.border,
  },
  navy: {
    background: colors.buttonDark,
    textColor: colors.white,
    borderColor: colors.buttonDark,
  },
  destructive: {
    background: colors.errorButton,
    textColor: colors.white,
    borderColor: colors.errorButton,
    flat: true,
  },
  alert: {
    background: colors.errorText,
    textColor: colors.white,
    borderColor: colors.errorText,
    flat: true,
  },
  deleteRed: {
    background: colors.deleteRed,
    textColor: colors.white,
    borderColor: colors.deleteRed,
    flat: true,
  },
  // Light grey pill (Renew plan on the subscription screens).
  softGray: {
    background: colors.disabledButton,
    textColor: colors.textPrimary,
    borderColor: colors.disabledButton,
    flat: true,
    noDim: true,
  },
  dangerSoft: {
    background: colors.dangerSoftBackground,
    textColor: colors.dangerStrong,
    borderColor: colors.dangerButtonBorder,
    flat: true,
  },
};

export default function Button({ title, onPress, disabled = false, loading = false, variant = 'primary', iconName, IconComponent, iconImage, iconPosition = 'start', iconOnly = false, iconFlippedHorizontally = false, style, textStyle, scale = 1, pill = false }) {
  const v = variants[variant] || variants.primary;
  const iconMargin = pill ? spacing.md * scale : spacing.sm * scale;
  const iconStyle = [{ marginRight: iconMargin }, iconFlippedHorizontally && styles.iconFlippedHorizontally];

  const renderIcon = (extraStyle) => {
    if (iconImage) return <Image source={iconImage} style={[{ width: 20 * scale, height: 20 * scale }, extraStyle]} resizeMode="contain" />;
    if (IconComponent) return <View style={extraStyle}><IconComponent size={20 * scale} color={v.textColor} /></View>;
    if (iconName) return <Ionicons name={iconName} size={20 * scale} color={v.textColor} style={extraStyle} />;
    return null;
  };

  return (
    <Pressable
      style={({ pressed, hovered }) => [
        styles.button,
        { backgroundColor: v.background, borderColor: v.borderColor, height: 56 * scale, borderRadius: pill ? 28 * scale : radius.lg * scale },
        v.flat && styles.flat,
        style,
        hovered && !disabled && styles.hovered,
        disabled && !v.noDim && styles.disabled,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <>
          <ActivityIndicator size="small" color={v.textColor} style={{ marginRight: iconMargin }} />
          <Text style={[typography.buttonText, { color: v.textColor, fontSize: 16 * scale }, textStyle]}>{title}</Text>
        </>
      ) : iconOnly ? (
        renderIcon()
      ) : iconPosition === 'end' ? (
        <>
          <Text style={[typography.buttonText, { color: v.textColor, fontSize: 16 * scale }, textStyle]}>{title}</Text>
          {renderIcon([styles.iconEnd, { marginLeft: iconMargin }])}
        </>
      ) : (
        <>
          {renderIcon(iconStyle)}
          <Text style={[typography.buttonText, { color: v.textColor, fontSize: 16 * scale }, textStyle]}>{title}</Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: radius.lg,
    borderWidth: 1,
    width: '100%',
    ...shadow.cardSoft,
  },
  icon: {
    marginRight: spacing.sm,
  },
  iconEnd: {
    marginLeft: spacing.sm,
  },
  disabled: {
    opacity: 0.4,
  },
  // Mouse-over highlight (web). Same dark border the invite buttons use.
  hovered: {
    borderColor: colors.tabActive,
    borderWidth: 1.5,
  },
  pressed: {
    opacity: 0.7,
  },
  flat: {
    shadowOpacity: 0,
    elevation: 0,
  },
  iconFlippedHorizontally: {
    transform: [{ scaleX: -1 }],
  },
});
