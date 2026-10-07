import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fontFamily } from '../theme';

// Label on the left, bold value on the right (summary cards on backup/export screens).
export default function DetailRow({ label, value, style }) {
  return (
    <View style={[styles.row, style]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 16,
  },
  label: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textSlate,
  },
  value: {
    flexShrink: 1,
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textStrong,
    textAlign: 'right',
  },
});
