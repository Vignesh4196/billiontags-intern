import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import Button from '../../../components/Button';
import DottedSpinner from '../../../components/icons/DottedSpinner';
import { exitInviteFlow } from '../../../navigation/helpers';
import { shareMessage } from '../../../utils/share';
import { partnerService } from '../../../services';
import { colors, spacing, radius, fontFamily } from '../../../theme';

const resendIcon = require('../../../assets/icons/resend-icon.png');
const changeCodeIcon = require('../../../assets/icons/change-code-icon.png');

export default function InvitationPendingScreen({ navigation }) {
  const invite = useSelector((state) => state.settings.invite);

  const [resent, setResent] = React.useState(false);

  const resendInvite = async () => {
    shareMessage(`Join me on SuperBae! Use my code ${invite.code} or open https://${invite.link}`);
    try {
      await partnerService.sendInvite('messages');
      setResent(true);
      setTimeout(() => setResent(false), 2500);
    } catch (e) {
      setResent(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        transparent
        title="Waiting for Partner..."
        subtitle="Invitation is on its way"
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Tapping the pending card simulates the partner joining (no backend yet). */}
        <TouchableOpacity activeOpacity={0.85} onPress={() => navigation.replace('ConnectionSuccess')} accessibilityRole="button">
          <SettingsCard radiusSize={radius.xl} style={styles.pendingCard}>
            <DottedSpinner size={61} dotSize={11} dotCount={8} fade={false} dotColor={colors.spinnerDot} />
            <Text style={styles.pendingTitle}>Pending connection</Text>
            <Text style={styles.pendingSubtitle}>
              Sent to: <Text style={styles.pendingNumber}>{invite.sentTo}</Text>
            </Text>
          </SettingsCard>
        </TouchableOpacity>

        <View style={styles.actions}>
          <Button
            title={resent ? 'Invitation sent again' : 'Resend invitation'}
            variant="outline"
            iconImage={changeCodeIcon}
            onPress={resendInvite}
            style={styles.actionButton}
            textStyle={styles.actionText}
            pill
          />
          <Button
            title="Change connection code"
            variant="outline"
            iconImage={resendIcon}
            onPress={() => navigation.goBack()}
            style={styles.actionButton}
            textStyle={styles.actionText}
            pill
          />
        </View>

        <Text style={styles.helperText}>
          We will notify you the moment your partner enters the code and joins.
        </Text>

        <Button
          title="Continue alone for now"
          variant="primary"
          onPress={() => exitInviteFlow(navigation)}
          style={styles.continueButton}
          textStyle={styles.continueText}
          pill
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
    paddingHorizontal: spacing.xl,
    paddingTop: 23,
    paddingBottom: 40,
  },
  pendingCard: {
    alignItems: 'center',
    paddingTop: 35,
    paddingBottom: 36,
  },
  pendingTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
    lineHeight: 23,
    color: colors.textPrimary,
    marginTop: 25,
  },
  pendingSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textSecondary,
    marginTop: 6,
  },
  pendingNumber: {
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },
  actions: {
    gap: 12,
    marginTop: 25,
    paddingHorizontal: 4,
  },
  actionButton: {
    height: 49,
    borderRadius: radius.xl,
    backgroundColor: colors.white,
    shadowOpacity: 0,
    elevation: 0,
  },
  actionText: {
    fontSize: 16,
  },
  helperText: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 17,
    color: colors.textFaint,
    textAlign: 'center',
    marginTop: 24,
  },
  continueButton: {
    alignSelf: 'center',
    width: 392,
    maxWidth: '100%',
    height: 64,
    borderRadius: radius.pill,
    marginTop: 21,
  },
  continueText: {
    fontFamily: fontFamily.medium,
    fontSize: 18,
  },
});
