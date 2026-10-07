import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import Button from '../../../components/Button';
import { RadioDot } from '../../../components/FormControls';
import { setArchiveOption } from '../../../state/accountSlice';
import { accountService } from '../../../services';
import { resetToLogin } from '../../../navigation/helpers';
import { colors, spacing, radius, fontFamily, typography } from '../../../theme';

const ARCHIVE_OPTIONS = [
  { key: 'coldStorage', title: 'Keep cold storage backup', description: 'Retain files securely for up to 1 year' },
  { key: 'databaseLogs', title: 'Download database logs', description: 'Export structured logs as a JSON bundle' },
  { key: 'hardDelete', title: 'Immediate hard deletion', description: 'Purge all data permanently without the 30-day window' },
];

export default function WorkspaceDeactivatedScreen({ navigation }) {
  const archiveOption = useSelector((state) => state.account.deactivation.archiveOption);
  const dispatch = useDispatch();
  const [saving, setSaving] = React.useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await accountService.saveArchivePreference(archiveOption);
      // The user may have left while saving; replace() would swap whatever is on screen now.
      if (navigation.isFocused()) navigation.replace('WorkspaceSuspended');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader large titleStyle={typography.headerSmall} title="Workspace deactivated" onBack={() => resetToLogin(navigation, 'deactivated')} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>Status: Offline</Text>
          <Text style={styles.statusMessage}>
            The workspace is now suspended. To finalize your archive preferences, please select an option below.
          </Text>
        </View>

        <SettingsCard noPadding radiusSize={radius.xl} style={styles.optionsCard}>
          {ARCHIVE_OPTIONS.map(({ key, title, description }, index) => {
            const selected = archiveOption === key;
            return (
              <TouchableOpacity
                key={key}
                style={[styles.optionRow, index < ARCHIVE_OPTIONS.length - 1 && styles.rowBorder]}
                onPress={() => dispatch(setArchiveOption(key))}
                activeOpacity={0.6}
                accessibilityRole="radio"
                accessibilityState={{ checked: selected }}
              >
                <RadioDot selected={selected} size={23} idleColor={colors.borderInput} />
                <View style={styles.flex}>
                  <Text style={styles.optionTitle}>{title}</Text>
                  <Text style={styles.optionDescription}>{description}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </SettingsCard>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Save"
          pill
          disabled={!archiveOption}
          loading={saving}
          onPress={save}
          style={styles.saveButton}
          textStyle={styles.saveText}
        />
      </View>
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
    paddingTop: 10,
    paddingBottom: 24,
  },
  flex: {
    flex: 1,
  },
  statusCard: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.progressTrack,
    backgroundColor: colors.screenMuted,
    paddingHorizontal: spacing.lg,
    paddingVertical: 18,
  },
  statusTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textPrimary,
  },
  statusMessage: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 17,
    color: colors.textMuted,
    marginTop: 10,
  },
  optionsCard: {
    marginTop: 20,
    overflow: 'hidden',
    shadowOpacity: 0,
    elevation: 0,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderRow,
  },
  optionTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    lineHeight: 21,
    color: colors.textPrimary,
  },
  optionDescription: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 17,
    color: colors.textMuted,
    marginTop: 3,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 32,
  },
  saveButton: {
    height: 64,
    borderRadius: radius.pill,
  },
  saveText: {
    fontSize: 18,
  },
});
