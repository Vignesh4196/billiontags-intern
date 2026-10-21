import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fontFamily } from '../theme';
// Badge text spec (from design): color #9333EA, 13px, normal weight.

// Small lavender pill, e.g. "Step 1 of 7", shown top-right on wizard screens.
export default function StepBadge({ current, total = 3 }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{`Step ${current} of ${total}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accentSoft,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  text: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    lineHeight: 17,
    color: colors.accent,
  },
});
