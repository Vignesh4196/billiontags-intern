import React from 'react';
import { View, Text, ScrollView, StyleSheet, Linking, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import SettingsRow from '../../../components/SettingsRow';
import Button from '../../../components/Button';
import { setPermissions } from '../../../state/settingsSlice';
import { settingsService } from '../../../services';
import { colors, spacing, radius, fontFamily, shadow } from '../../../theme';

const PERMISSION_ROWS = [
  {
    key: 'notifications',
    iconName: 'notifications-outline',
    title: 'Notifications',
    subtitle: 'Get alerts about new updates, reminders, and activity',
  },
  {
    key: 'location',
    iconName: 'navigate-outline',
    title: 'Location',
    subtitle: 'Find nearby places, regional stats, and mapping services',
  },
  {
    key: 'camera',
    iconName: 'camera-outline',
    title: 'Camera',
    subtitle: 'Scan QR codes and take photos directly within the app',
  },
  {
    key: 'microphone',
    iconName: 'mic-outline',
    title: 'Microphone',
    subtitle: 'Record voice memos and activate hands-free commands',
  },
  {
    key: 'contacts',
    iconName: 'people-outline',
    title: 'Contacts',
    subtitle: 'Sync your address book to easily discover and invite colleagues',
  },
];

export default function PermissionsScreen({ navigation }) {
  const savedPermissions = useSelector((state) => state.settings.permissions);
  const dispatch = useDispatch();
  // Edits stay local until Save so they can be sent to the backend in one request.
  const [permissions, setDraft] = React.useState(savedPermissions);
  const [saving, setSaving] = React.useState(false);

  const save = async () => {
    setSaving(true);
    try {
      const saved = await settingsService.savePermissions(permissions);
      dispatch(setPermissions(saved));
      navigation.goBack();
    } finally {
      setSaving(false);
    }
  };

  const openSystemSettings = () => {
    if (Platform.OS === 'web') {
      // Browsers do not let a page open their settings, so tell the user where to find them.
      window.alert('Your browser does not allow opening its settings from a page.\n\nClick the lock icon beside the address bar, then choose Site settings to manage permissions for this app.');
      return;
    }
    Linking.openSettings().catch(() => Alert.alert('System settings', 'Open your device Settings and find this app to manage permissions.'));
  };

  return (
    <View style={styles.container}>
      <ScreenHeader large title="Permissions" onBack={() => navigation.goBack()} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionLabel}>Customize experience</Text>
        <Text style={styles.sectionParagraph}>
          Choose what access you would like to grant to help our features function smoothly. You can
          update these anytime in your system settings.
        </Text>

        <SettingsCard noPadding style={styles.card}>
          {PERMISSION_ROWS.map((row, i) => (
            <SettingsRow
              key={row.key}
              iconName={row.iconName}
              title={row.title}
              subtitle={row.subtitle}
              toggleValue={permissions[row.key]}
              onToggleChange={(value) => setDraft((current) => ({ ...current, [row.key]: value }))}
              iconRound
              showBorder={i < PERMISSION_ROWS.length - 1}
            />
          ))}
        </SettingsCard>

        <View style={styles.privacyCard}>
          <View style={styles.privacyIconBg}>
            <Ionicons name="lock-closed-outline" size={18} color={colors.textPrimary} />
          </View>
          <Text style={styles.privacyText}>
            <Text style={styles.privacyBold}>Privacy commitment: </Text>
            your details are fully encrypted and kept secure. We never share or sell personal
            information to third parties.
          </Text>
        </View>

        <Text style={styles.systemLink} onPress={openSystemSettings} accessibilityRole="link">Manage in System Settings</Text>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Button title="Save" variant="primary" loading={saving} onPress={save} pill style={styles.saveButton} textStyle={styles.saveText} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenMuted,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  sectionLabel: {
    fontFamily: fontFamily.semiBold,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 18,
  },
  sectionParagraph: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.textMuted,
    lineHeight: 22,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  card: {
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  privacyCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadow.cardSoft,
  },
  privacyIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.iconBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  privacyText: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 19,
    flex: 1,
  },
  privacyBold: {
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },
  systemLink: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.textBody,
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: 22,
  },
  bottomBar: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: 26,
    backgroundColor: colors.white,
  },
  saveButton: {
    height: 64,
    borderRadius: radius.pill,
  },
  saveText: {
    fontSize: 18,
  },
});
