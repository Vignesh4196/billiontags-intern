import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../theme';
import LogoSuperbae from './icons/LogoSuperbae';

export default function Header({ onBellPress, onMenuPress, scale = 1 }) {
  return (
    <View style={[styles.container, { paddingLeft: (spacing.xxl + 6) * scale, paddingRight: spacing.xl * scale, paddingVertical: spacing.md * scale }]}>
      <LogoSuperbae width={74.4147 * scale} height={37.7592 * scale} />

      <View style={[styles.actions, { gap: spacing.md * scale }]}>
        <TouchableOpacity style={[styles.iconButton, { paddingHorizontal: (spacing.md + 2) * scale, paddingVertical: spacing.md * scale }]} onPress={onBellPress} hitSlop={8}>
          <View>
            <Ionicons name="notifications-outline" size={24 * scale} color={colors.notificationAmber} />
            <View style={[styles.notificationDot, { width: 8 * scale, height: 8 * scale, borderRadius: 4 * scale }]} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconButton, { paddingHorizontal: (spacing.md + 2) * scale, paddingVertical: spacing.md * scale }]} onPress={onMenuPress} hitSlop={8}>
          <Ionicons name="menu-outline" size={24 * scale} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: spacing.xxl + 6,
    paddingRight: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconButton: {
    paddingHorizontal: spacing.md + 2,
    paddingVertical: spacing.md,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationDot: {
    position: 'absolute',
    top: -1,
    right: -1,
    backgroundColor: colors.success,
    borderWidth: 1.5,
    borderColor: colors.white,
  },
});
