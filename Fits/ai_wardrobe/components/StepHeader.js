import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import BackArrowIcon from '../../../src/components/icons/BackArrowIcon';
import StepBadge from './StepBadge';
import { spacing } from '../theme';

// Top row for AI Wardrobe wizard screens: back arrow on the left, optional
// "Step X of 7" badge on the right.
export default function StepHeader({ onBack, step, totalSteps = 3, showBack = true }) {
  return (
    <View style={styles.row}>
      {showBack ? (
        <TouchableOpacity onPress={onBack} hitSlop={12} accessibilityLabel="Go back">
          <BackArrowIcon size={36} />
        </TouchableOpacity>
      ) : (
        <View style={styles.spacer} />
      )}
      {step ? <StepBadge current={step} total={totalSteps} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    minHeight: 44,
  },
  spacer: {
    width: 36,
    height: 36,
  },
});
