import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme';

// Row of short bars showing progress (current one is longer and solid dark),
// pinned above the footer buttons.
export default function PagerDots({ total = 3, current }) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }, (_, i) => (
        <View key={i} style={[styles.bar, i + 1 === current && styles.barActive]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    width: 32,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 4,
    backgroundColor: colors.borderTabBar,
  },
  barActive: {
    width: 48,
    backgroundColor: colors.textPrimary,
  },
});
