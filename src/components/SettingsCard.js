import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, radius, shadow } from '../theme';

export default function SettingsCard({ children, style, noPadding, radiusSize = radius.xl }) {
  return (
    <View
      style={[
        styles.card,
        { borderRadius: radiusSize },
        noPadding && styles.noPadding,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 11,
    width: '100%',
    ...shadow.cardSoft,
  },
  noPadding: {
    padding: 0,
  },
});
