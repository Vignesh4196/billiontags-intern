import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ScreenHeader from '../../../components/ScreenHeader';
import Button from '../../../components/Button';
import { colors, spacing, radius, fontFamily, typography } from '../../../theme';

const PHRASE = 'disconnect';

// Accepts the exact lowercase word "disconnect" (case-sensitive) or a 6-digit secure code.
function isValidConfirmation(value) {
  const text = value.trim();
  return text === PHRASE || /^\d{6}$/.test(text);
}

export default function DisconnectVerifyScreen({ navigation }) {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');

  const verify = async () => {
    if (!isValidConfirmation(value)) {
      setError(`Type "${PHRASE}" or your 6-digit secure code to continue.`);
      return;
    }
    setError('');
    // Nothing is disconnected yet: that happens on Delete sync data, so back there aborts the whole flow.
    navigation.navigate('DeleteSyncData', { confirmCode: value.trim() });
  };

  return (
    <View style={styles.container}>
      <ScreenHeader large transparent titleStyle={typography.headerMedium} title="Secure verification" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Enter secure code</Text>
        <Text style={styles.body}>
          To confirm disconnection, type the word <Text style={styles.phrase}>“{PHRASE}”</Text> or enter your secure verification code below.
        </Text>

        <TextInput
          value={value}
          onChangeText={(text) => { setValue(text); setError(''); }}
          placeholder="disconnect"
          placeholderTextColor={colors.textFaint}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
          onSubmitEditing={verify}
          style={[styles.input, !!error && styles.inputError]}
        />
        {!!error && <Text style={styles.error}>{error}</Text>}

        <View style={styles.banner}>
          <Feather name="info" size={20} color={colors.alertRed} />
          <Text style={styles.bannerText}>Your partner will be notified instantly. This action cannot be undone.</Text>
        </View>

        <Button
          title="Verify & continue"
          pill
          disabled={!value.trim()}
          onPress={verify}
          style={styles.button}
          textStyle={styles.buttonText}
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
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 32,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    lineHeight: 28,
    color: colors.textPrimary,
  },
  body: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textMuted,
    marginTop: 8,
  },
  phrase: {
    fontFamily: fontFamily.bold,
    color: colors.alertRed,
  },
  input: {
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.progressTrack,
    backgroundColor: colors.infoBackground,
    paddingHorizontal: spacing.lg,
    fontFamily: fontFamily.regular,
    fontSize: 15,
    color: colors.textPrimary,
    marginTop: 26,
    outlineStyle: 'none',
  },
  inputError: {
    borderColor: colors.alertRed,
  },
  error: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.alertRed,
    marginTop: 6,
    paddingHorizontal: 4,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    borderRadius: radius.sm,
    backgroundColor: colors.alertRedSoft,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginTop: 24,
  },
  bannerText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.alertRed,
  },
  button: {
    height: 64,
    borderRadius: radius.pill,
    marginTop: 24,
    backgroundColor: colors.alertRed,
    borderColor: colors.alertRed,
  },
  buttonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
  },
});
