import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import Button from '../../../components/Button';
import { colors, spacing, radius, fontFamily, typography } from '../../../theme';

const illustration = require('../../../assets/images/disconnect-partner-illustration.png');

const LOSSES = [
  'Shared notes, diaries, & drawings',
  'Upcoming trip plans & custom calendars',
  'Real-time mood & location sharing',
];

export default function DisconnectWarningScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScreenHeader large transparent titleStyle={typography.headerMedium} title="Account settings" onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <Image source={illustration} style={styles.illustration} resizeMode="contain" accessibilityLabel="Couple sitting back to back with a broken link" />
        <Text style={styles.title}>Disconnect partner?</Text>
        <Text style={styles.body}>Disconnecting will immediately end shared access to your SuperBae space for both of you.</Text>

        <SettingsCard radiusSize={radius.lg} style={styles.card}>
          <Text style={styles.cardTitle}>What you both lose access to:</Text>
          {LOSSES.map((item) => (
            <View key={item} style={styles.lossRow}>
              <Ionicons name="close" size={18} color={colors.alertRed} />
              <Text style={styles.lossText}>{item}</Text>
            </View>
          ))}
        </SettingsCard>

        <Button
          title="I understand, continue"
          pill
          onPress={() => navigation.navigate('DisconnectVerify')}
          style={[styles.button, styles.continueButton]}
          textStyle={styles.continueText}
        />
        <Button
          title="Keep connected"
          variant="outline"
          pill
          onPress={() => navigation.goBack()}
          style={[styles.button, styles.keepButton]}
          textStyle={styles.keepText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenMuted,
  },
  // No scrolling: the illustration shrinks (flexShrink) on short screens so everything fits.
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
  },
  illustration: {
    width: 367,
    maxWidth: '100%',
    height: 248,
    flexShrink: 1,
    marginTop: 24,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    lineHeight: 28,
    color: colors.textPrimary,
    marginTop: 24,
  },
  body: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 20,
  },
  card: {
    alignSelf: 'stretch',
    marginHorizontal: -4,
    marginTop: 22,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  cardTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  lossRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  lossText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.textMuted,
  },
  button: {
    alignSelf: 'stretch',
    borderRadius: radius.pill,
  },
  continueButton: {
    height: 64,
    marginTop: 20,
    backgroundColor: colors.alertRed,
    borderColor: colors.alertRed,
  },
  continueText: {
    fontFamily: fontFamily.medium,
    fontSize: 18,
  },
  keepButton: {
    height: 56,
    marginTop: 12,
    borderColor: colors.textPrimary,
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  keepText: {
    fontFamily: fontFamily.medium,
    fontSize: 18,
  },
});
