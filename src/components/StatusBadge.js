import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, typography, fontFamily } from '../theme';

const NEEDS_REPLY_BLUE = '#2563EB';
const NEEDS_REPLY_BLUE_BG = '#DBEAFE';
const IN_PROGRESS_AMBER = '#B7791F';
const IN_PROGRESS_AMBER_BG = '#FDECC8';

const STATUS_MAP = {
  in_progress: { label: 'IN Progress', bg: IN_PROGRESS_AMBER_BG, fg: IN_PROGRESS_AMBER },
  needs_reply: { label: 'NEEDS REPLY', bg: NEEDS_REPLY_BLUE_BG, fg: NEEDS_REPLY_BLUE },
  resolved: { label: 'Resolved', bg: colors.matchBadgeBackground, fg: colors.connectedGreen, iconName: 'lock-closed' },
};

export default function StatusBadge({ status, style }) {
  const config = STATUS_MAP[status] || STATUS_MAP.in_progress;

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }, style]}>
      {!!config.iconName && <Ionicons name={config.iconName} size={11} color={config.fg} style={styles.icon} />}
      <Text style={[styles.label, { color: config.fg }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 3,
  },
  icon: {
    marginRight: 4,
  },
  label: {
    ...typography.caption,
    fontFamily: fontFamily.bold,
    fontSize: 11,
  },
});
