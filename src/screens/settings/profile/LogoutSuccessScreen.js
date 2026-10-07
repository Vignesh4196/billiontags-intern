import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { resetToLogin } from '../../../navigation/helpers';
import BackArrowIcon from '../../../components/icons/BackArrowIcon';
import { colors, fontFamily } from '../../../theme';

const illustration = require('../../../assets/images/logout-success-illustration.png');

export default function LogoutSuccessScreen({ navigation }) {
  // Signed out: there's nothing to go back to, so every exit lands on Login.
  const signIn = () => resetToLogin(navigation, 'loggedOut');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.side} onPress={signIn} accessibilityLabel="Go back">
          <BackArrowIcon size={36} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Session ended</Text>
        <View style={styles.side} />
      </View>

      <View style={styles.content}>
        <Image source={illustration} style={styles.illustration} resizeMode="contain" accessibilityLabel="Person waving goodbye" />
        <Text style={styles.title}>You've been signed out</Text>
        <Text style={styles.description}>For your privacy, cached credentials have been deleted. You can safely hand off your device.</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={signIn} activeOpacity={0.85}>
        <Text style={styles.buttonText}>Sign in again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingHorizontal: 22, paddingBottom: 28 },
  header: { height: 76, marginHorizontal: -2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  side: { width: 30, alignItems: 'center' },
  headerTitle: { color: colors.textHeading, fontFamily: fontFamily.semiBold, fontSize: 22 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 48 },
  illustration: { width: 265, height: 250, marginBottom: 30 },
  title: { color: colors.textHeading, fontFamily: fontFamily.bold, fontSize: 27, textAlign: 'center', marginBottom: 12 },
  description: { color: colors.textSecondary, fontFamily: fontFamily.regular, fontSize: 15, lineHeight: 22, textAlign: 'center', maxWidth: 385 },
  button: { height: 64, borderRadius: 32, backgroundColor: colors.tabActive, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: colors.white, fontFamily: fontFamily.semiBold, fontSize: 17 },
});
