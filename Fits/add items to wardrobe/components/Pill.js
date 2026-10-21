import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadow, fontFamily } from '../../../src/theme';

// 52px pill field used across Item details: text input, or a dropdown trigger when `onPress` is given.
export default function Pill({ label, value, placeholder, onChangeText, onPress, leading, style, keyboardType }) {
  const body = onPress ? (
    <Pressable onPress={onPress} style={styles.pill} accessibilityRole="button" accessibilityLabel={label || placeholder}>
      <View style={styles.valueRow}>
        {leading}
        <Text style={styles.value} numberOfLines={1}>{value || placeholder}</Text>
      </View>
      <Ionicons name="chevron-down" size={22} color={colors.textPrimary} />
    </Pressable>
  ) : (
    <View style={styles.pill}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        keyboardType={keyboardType}
        style={styles.input}
      />
    </View>
  );
  return (
    <View style={style}>
      {!!label && <Text style={styles.label}>{label}</Text>}
      {body}
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontFamily: fontFamily.medium, fontSize: 16, lineHeight: 20, color: colors.textPrimary, marginBottom: 12 },
  pill: {
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: colors.border,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadow.cardSoft,
  },
  valueRow: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  value: { fontFamily: fontFamily.regular, fontSize: 16, color: colors.textSecondary },
  input: { flex: 1, height: '100%', fontFamily: fontFamily.regular, fontSize: 15, color: colors.textPrimary, outlineStyle: 'none' },
});
