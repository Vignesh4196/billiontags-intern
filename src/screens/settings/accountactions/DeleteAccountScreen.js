import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import Toggle from '../../../components/Toggle';
import Button from '../../../components/Button';
import { accountService } from '../../../services';
import { colors, spacing, radius, fontFamily, shadow, typography } from '../../../theme';

const digitsOnly = (value) => value.replace(/\D/g, '');

export default function DeleteAccountScreen({ navigation }) {
  const accountPhone = useSelector((state) => state.settings.myProfile.phone);
  const accountDigits = digitsOnly(accountPhone).slice(-10);
  const [phone, setPhone] = React.useState('');
  const [requestExport, setRequestExport] = React.useState(true);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const verify = async () => {
    if (digitsOnly(phone) !== accountDigits) {
      setError(`This number doesn't match the one on your account (ending in ${accountDigits.slice(-4)}).`);
      return;
    }
    setError('');
    setLoading(true);
    try {
      const { resendInSeconds } = await accountService.requestDeleteOtp(digitsOnly(phone));
      navigation.navigate('DeleteVerifyCode', { phone: digitsOnly(phone), requestExport, resendInSeconds });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader large titleStyle={typography.headerMedium} title="Delete account" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Identity verification</Text>
        <Text style={styles.body}>
          To permanently delete your Haven account and <Text style={styles.underline}>all associated data,</Text> verify your identity using the phone number linked to your account ending in {accountDigits.slice(-4)}. This action cannot be undone.
        </Text>

        <Text style={styles.label}>Enter Phone number</Text>
        <View style={[styles.phoneField, !!error && styles.phoneFieldError]}>
          <Text style={styles.prefix}>+91  |  </Text>
          <TextInput
            value={phone}
            onChangeText={(text) => { setPhone(digitsOnly(text).slice(0, 10)); setError(''); }}
            placeholder="9876543210"
            placeholderTextColor={colors.textFaint}
            keyboardType="phone-pad"
            maxLength={10}
            style={styles.phoneInput}
            returnKeyType="done"
            onSubmitEditing={verify}
          />
        </View>
        {!!error && <Text style={styles.error}>{error}</Text>}

        <SettingsCard radiusSize={radius.lg} style={styles.exportCard}>
          <View style={styles.flex}>
            <Text style={styles.exportTitle}>Request data export</Text>
            <Text style={styles.exportDescription}>
              Download a fully encrypted ZIP archive of your logs, wardrobe items, and diary before erasure.
            </Text>
          </View>
          <Toggle value={requestExport} onValueChange={setRequestExport} />
        </SettingsCard>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Verify & continue"
          pill
          disabled={digitsOnly(phone).length < 10}
          loading={loading}
          onPress={verify}
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
    paddingTop: 22,
    paddingBottom: 24,
  },
  flex: {
    flex: 1,
  },
  heading: {
    fontFamily: fontFamily.semiBold,
    fontSize: 17,
    lineHeight: 22,
    color: colors.fieldLabel,
  },
  body: {
    fontFamily: fontFamily.regular,
    fontSize: 15,
    lineHeight: 21,
    color: colors.textMuted,
    marginTop: 6,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  label: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    lineHeight: 21,
    color: colors.textSecondary,
    marginTop: 30,
    marginBottom: 10,
  },
  phoneField: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    ...shadow.cardSoft,
  },
  phoneFieldError: {
    borderColor: colors.deleteRed,
  },
  prefix: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.textPrimary,
  },
  phoneInput: {
    flex: 1,
    outlineStyle: 'none',
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.textPrimary,
    padding: 0,
  },
  error: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.deleteRed,
    marginTop: 8,
    paddingHorizontal: 4,
  },
  exportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 20,
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
    shadowOpacity: 0,
    elevation: 0,
  },
  exportTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  exportDescription: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 17,
    color: colors.textMuted,
    marginTop: 4,
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
