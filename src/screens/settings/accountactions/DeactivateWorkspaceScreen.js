import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import DatabaseDisableIcon from '../../../components/icons/DatabaseDisableIcon';
import LockIcon from '../../../components/icons/LockIcon';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import Button from '../../../components/Button';
import { Banner, PhraseInput } from '../../../components/FormControls';
import { accountService } from '../../../services';
import { colors, spacing, radius, fontFamily, typography } from '../../../theme';

export const DEACTIVATE_PHRASE = 'deactivate';

// Case-sensitive: only the exact lowercase word matches. Anything else goes to Suspension failed.
export const isDeactivatePhrase = (value) => value.trim() === DEACTIVATE_PHRASE;

// Deactivation went through: leave only the archive step, with no way back to the form.
export const showDeactivated = (navigation) => navigation.reset({ index: 0, routes: [{ name: 'WorkspaceDeactivated' }] });

const IMPACTS = [
  { key: 'db', Icon: DatabaseDisableIcon, title: 'Database preservation', description: 'All project logs remain locked for 30 days' },
  { key: 'invites', Icon: LockIcon, title: 'Active invites', description: 'Pending connections will be instantly terminated' },
];

export default function DeactivateWorkspaceScreen({ navigation }) {
  const [phrase, setPhrase] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const confirm = async () => {
    // The keyboard's Done key bypasses the disabled button, so guard here too.
    if (!phrase.trim() || loading) return;
    if (!isDeactivatePhrase(phrase)) {
      navigation.navigate('SuspensionFailed', { attempt: phrase });
      return;
    }
    setLoading(true);
    try {
      await accountService.deactivateWorkspace(DEACTIVATE_PHRASE);
      showDeactivated(navigation);
    } catch (e) {
      navigation.navigate('SuspensionFailed', { attempt: phrase });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader large titleStyle={typography.headerSmall} title="Deactivate workspace" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text style={styles.intro}>
          This action suspends active services, restricts shared partner connections, and pauses local signatures.
        </Text>

        <SettingsCard noPadding radiusSize={radius.lg} style={styles.card}>
          {IMPACTS.map(({ key, Icon, title, description }, index) => (
            <View key={key} style={[styles.impactRow, index === 0 && styles.rowBorder]}>
              <Icon size={24} color={colors.tabActive} />
              <View style={styles.flex}>
                <Text style={styles.impactTitle}>{title}</Text>
                <Text style={styles.impactDescription}>{description}</Text>
              </View>
            </View>
          ))}
        </SettingsCard>

        <Banner
          tone="error"
          title="Irreversible danger"
          message="Please type your confirm phrase below to proceed with workspace suspension."
          style={styles.banner}
          messageStyle={styles.bannerMessage}
        />

        <PhraseInput
          label={`Type "${DEACTIVATE_PHRASE}"`}
          value={phrase}
          onChangeText={setPhrase}
          placeholder={DEACTIVATE_PHRASE}
          returnKeyType="done"
          onSubmitEditing={confirm}
          style={styles.input}
        />

        <Button
          title="Confirm suspension"
          variant="destructive"
          pill
          disabled={!phrase.trim()}
          loading={loading}
          onPress={confirm}
          style={styles.confirmButton}
          textStyle={styles.buttonText}
        />
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
    paddingTop: 12,
    paddingBottom: 40,
  },
  flex: {
    flex: 1,
  },
  intro: {
    fontFamily: fontFamily.regular,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
  },
  card: {
    marginTop: 20,
    overflow: 'hidden',
    shadowOpacity: 0,
    elevation: 0,
  },
  impactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderRow,
  },
  impactTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    lineHeight: 21,
    color: colors.textPrimary,
  },
  impactDescription: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 17,
    color: colors.textMuted,
    marginTop: 2,
  },
  bannerMessage: {
    fontSize: 13,
    lineHeight: 18,
  },
  banner: {
    marginTop: 20,
    paddingVertical: 18,
  },
  input: {
    marginTop: 24,
  },
  confirmButton: {
    height: 64,
    borderRadius: radius.pill,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
  },
});
