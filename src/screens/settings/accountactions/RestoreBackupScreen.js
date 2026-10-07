import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import Toggle from '../../../components/Toggle';
import Button from '../../../components/Button';
import { Banner, RadioDot } from '../../../components/FormControls';
import { selectBackup, toggleRestoreOption } from '../../../state/accountSlice';
import { colors, spacing, radius, fontFamily, typography } from '../../../theme';

const RESTORE_OPTIONS = [
  { key: 'appSettings', label: 'Restore App Settings' },
  { key: 'messages', label: 'Restore Messages' },
  { key: 'media', label: 'Restore Media Files' },
  { key: 'activity', label: 'Restore Activity History' },
];

export default function RestoreBackupScreen({ navigation }) {
  const backup = useSelector((state) => state.account.backup);
  const dispatch = useDispatch();
  const anyOption = Object.values(backup.restoreOptions).some(Boolean);

  return (
    <View style={styles.container}>
      <ScreenHeader large titleStyle={typography.headerMedium} transparent title="Restore Backup" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Banner
          tone="warning"
          iconName="alert-triangle"
          message="Restoring a backup will replace your current data. This action cannot be undone."
          style={styles.banner}
          messageStyle={styles.bannerMessage}
        />

        <Text style={styles.sectionLabel}>AVAILABLE BACKUPS</Text>
        <SettingsCard noPadding radiusSize={radius.lg} style={styles.listCard}>
          {backup.backups.slice(0, 4).map((item, index, list) => {
            const selected = backup.selectedBackupId === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.backupRow, index < list.length - 1 && styles.rowBorder]}
                onPress={() => dispatch(selectBackup(item.id))}
                activeOpacity={0.6}
                accessibilityRole="radio"
                accessibilityState={{ checked: selected }}
              >
                <View style={styles.flex}>
                  <Text style={styles.backupDate}>{item.dateLabel}</Text>
                  <Text style={styles.backupMeta}>
                    {item.size} • {item.files}{item.latest ? ' • Latest' : ''}
                  </Text>
                </View>
                <RadioDot selected={selected} size={13} idleColor={colors.textSlate} />
              </TouchableOpacity>
            );
          })}
        </SettingsCard>

        <Text style={[styles.sectionLabel, styles.sectionLabelSpaced]}>RESTORE OPTIONS</Text>
        <SettingsCard noPadding radiusSize={radius.lg} style={styles.listCard}>
          {RESTORE_OPTIONS.map(({ key, label }, index) => (
            <View key={key} style={[styles.optionRow, index < RESTORE_OPTIONS.length - 1 && styles.rowBorder]}>
              <Text style={styles.optionText}>{label}</Text>
              <Toggle value={backup.restoreOptions[key]} onValueChange={() => dispatch(toggleRestoreOption(key))} />
            </View>
          ))}
        </SettingsCard>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.note}>Restoration may take 15-30 minutes depending on size.</Text>
        <Button
          title="Restore Selected Backup"
          variant="navy"
          pill
          disabled={!anyOption}
          onPress={() => navigation.navigate('BackupProgress', { mode: 'restore' })}
          style={styles.restoreButton}
          textStyle={styles.restoreText}
        />
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
    paddingHorizontal: spacing.xl,
    paddingTop: 20,
    paddingBottom: 16,
  },
  flex: {
    flex: 1,
  },
  banner: {
    borderRadius: radius.md,
    paddingVertical: 17,
  },
  bannerMessage: {
    fontSize: 14,
    lineHeight: 20,
  },
  sectionLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: 0.5,
    color: colors.textSlate,
    marginTop: 24,
    marginBottom: 15,
  },
  sectionLabelSpaced: {
    marginTop: 24,
  },
  listCard: {
    overflow: 'hidden',
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderRow,
  },
  backupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 73,
    paddingLeft: 15,
    paddingRight: 20,
    paddingVertical: 12,
  },
  backupDate: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    lineHeight: 21,
    color: colors.textPrimary,
  },
  backupMeta: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 17,
    color: colors.textSlate,
    marginTop: 4,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 52,
    paddingLeft: 14,
    paddingRight: 14,
  },
  optionText: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    lineHeight: 21,
    color: colors.textStrong,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 18,
    backgroundColor: colors.screenMuted,
  },
  note: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textSlate,
    textAlign: 'center',
    marginBottom: 14,
  },
  restoreButton: {
    height: 60,
    borderRadius: radius.xxl,
  },
  restoreText: {
    fontSize: 18,
  },
});
