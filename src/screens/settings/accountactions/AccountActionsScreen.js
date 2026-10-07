import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DatabaseBackupIcon from '../../../components/icons/DatabaseBackupIcon';
import DatabaseExportIcon from '../../../components/icons/DatabaseExportIcon';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import SettingsRow from '../../../components/SettingsRow';
import { colors, spacing, radius, fontFamily } from '../../../theme';

const SystemBackupIcon = ({ size }) => <DatabaseBackupIcon size={size} color={colors.tabActive} />;
const DataExportIcon = ({ size }) => <DatabaseExportIcon size={size} color={colors.tabActive} />;

function DangerRow({ title, subtitle, onPress, tone = 'default', showBorder = true }) {
  const isDelete = tone === 'delete';
  return (
    <TouchableOpacity style={[styles.dangerRow, showBorder && styles.rowBorder]} onPress={onPress} activeOpacity={0.6} accessibilityRole="button">
      <View style={styles.dangerText}>
        <Text style={[styles.dangerTitle, isDelete && styles.deleteTitle]}>{title}</Text>
        <Text style={[styles.dangerSubtitle, tone !== 'muted' && styles.dangerSubtitleDark]}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={isDelete ? colors.deleteRed : colors.textPrimary} />
    </TouchableOpacity>
  );
}

export default function AccountActionsScreen({ navigation }) {
  const goTo = (screen) => () => navigation.navigate(screen);

  return (
    <View style={styles.container}>
      <ScreenHeader large title="Account actions" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SettingsCard noPadding radiusSize={radius.xl} style={styles.card}>
          <Text style={styles.cardTitle}>Backups</Text>
          <SettingsRow
            IconComponent={SystemBackupIcon}
            title="System backup"
            subtitle="Your data, safely backed up."
            onPress={goTo('SystemBackup')}
            showChevron={false}
          />
          <SettingsRow
            IconComponent={DataExportIcon}
            title="Data export"
            subtitle="Take your data with you, anytime."
            onPress={goTo('DataExport')}
            showChevron={false}
            showBorder={false}
          />
        </SettingsCard>

        <SettingsCard noPadding radiusSize={radius.xl} style={styles.card}>
          <Text style={[styles.cardTitle, styles.dangerZoneTitle]}>Danger zone</Text>
          <DangerRow tone="muted" title="Deactivate workspace" subtitle="Temporary pause profile security" onPress={goTo('DeactivateWorkspace')} />
          <DangerRow tone="delete" title="Delete account" subtitle="Permanently remove your account from data" onPress={goTo('DeleteAccount')} />
          <DangerRow title="Logout" subtitle="Log out of this device" onPress={goTo('LogoutConfirm')} showBorder={false} />
        </SettingsCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: 22,
    paddingBottom: 40,
    gap: 15,
  },
  card: {
    overflow: 'hidden',
  },
  cardTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 20,
    lineHeight: 26,
    color: colors.textPrimary,
    paddingHorizontal: 22,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderRow,
  },
  dangerZoneTitle: {
    color: colors.deleteRed,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderRow,
  },
  dangerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 21,
    paddingRight: 24,
    paddingVertical: 18,
    gap: spacing.md,
  },
  dangerText: {
    flex: 1,
  },
  dangerTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 21,
    color: colors.textPrimary,
  },
  deleteTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    lineHeight: 21,
    color: colors.deleteRed,
  },
  dangerSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textMuted,
    marginTop: 4,
  },
  dangerSubtitleDark: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.textPrimary,
    marginTop: 2,
  },
});
