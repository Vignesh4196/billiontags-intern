import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import DatabaseBackupIcon from '../../../components/icons/DatabaseBackupIcon';
import { useSelector, useDispatch } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import Toggle from '../../../components/Toggle';
import Button from '../../../components/Button';
import { RadioDot } from '../../../components/FormControls';
import { setBackupOverCellular, setBackupFrequency } from '../../../state/accountSlice';
import { backupService } from '../../../services';
import { colors, spacing, radius, fontFamily } from '../../../theme';

const FREQUENCIES = [
  { key: 'daily', label: 'Daily' },
  { key: 'weekly', label: 'Weekly' },
  { key: 'monthly', label: 'Monthly' },
];

export default function SystemBackupScreen({ navigation }) {
  const backup = useSelector((state) => state.account.backup);
  const dispatch = useDispatch();
  const usedRatio = backup.storageUsedGb / backup.storageTotalGb;

  return (
    <View style={styles.container}>
      <ScreenHeader large transparent title="System Backup" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SettingsCard radiusSize={radius.lg} style={styles.lastCard}>
          <View style={styles.lastHeader}>
            <View style={styles.flex}>
              <Text style={styles.overline}>LAST CLOUD BACKUP</Text>
              <Text style={styles.lastDate}>{backup.lastBackupLabel}</Text>
            </View>
            <DatabaseBackupIcon size={24} color={colors.textSlate} />
          </View>
          <View style={styles.usageRow}>
            <Text style={styles.usageLabel}>Cloud Storage Usage</Text>
            <Text style={styles.usageValue}>{backup.storageUsedGb} GB of {backup.storageTotalGb} GB used</Text>
          </View>
          <View style={styles.usageTrack}>
            <View style={[styles.usageFill, { width: `${usedRatio * 100}%` }]} />
          </View>
        </SettingsCard>

        <Text style={styles.sectionLabel}>Automatic Backups</Text>

        <SettingsCard noPadding radiusSize={radius.lg} style={styles.cellularCard}>
          <Text style={styles.optionText}>Backup over Cellular Data</Text>
          <Toggle value={backup.overCellular} onValueChange={(value) => { dispatch(setBackupOverCellular(value)); backupService.updateSettings({ overCellular: value }); }} />
        </SettingsCard>

        <SettingsCard noPadding radiusSize={radius.lg} style={styles.frequencyCard}>
          {FREQUENCIES.map(({ key, label }, index) => {
            const selected = backup.frequency === key;
            return (
              <TouchableOpacity
                key={key}
                style={[styles.frequencyRow, index < FREQUENCIES.length - 1 && styles.rowBorder]}
                onPress={() => { dispatch(setBackupFrequency(key)); backupService.updateSettings({ frequency: key }); }}
                activeOpacity={0.6}
                accessibilityRole="radio"
                accessibilityState={{ checked: selected }}
              >
                <Text style={[styles.optionText, selected && styles.optionTextSelected]}>{label}</Text>
                <RadioDot selected={selected} size={13} idleColor={colors.textSlate} />
              </TouchableOpacity>
            );
          })}
        </SettingsCard>

        <Button
          title="Back Up Now"
          pill
          onPress={() => navigation.navigate('BackupProgress', { mode: 'backup' })}
          style={styles.primaryButton}
          textStyle={styles.buttonText}
        />
        <Button
          title="Restore from Cloud Backup"
          variant="outline"
          pill
          onPress={() => navigation.navigate('RestoreBackup')}
          style={styles.secondaryButton}
          textStyle={[styles.buttonText, styles.secondaryText]}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenMuted,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: 20,
    paddingBottom: 40,
  },
  flex: {
    flex: 1,
  },
  lastCard: {
    padding: 19,
  },
  lastHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overline: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.4,
    color: colors.textSlate,
  },
  lastDate: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    lineHeight: 21,
    color: colors.textPrimary,
    marginTop: 4,
  },
  usageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  usageLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textSlate,
  },
  usageValue: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textPrimary,
  },
  usageTrack: {
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.progressTrack,
    marginTop: 4,
    overflow: 'hidden',
  },
  usageFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: colors.textPrimary,
  },
  sectionLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textStrong,
    marginTop: 24,
    marginBottom: 14,
  },
  cellularCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 54,
    paddingHorizontal: spacing.lg,
  },
  frequencyCard: {
    marginTop: 14,
    overflow: 'hidden',
  },
  frequencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 52,
    paddingLeft: spacing.lg - 2,
    paddingRight: spacing.xl,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderRow,
  },
  optionText: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    lineHeight: 21,
    color: colors.textStrong,
  },
  optionTextSelected: {
    fontFamily: fontFamily.semiBold,
  },
  primaryButton: {
    height: 64,
    borderRadius: radius.pill,
    marginTop: 34,
  },
  secondaryButton: {
    height: 62,
    borderRadius: radius.pill,
    marginTop: 12,
    borderColor: colors.progressTrack,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    fontSize: 18,
  },
  secondaryText: {
    color: colors.textStrong,
  },
});
