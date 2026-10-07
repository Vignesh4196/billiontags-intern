import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ScreenHeader from '../../../components/ScreenHeader';
import Button from '../../../components/Button';
import { Banner, PhraseInput } from '../../../components/FormControls';
import { DEACTIVATE_PHRASE, isDeactivatePhrase, showDeactivated } from './DeactivateWorkspaceScreen';
import { accountService } from '../../../services';
import { colors, spacing, radius, fontFamily, typography } from '../../../theme';

export default function SuspensionFailedScreen({ navigation, route }) {
  const [phrase, setPhrase] = React.useState(route?.params?.attempt || '');
  const [attempts, setAttempts] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const retry = async () => {
    if (loading) return;
    if (!isDeactivatePhrase(phrase)) {
      setAttempts((count) => count + 1);
      return;
    }
    setLoading(true);
    try {
      await accountService.deactivateWorkspace(DEACTIVATE_PHRASE);
      showDeactivated(navigation);
    } catch (e) {
      setAttempts((count) => count + 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader large titleStyle={typography.headerSmall} title="Suspension failed" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Banner
          tone="error"
          title="Verification mismatched"
          message={attempts > 1
            ? `Still not matching (attempt ${attempts}). Type the word "${DEACTIVATE_PHRASE}".`
            : 'The confirmation phrase you entered does not match. Please verify the spelling.'}
          style={styles.banner}
          messageStyle={styles.bannerMessage}
        />

        <PhraseInput
          label={`Type "${DEACTIVATE_PHRASE}" again to verify`}
          value={phrase}
          onChangeText={setPhrase}
          tone="error"
          autoFocus
          returnKeyType="done"
          onSubmitEditing={retry}
          style={styles.input}
        />

        <Text style={styles.helper}>
          • Input is case-sensitive. • Check that your internet connection is stable before retrying. • Contact administrator if the lock persists.
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Retry suspension" variant="destructive" pill loading={loading} onPress={retry} style={styles.button} textStyle={styles.buttonText} />
        <Button
          title="Cancel & go back"
          variant="outline"
          pill
          onPress={() => navigation.goBack()}
          style={[styles.button, styles.cancelButton]}
          textStyle={[styles.buttonText, styles.cancelText]}
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
  bannerMessage: {
    fontSize: 13,
    lineHeight: 18,
  },
  banner: {
    paddingVertical: 18,
  },
  input: {
    marginTop: 24,
  },
  helper: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textMuted,
    marginTop: 22,
    paddingHorizontal: 4,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 32,
    gap: 12,
  },
  button: {
    height: 64,
    borderRadius: radius.pill,
  },
  cancelButton: {
    borderColor: colors.borderInput,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    fontSize: 18,
  },
  cancelText: {
    color: colors.textMuted,
  },
});
