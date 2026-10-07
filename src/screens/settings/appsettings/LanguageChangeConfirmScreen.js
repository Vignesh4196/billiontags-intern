import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import SettingsRow from '../../../components/SettingsRow';
import Button from '../../../components/Button';
import { setLanguage } from '../../../state/settingsSlice';
import { settingsService } from '../../../services';
import { colors, spacing, typography } from '../../../theme';

export default function LanguageChangeConfirmScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const language = route?.params?.language || { name: 'English (US)', subtitle: 'English' };

  const [saving, setSaving] = React.useState(false);

  const handleConfirm = async () => {
    setSaving(true);
    try {
      await settingsService.setLanguage(language.name);
      dispatch(setLanguage(language.name));
      navigation.goBack();
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Change language" onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <SettingsCard noPadding style={styles.card}>
          <SettingsRow
            iconName="globe-outline"
            title={`Switch to ${language.name}`}
            subtitle="System translation update"
            showChevron={false}
          />
          <Text style={styles.paragraph}>
            Changing your application language requires an immediate restart to download updated
            localization bundles. This will take up to 10 seconds.
          </Text>
        </SettingsCard>

        <View style={styles.spacer} />

        <Button title="Confirm" variant="primary" loading={saving} onPress={handleConfirm} pill style={styles.gap} />
        <Button title="Cancel" variant="outline" onPress={() => navigation.goBack()} pill />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceMuted,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: 34,
  },
  card: {
    overflow: 'hidden',
  },
  paragraph: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    padding: spacing.lg,
  },
  spacer: {
    flex: 1,
  },
  gap: {
    marginBottom: spacing.md,
  },
});
