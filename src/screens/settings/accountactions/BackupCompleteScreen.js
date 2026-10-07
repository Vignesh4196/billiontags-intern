import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import SuccessTick from '../../../components/SuccessTick';
import DatabaseBackupIcon from '../../../components/icons/DatabaseBackupIcon';
import { useSelector } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import DetailRow from '../../../components/DetailRow';
import Button from '../../../components/Button';
import { colors, spacing, radius, fontFamily, typography } from '../../../theme';

export default function BackupCompleteScreen({ navigation, route }) {
  const isRestore = route?.params?.mode === 'restore';
  const backup = useSelector((state) => state.account.backup);
  const selected = backup.backups.find((item) => item.id === backup.selectedBackupId) || backup.backups[0];
  const result = isRestore
    ? { dateLabel: selected.dateLabel, size: selected.size, duration: '8 minutes', items: selected.files }
    : backup.lastResult;

  // popTo returns to the existing System backup instead of pushing a second copy,
  // which made back bounce between the two screens.
  const goBackToBackup = () => navigation.popTo('SystemBackup');

  return (
    <View style={styles.container}>
      <ScreenHeader large titleStyle={typography.headerMedium} transparent title={isRestore ? 'Restore Complete' : 'Backup Complete'} onBack={goBackToBackup} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.badge}>
          <SuccessTick size={80} />
        </View>
        <Text style={styles.message}>
          {isRestore ? 'Your data has been successfully restored' : 'Your data has been securely backed up'}
        </Text>

        <SettingsCard radiusSize={radius.lg} style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.flex}>
              <Text style={styles.overline}>{isRestore ? 'RESTORED FROM' : 'CLOUD BACKUP'}</Text>
              <Text style={styles.cardTitle}>Overview</Text>
            </View>
            <DatabaseBackupIcon size={24} color={colors.textSlate} />
          </View>
          <View style={styles.divider} />
          <View style={styles.rows}>
            <DetailRow label="Date" value={result.dateLabel} />
            <DetailRow label="Size" value={result.size} />
            <DetailRow label="Duration" value={result.duration} />
            <DetailRow label="Items Saved" value={result.items} />
          </View>
        </SettingsCard>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Done" variant="navy" pill onPress={goBackToBackup} style={styles.doneButton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenMuted,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
  badge: {
    marginTop: 48,
  },
  message: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    lineHeight: 21,
    color: colors.textSlate,
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    alignSelf: 'stretch',
    marginTop: 48,
    paddingHorizontal: 23,
    paddingTop: 24,
    paddingBottom: 26,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overline: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: 0.4,
    color: colors.textSlate,
  },
  cardTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
    lineHeight: 23,
    color: colors.textPrimary,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: colors.progressTrack,
    marginTop: 16,
    marginBottom: 20,
  },
  rows: {
    gap: 16,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 34,
  },
  doneButton: {
    height: 60,
    borderRadius: radius.xxl,
  },
});
