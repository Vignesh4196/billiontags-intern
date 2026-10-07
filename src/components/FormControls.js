import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
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

// Pill text field used for typed confirmation phrases ("deactivate", "delete").
export function PhraseInput({ label, value, onChangeText, placeholder, tone = 'default', style, inputStyle, ...rest }) {
  const isError = tone === 'error';
  const isDelete = tone === 'delete';
  return (
    <View style={style}>
      {!!label && <Text style={styles.phraseLabel}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textFaint}
        autoCapitalize="none"
        autoCorrect={false}
        style={[styles.phraseInput, isError && styles.phraseInputError, isDelete && styles.phraseInputDelete, inputStyle]}
        {...rest}
      />
    </View>
  );
}

export function OtpInput({ length = 4, value, onChange }) {
  const inputRef = React.useRef(null);
  const [focused, setFocused] = React.useState(false);
  const digits = value.split('');

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => inputRef.current?.focus()} style={styles.otpRow} accessibilityLabel="Verification code">
      {Array.from({ length }).map((_, index) => {
        const filled = index < digits.length;
        const active = focused && index === Math.min(digits.length, length - 1) && !(digits.length === length && index !== length - 1);
        return (
          <View key={index} style={[styles.otpBox, (filled || active) ? styles.otpBoxActive : styles.otpBoxIdle]}>
            {filled ? <Text style={styles.otpDigit}>{digits[index]}</Text> : active ? <View style={styles.otpCaret} /> : null}
          </View>
        );
      })}
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={(text) => onChange(text.replace(/\D/g, '').slice(0, length))}
        keyboardType="number-pad"
        maxLength={length}
        autoFocus
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={styles.otpHidden}
      />
    </TouchableOpacity>
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
  phraseLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  phraseInput: {
    height: 64,
    borderRadius: radius.xxl + 2,
    borderWidth: 1,
    borderColor: colors.borderInput,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.xl,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.textPrimary,
    outlineStyle: 'none',
  },
  phraseInputError: {
    borderColor: colors.errorButton,
  },
  phraseInputDelete: {
    borderColor: colors.deleteRed,
    backgroundColor: colors.screenMuted,
    color: colors.deleteRed,
    fontFamily: fontFamily.medium,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  otpBox: {
    width: 64,
    height: 64,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpBoxActive: {
    borderWidth: 1.5,
    borderColor: colors.otpBlue,
    backgroundColor: colors.white,
  },
  otpBoxIdle: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.otpIdle,
  },
  otpDigit: {
    fontFamily: fontFamily.medium,
    fontSize: 24,
    color: colors.textPrimary,
  },
  otpCaret: {
    width: 2,
    height: 24,
    backgroundColor: colors.otpBlue,
  },
  otpHidden: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
});
