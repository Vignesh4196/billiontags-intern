import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ScreenHeader from '../../../components/ScreenHeader';
import Button from '../../../components/Button';
import { Banner, PhraseInput } from '../../../components/FormControls';
import { accountService } from '../../../services';
import { colors, radius, fontFamily, typography } from '../../../theme';

const DELETE_PHRASE = 'delete';

const CONSEQUENCES = [
  "Your profile is immediately disconnected from your partner's workspace.",
  "All stored journal memories, wardrobe scans, and private chats will be wiped from Haven's databases.",
  'This action cannot be reversed under any circumstances.',
];

export default function ConfirmDeletionScreen({ navigation, route }) {
  const [phrase, setPhrase] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  // Case-sensitive, same as the deactivate phrase.
  const matches = phrase.trim() === DELETE_PHRASE;

  const deleteAccount = async () => {
    if (!matches || loading) return;
    setLoading(true);
    try {
      await accountService.deleteAccount({ confirmPhrase: DELETE_PHRASE, requestExport: route?.params?.requestExport ?? true });
      navigation.reset({ index: 0, routes: [{ name: 'AccountDeleted' }] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader large titleStyle={typography.headerMedium} title="Confirm deletion" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Banner tone="delete" title="Warning: this action is permanent" style={styles.banner} />

        <Text style={styles.heading}>What happens when your account is deleted:</Text>
        <View style={styles.list}>
          {CONSEQUENCES.map((item) => (
            <Text key={item} style={styles.listItem}>• {item}</Text>
          ))}
        </View>

        <PhraseInput
          label={`Type "${DELETE_PHRASE}" to confirm`}
          value={phrase}
          onChangeText={setPhrase}
          placeholder="Delete"
          tone="delete"
          returnKeyType="done"
          onSubmitEditing={deleteAccount}
          style={styles.input}
        />
        {!!phrase && !matches && (
          <Text style={styles.mismatch}>Type "{DELETE_PHRASE}" exactly, in lowercase.</Text>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Permanently delete account"
          variant="deleteRed"
          pill
          disabled={!matches}
          loading={loading}
          onPress={deleteAccount}
          style={styles.button}
          textStyle={styles.buttonText}
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
    paddingHorizontal: 24,
    paddingTop: 15,
    paddingBottom: 24,
  },
  banner: {
    borderRadius: radius.md,
    paddingVertical: 15,
  },
  heading: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    lineHeight: 20,
    color: colors.textPrimary,
    marginTop: 26,
  },
  list: {
    marginTop: 12,
  },
  listItem: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textMuted,
  },
  input: {
    marginTop: 26,
  },
  mismatch: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.deleteRed,
    marginTop: 8,
    paddingHorizontal: 4,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  button: {
    height: 64,
    borderRadius: radius.pill,
  },
  buttonText: {
    fontSize: 18,
  },
});
