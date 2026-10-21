import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../../src/theme';
import { wardrobeColors } from '../theme';

// 24px dark selection badge with a lavender tick (Figma node 8051:17461).
export default function CheckBadge({ size = 24 }) {
  return (
    <View style={[styles.badge, { width: size, height: size, borderRadius: size / 2 }]}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M5 14L8.5 17.5L19 6.5" stroke={wardrobeColors.checkTick} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.textPrimary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
});
