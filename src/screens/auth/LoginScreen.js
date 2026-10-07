import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LogoSuperbae from '../../components/icons/LogoSuperbae';
import Button from '../../components/Button';
import { colors, spacing, radius, fontFamily } from '../../theme';

// Placeholder until the auth module is designed/built. Account deletion,
// workspace deactivation and logout reset the stack to this screen.
export default function LoginScreen({ navigation, route }) {
  const reason = route?.params?.reason;
  const message = {
    deleted: 'Your account has been deleted.',
    deactivated: 'Your workspace is deactivated. Sign in within 30 days to restore it.',
    loggedOut: 'You have been signed out.',
  }[reason];

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <LogoSuperbae width={120} height={61} />
        <Text style={styles.title}>Welcome back</Text>
        {!!message && <Text style={styles.message}>{message}</Text>}
        <Text style={styles.note}>Login screen placeholder — the auth flow is not built yet.</Text>
      </View>
      <Button
        title="Sign in"
        pill
        onPress={() => navigation.reset({ index: 0, routes: [{ name: 'MainSettings' }] })}
        style={styles.button}
        textStyle={styles.buttonText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.xl,
    paddingBottom: 32,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 26,
    color: colors.textPrimary,
    marginTop: spacing.xl,
  },
  message: {
    fontFamily: fontFamily.regular,
    fontSize: 15,
    lineHeight: 21,
    color: colors.textMuted,
    textAlign: 'center',
  },
  note: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.textFaint,
    textAlign: 'center',
  },
  button: {
    height: 64,
    borderRadius: radius.pill,
  },
  buttonText: {
    fontSize: 18,
  },
});
