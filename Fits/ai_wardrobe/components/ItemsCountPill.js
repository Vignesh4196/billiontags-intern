import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fontFamily, radius, spacing } from '../theme';

// Grey pill "N Items from your wardrobe" with a hanger icon (Steps 2 and 3).
export default function ItemsCountPill({ count, style }) {
  return (
    <View style={[styles.pill, style]}>
      <MaterialCommunityIcons name="hanger" size={20} color={colors.textPrimary} />
      <Text style={styles.text}>{`${count} Items from your wardrobe`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.chipMuted,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  text: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.textHeading,
    marginLeft: spacing.sm,
  },
});
