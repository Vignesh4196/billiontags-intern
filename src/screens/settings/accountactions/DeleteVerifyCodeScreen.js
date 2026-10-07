import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import ScreenHeader from '../../../components/ScreenHeader';
import GradientBackdrop from '../../../components/GradientBackdrop';
import Button from '../../../components/Button';
import { OtpInput } from '../../../components/FormControls';
import { accountService } from '../../../services';
import { colors, spacing, radius, fontFamily, shadow, typography } from '../../../theme';

const CODE_LENGTH = 4;
const RESEND_SECONDS = 24;

function maskPhone(digits) {
  return `+91 ${digits.slice(0, 5)} *****`;
}

export default function DeleteVerifyCodeScreen({ navigation, route }) {
  const phone = route?.params?.phone || '9876543210';
  const requestExport = route?.params?.requestExport ?? true;
  const [code, setCode] = React.useState('');
  const [secondsLeft, setSecondsLeft] = React.useState(route?.params?.resendInSeconds ?? RESEND_SECONDS);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const verify = async () => {
    setLoading(true);
    setError('');
    try {
      await accountService.verifyDeleteOtp(code);
      navigation.navigate('ConfirmDeletion', { requestExport });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (secondsLeft <= 0) return undefined;
    const timer = setTimeout(() => setSecondsLeft((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const resend = async () => {
    setCode('');
    setError('');
    const { resendInSeconds } = await accountService.requestDeleteOtp(phone);
    setSecondsLeft(resendInSeconds ?? RESEND_SECONDS);
  };

  return (
    <View style={styles.container}>
      <GradientBackdrop />
      <ScreenHeader large transparent titleStyle={typography.headerStep} title="Step 2 of 3" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Verify code</Text>
        <Text style={styles.subtitle}>Please enter the 4-digit verification code sent to</Text>

        <View style={styles.phonePill}>
          <Text style={styles.phoneText}>{maskPhone(phone)}</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={8} accessibilityRole="button">
            <Text style={styles.edit}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.otp}>
          <OtpInput length={CODE_LENGTH} value={code} onChange={setCode} />
        </View>

        {!!error && <Text style={styles.error}>{error}</Text>}

        <View style={styles.resendRow}>
          <Text style={styles.resendHint}>Didn't receive code? </Text>
          {secondsLeft > 0 ? (
            <Text style={styles.resendStrong}>Resend in {secondsLeft}s</Text>
          ) : (
            <TouchableOpacity onPress={resend} accessibilityRole="button">
              <Text style={[styles.resendStrong, styles.resendLink]}>Resend code</Text>
            </TouchableOpacity>
          )}
        </View>

        <Button
          title="Verify & proceed"
          pill
          disabled={code.length < CODE_LENGTH}
          loading={loading}
          onPress={verify}
          style={styles.button}
          textStyle={styles.buttonText}
        />
        <Text style={styles.footnote}>Secure end-to-end phone verification</Text>
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
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 32,
    lineHeight: 40,
    color: colors.textPrimary,
    marginTop: 14,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 15,
    lineHeight: 20,
    color: colors.textFaint,
    textAlign: 'center',
    marginTop: 10,
  },
  phonePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 34,
    paddingHorizontal: 16,
    borderRadius: 17,
    backgroundColor: colors.white,
    marginTop: 34,
    ...shadow.cardSoft,
  },
  phoneText: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    color: colors.textPrimary,
  },
  edit: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.otpBlue,
  },
  otp: {
    marginTop: 34,
  },
  error: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: colors.deleteRed,
    marginTop: 16,
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 36,
  },
  resendHint: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: colors.textFaint,
  },
  resendStrong: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.textPrimary,
  },
  resendLink: {
    color: colors.otpBlue,
  },
  button: {
    alignSelf: 'stretch',
    height: 64,
    borderRadius: radius.pill,
    marginTop: 34,
  },
  buttonText: {
    fontSize: 18,
  },
  footnote: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 36,
  },
});
