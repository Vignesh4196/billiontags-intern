import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import SuccessTick from '../../../components/SuccessTick';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import Button from '../../../components/Button';
import { resetToLogin } from '../../../navigation/helpers';
import { colors, spacing, radius, fontFamily, typography } from '../../../theme';

export default function WorkspaceSuspendedScreen({ navigation }) {
  // The workspace is offline now, so the user is signed out.
  const finish = () => resetToLogin(navigation, 'deactivated');

  return (
    <View style={styles.container}>
      <ScreenHeader large titleStyle={typography.headerSmall} title="" onBack={finish} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.badge}>
          <SuccessTick size={120} />
        </View>
        <Text style={styles.title}>Workspace suspended</Text>
        <Text style={styles.body}>
          Your deactivation request has been successfully processed. The database is locked and all active sessions have been terminated.
        </Text>

        <SettingsCard radiusSize={radius.lg} style={styles.card}>
          <View style={styles.cardHeader}>
            <Feather name="lock" size={18} color={colors.successDeep} />
            <Text style={styles.cardTitle}>Preservation active</Text>
          </View>
          <Text style={styles.cardMessage}>
            You can restore this workspace by logging back in with your administrator credentials anytime within the next 30 days.
          </Text>
        </SettingsCard>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Done" pill onPress={finish} style={styles.doneButton} textStyle={styles.doneText} />
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
    paddingBottom: 24,
    alignItems: 'center',
  },
  badge: {
    marginTop: 40,
  },
  title: {
    fontFamily: fontFamily.semiBold,
    fontSize: 24,
    lineHeight: 31,
    color: colors.textPrimary,
    marginTop: 36,
  },
  body: {
    fontFamily: fontFamily.regular,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 12,
  },
  card: {
    alignSelf: 'stretch',
    marginTop: 38,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowOpacity: 0,
    elevation: 0,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  cardTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textPrimary,
  },
  cardMessage: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 17,
    color: colors.textMuted,
    marginTop: 14,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 32,
  },
  doneButton: {
    height: 64,
    borderRadius: radius.pill,
  },
  doneText: {
    fontSize: 18,
  },
});
