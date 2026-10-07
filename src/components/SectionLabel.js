import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors, typography, fontFamily } from '../theme';

export default function SectionLabel({ title, style }) {
  return <Text style={[styles.label, style]}>{title}</Text>;
}

const styles = StyleSheet.create({
  label: {
    ...typography.heading3,
    fontFamily: fontFamily.medium,
    fontSize: 16,
    lineHeight: 21,
    color: colors.textPrimary,
    paddingTop: 16,
    paddingBottom: 8,
  },
});
