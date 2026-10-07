import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import ScreenHeader from '../../../components/ScreenHeader';
import Button from '../../../components/Button';
import { resetToLogin } from '../../../navigation/helpers';
import { colors, radius, fontFamily, typography } from '../../../theme';

const illustration = require('../../../assets/images/account-deleted-illustration.png');

export default function AccountDeletedScreen({ navigation }) {
  const returnHome = () => resetToLogin(navigation, 'deleted');

  return (
    <View style={styles.container}>
      <ScreenHeader large titleStyle={typography.headerSemi} title="Account deleted" onBack={returnHome} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Image source={illustration} style={styles.illustration} resizeMode="contain" accessibilityLabel="Woman sitting next to a bin of deleted memories" />
        <Text style={styles.title}>Farewell from Haven</Text>
        <Text style={styles.body}>
          Your account has been deleted, and your personal data has been completely wiped from our encrypted server infrastructure. Thank you for sharing space in Haven.
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Return to Home" pill onPress={returnHome} style={styles.button} textStyle={styles.buttonText} />
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
    paddingBottom: 24,
    alignItems: 'center',
  },
  illustration: {
    width: 292,
    height: 206,
    marginTop: 102,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 26,
    lineHeight: 33,
    color: colors.textPrimary,
    marginTop: 46,
  },
  body: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 14,
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
