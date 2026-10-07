import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import ProgressRing from '../../../components/ProgressRing';
import PermissionsIcon from '../../../components/icons/PermissionsIcon';
import { useJobProgress } from '../../../hooks/useJobProgress';
import { backupService } from '../../../services';
import { finishFlow } from '../../../navigation/helpers';
import { completeBackup } from '../../../state/accountSlice';
import { formatLongDateTime, formatShortDateTime } from '../../../utils/dateFormat';
import { colors, spacing, radius, fontFamily, typography } from '../../../theme';

const TOTAL_MINUTES = 12;

const BACKUP_STAGES = [
  { label: 'App Settings', end: 20 },
  { label: 'User Preferences', end: 40 },
  { label: 'Messages & Media', end: 85, files: 512 },
  { label: 'Activity Logs', end: 93 },
  { label: 'Account Data', end: 100 },
];

const RESTORE_LABELS = {
  appSettings: 'App Settings',
  messages: 'Messages',
  media: 'Media Files',
  activity: 'Activity History',
};

const COPY = {
  backup: { title: 'Backing Up...', status: 'Uploading to cloud...', card: 'BACKUP PROGRESS', cancel: 'Cancel Backup' },
  restore: { title: 'Restoring...', status: 'Restoring from cloud...', card: 'RESTORE PROGRESS', cancel: 'Cancel Restore' },
};

// Spread the selected restore options evenly across 0–100%.
function restoreStages(options) {
  const keys = Object.keys(RESTORE_LABELS).filter((key) => options[key]);
  return keys.map((key, index) => ({ label: RESTORE_LABELS[key], end: Math.round(((index + 1) / keys.length) * 100) }));
}

function StageRow({ stage, start, percent }) {
  const done = percent >= stage.end;
  const active = !done && percent >= start;

  let statusText = 'Pending';
  if (done) statusText = 'Completed';
  else if (active && stage.files) {
    const doneFiles = Math.round(((percent - start) / (stage.end - start)) * stage.files);
    statusText = `${doneFiles} of ${stage.files} files`;
  } else if (active) statusText = 'In progress';

  return (
    <View style={styles.stageRow}>
      <View style={styles.stageIcon}>
        {done ? (
          <MaterialCommunityIcons name="check-decagram-outline" size={22} color={colors.textSlate} />
        ) : active ? (
          <PermissionsIcon size={22} color={colors.textSlate} dots />
        ) : (
          <Feather name="circle" size={16} color={colors.textSlate} />
        )}
      </View>
      <Text style={[styles.stageLabel, active && styles.stageLabelActive, !done && !active && styles.stageLabelPending]}>{stage.label}</Text>
      <Text style={[styles.stageStatus, done && styles.stageStatusDone]}>{statusText}</Text>
    </View>
  );
}

export default function BackupProgressScreen({ navigation, route }) {
  const mode = route?.params?.mode === 'restore' ? 'restore' : 'backup';
  const restoreOptions = useSelector((state) => state.account.backup.restoreOptions);
  const selectedBackupId = useSelector((state) => state.account.backup.selectedBackupId);
  const dispatch = useDispatch();
  const copy = COPY[mode];
  const stages = React.useMemo(() => (mode === 'restore' ? restoreStages(restoreOptions) : BACKUP_STAGES), [mode, restoreOptions]);

  const { percent, cancel } = useJobProgress({
    start: () => (mode === 'restore' ? backupService.startRestore(selectedBackupId, restoreOptions) : backupService.startBackup()),
    onComplete: () => {
      if (mode === 'backup') {
        const now = new Date();
        dispatch(completeBackup({ dateLabel: formatLongDateTime(now), shortDateLabel: formatShortDateTime(now) }));
      }
      // A finished restore must not leave the Restore backup form underneath.
      if (mode === 'restore') finishFlow(navigation, 'RestoreBackup', 'BackupComplete', { mode });
      else navigation.replace('BackupComplete', { mode });
    },
  });

  const minutesLeft = Math.max(1, Math.ceil(((100 - percent) / 100) * TOTAL_MINUTES));

  return (
    <View style={styles.container}>
      <ScreenHeader large titleStyle={typography.headerMedium} transparent title={copy.title} onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.ringWrap}>
          <ProgressRing percent={percent} />
        </View>
        <Text style={styles.status}>{copy.status}</Text>

        <SettingsCard radiusSize={radius.lg} style={styles.card}>
          <Text style={styles.cardTitle}>{copy.card}</Text>
          {stages.map((stage, index) => (
            <StageRow key={stage.label} stage={stage} start={index === 0 ? 0 : stages[index - 1].end} percent={percent} />
          ))}
        </SettingsCard>

        <View style={styles.remaining}>
          <Feather name="info" size={20} color={colors.textSlate} />
          <Text style={styles.remainingText}>~{minutesLeft} {minutesLeft === 1 ? 'minute' : 'minutes'} remaining</Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.cancel} onPress={() => { cancel(); navigation.goBack(); }} activeOpacity={0.6} accessibilityRole="button">
        <Text style={styles.cancelText}>{copy.cancel}</Text>
      </TouchableOpacity>
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
  },
  ringWrap: {
    alignItems: 'center',
    marginTop: 44,
  },
  status: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    lineHeight: 21,
    color: colors.buttonDark,
    textAlign: 'center',
    marginTop: 22,
  },
  card: {
    marginTop: 38,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 14,
  },
  cardTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: 0.5,
    color: colors.textSlate,
    marginBottom: 10,
  },
  stageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 38,
  },
  stageIcon: {
    width: 22,
    alignItems: 'center',
    marginRight: 14,
  },
  stageLabel: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 15,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  stageLabelActive: {
    fontFamily: fontFamily.semiBold,
    color: colors.buttonDark,
  },
  stageLabelPending: {
    color: colors.textSlate,
  },
  stageStatus: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textSlate,
  },
  stageStatusDone: {
    color: colors.toggleOn,
  },
  remaining: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: 38,
  },
  remainingText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textSlate,
  },
  cancel: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 68,
  },
  cancelText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 17,
    color: colors.errorText,
  },
});
