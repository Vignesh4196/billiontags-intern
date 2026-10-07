import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, spacing, radius, typography, fontFamily } from '../theme';

export default function ChatBubble({ text, time, side = 'left', variant = 'light', avatarLabel, avatarImage }) {
  const isRight = side === 'right';
  const isDark = variant === 'dark';

  const avatar = (
    <View style={styles.avatarWrap}>
      {avatarImage ? (
        <Image source={avatarImage} style={styles.avatarImage} />
      ) : (
        <View style={styles.avatarFallback}>
          <Text style={styles.avatarFallbackText}>{avatarLabel}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={[styles.row, isRight && styles.rowReversed]}>
      {avatar}
      <View style={[styles.bubbleCol, isRight ? styles.bubbleColRight : styles.bubbleColLeft]}>
        <View style={[styles.bubble, isDark ? styles.bubbleDark : styles.bubbleLight]}>
          <Text style={[styles.text, isDark ? styles.textDark : styles.textLight]}>{text}</Text>
        </View>
        {!!time && <Text style={[styles.time, isRight && styles.timeRight]}>{time}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  rowReversed: {
    flexDirection: 'row-reverse',
  },
  avatarWrap: {
    width: 32,
    height: 32,
  },
  avatarImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  avatarFallback: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.iconBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarFallbackText: {
    ...typography.caption,
    fontFamily: fontFamily.bold,
    fontSize: 11,
    color: colors.textSecondary,
  },
  bubbleCol: {
    maxWidth: '72%',
  },
  bubbleColLeft: {
    alignItems: 'flex-start',
  },
  bubbleColRight: {
    alignItems: 'flex-end',
  },
  bubble: {
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md + 2,
  },
  bubbleLight: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  bubbleDark: {
    backgroundColor: colors.textPrimary,
  },
  text: {
    ...typography.body,
    fontSize: 14,
    lineHeight: 19,
  },
  textLight: {
    color: colors.textPrimary,
  },
  textDark: {
    color: colors.white,
  },
  time: {
    ...typography.caption,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 4,
  },
  timeRight: {
    textAlign: 'right',
  },
});
