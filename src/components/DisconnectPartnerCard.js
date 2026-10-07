import React from 'react';
import { Text, StyleSheet } from 'react-native';
import SettingsCard from './SettingsCard';
import Button from './Button';
import { colors, spacing, radius, fontFamily } from '../theme';

export default function DisconnectPartnerCard({ onDisconnect }) {
  return (
    <SettingsCard style={styles.card}>
      <Text style={styles.title}>Disconnect partner</Text>
      <Text style={styles.body}>
        Stop all active sharing and unpair your accounts. You must re-invite each other to link your profiles again.
      </Text>
      <Button
        title="Disconnect"
        variant="dangerSoft"
        pill
        onPress={onDisconnect}
        style={styles.button}
        textStyle={styles.buttonText}
      />
    </SettingsCard>
  );
}

const styles = StyleSheet.create({
  card: {
    borderColor: colors.dangerBorder,
    padding: spacing.lg,
  },
  title: {
    fontFamily: fontFamily.semiBold,
    fontSize: 20,
    lineHeight: 26,
    color: colors.dangerStrong,
  },
  body: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  button: {
    marginTop: spacing.lg,
    height: 64,
    borderRadius: radius.xxl,
  },
  buttonText: {
    fontSize: 18,
  },
});
