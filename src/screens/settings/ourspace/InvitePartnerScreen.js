import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useSelector } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import Button from '../../../components/Button';
import InviteQrSheet from '../../../components/InviteQrSheet';
import ShareIcon from '../../../components/icons/ShareIcon';
import { shareMessage } from '../../../utils/share';
import { partnerService } from '../../../services';
import { colors, spacing, radius, fontFamily } from '../../../theme';

function QrScanIcon({ size, color }) {
  return <MaterialCommunityIcons name="qrcode-scan" size={size} color={color} />;
}

export default function InvitePartnerScreen({ navigation }) {
  const invite = useSelector((state) => state.settings.invite);
  const [copied, setCopied] = React.useState(false);
  const [qrVisible, setQrVisible] = React.useState(false);

  const inviteMessage = `Join me on SuperBae! Use my code ${invite.code} or open https://${invite.link}`;

  const handleCopy = async () => {
    await Clipboard.setStringAsync(invite.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendInvite = (channel = 'messages') => {
    shareMessage(inviteMessage);
    partnerService.sendInvite(typeof channel === 'string' ? channel : 'messages');
    setQrVisible(false);
    navigation.navigate('InvitationPending');
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        transparent
        title="Invite your partner"
        subtitle="Share your exclusive entry key"
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SettingsCard radiusSize={radius.xl} style={styles.codeCard}>
          <Text style={styles.codeLabel}>YOUR Exclusive connection CODE</Text>
          <View style={styles.codeBox}>
            <Text style={styles.codeText}>{invite.code}</Text>
          </View>
          <TouchableOpacity style={styles.copyRow} onPress={handleCopy} activeOpacity={0.7} accessibilityRole="button">
            <Ionicons name="copy-outline" size={16} color={colors.textPrimary} />
            <Text style={styles.copyText}>{copied ? 'Copied!' : 'Copy invitation code'}</Text>
          </TouchableOpacity>
        </SettingsCard>

        <View style={styles.actions}>
          <Button
            title="Invite via messages"
            variant="outline"
            IconComponent={ShareIcon}
            onPress={sendInvite}
            style={styles.actionButton}
            textStyle={styles.actionText}
            pill
          />
          <Button
            title="Show QR Code"
            variant="outline"
            IconComponent={QrScanIcon}
            onPress={() => setQrVisible(true)}
            style={styles.actionButton}
            textStyle={styles.actionText}
            pill
          />
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>What your partner needs to do:</Text>
          <Text style={styles.infoStep}>1. Download the Superbae app.</Text>
          <Text style={styles.infoStep}>2. Choose "join an existing space" during setup.</Text>
          <Text style={styles.infoStep}>
            3. Enter code <Text style={styles.infoStepBold}>{invite.code}</Text> to connect instantly.
          </Text>
        </View>
      </ScrollView>

      <InviteQrSheet
        visible={qrVisible}
        onClose={() => setQrVisible(false)}
        code={invite.code}
        link={invite.link}
        onShare={sendInvite}
      />
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
  codeCard: {
    alignItems: 'center',
    paddingTop: 26,
    paddingBottom: 30,
  },
  codeLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 1,
    color: colors.textSecondary,
  },
  codeBox: {
    width: 279,
    height: 65,
    marginTop: 18,
    backgroundColor: colors.iconBackground,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeText: {
    fontFamily: fontFamily.bold,
    fontSize: 32,
    letterSpacing: 1.5,
    color: colors.textPrimary,
  },
  copyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: 24,
  },
  copyText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  actions: {
    gap: 12,
    marginTop: 27,
  },
  actionButton: {
    height: 64,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
    shadowOpacity: 0,
    elevation: 0,
  },
  actionText: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
  },
  infoBox: {
    marginTop: 24,
    backgroundColor: colors.infoBackground,
    borderRadius: radius.lg,
    padding: spacing.xl,
    gap: 2,
  },
  infoTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    lineHeight: 20,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  infoStep: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 17,
    color: colors.textSecondary,
  },
  infoStepBold: {
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },
});
