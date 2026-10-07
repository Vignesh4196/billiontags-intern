import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import BottomSheet from './BottomSheet';
import QrCode from './QrCode';
import { colors, spacing, radius, fontFamily, shadow } from '../theme';

const shareTargets = [
  { key: 'whatsapp', label: 'WhatsApp', Icon: MaterialCommunityIcons, icon: 'whatsapp' },
  { key: 'facebook', label: 'Facebook', Icon: Feather, icon: 'facebook' },
  { key: 'instagram', label: 'Instagram', Icon: Feather, icon: 'instagram' },
  { key: 'telegram', label: 'Telegram', Icon: Feather, icon: 'send' },
  { key: 'more', label: 'More', Icon: Ionicons, icon: 'ellipsis-horizontal-circle-outline' },
];

function CopyField({ label, value, buttonLabel, boldValue }) {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    await Clipboard.setStringAsync(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.field}>
        <Text style={[styles.fieldValue, boldValue && styles.fieldValueBold]} numberOfLines={1}>{value}</Text>
        <TouchableOpacity style={styles.copyButton} activeOpacity={0.8} onPress={copy} accessibilityRole="button">
          <Text style={styles.copyButtonText}>{copied ? 'Copied!' : buttonLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// QR code, code, link and share targets. Used for "Invite Partner" and for the referral "Invite Friends" sheet.
// It opens at 3/4 of the screen; pulling it up shows everything below without scrolling.
export default function InviteQrSheet({
  visible,
  onClose,
  code,
  link,
  onShare,
  title = 'Invite Partner',
  codeLabel = 'Invite Code',
  linkLabel = 'Invitation Link',
}) {
  return (
    <BottomSheet
      expandable
      visible={visible}
      onClose={onClose}
      style={styles.sheet}
      handleStyle={styles.handle}
      contentStyle={styles.content}
    >
      <Text style={styles.title}>{title}</Text>

      <View style={styles.qrBox}>
        <QrCode value={`https://${link}`} size={230} />
      </View>

      <CopyField label={codeLabel} value={code} buttonLabel="Copy Code" boldValue />
      <CopyField label={linkLabel} value={link} buttonLabel="Copy Link" />

      <View style={styles.shareRow}>
        {shareTargets.map(({ key, label, Icon, icon }) => (
          <TouchableOpacity key={key} style={styles.shareItem} activeOpacity={0.7} onPress={() => onShare(key)} accessibilityRole="button" accessibilityLabel={`Share via ${label}`}>
            <View style={styles.shareTile}>
              <Icon name={icon} size={22} color={colors.textDark} />
            </View>
            <Text style={styles.shareLabel}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheet: {
    paddingTop: 12,
    paddingHorizontal: spacing.xl,
    paddingBottom: 44,
    gap: spacing.lg,
  },
  content: {
    gap: spacing.lg,
  },
  handle: {
    width: 80,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.sheetHandle,
    marginBottom: 8,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    lineHeight: 30,
    color: colors.textDark,
    marginBottom: 8,
  },
  qrBox: {
    alignSelf: 'center',
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 30,
    marginTop: 6,
    marginBottom: 13,
    ...shadow.cardSoft,
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 18,
    color: colors.labelDark,
    marginBottom: spacing.sm,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.inputMuted,
    paddingLeft: spacing.lg,
    paddingRight: 6,
    gap: spacing.sm,
  },
  fieldValue: {
    flex: 1,
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.textPrimary,
  },
  fieldValueBold: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: colors.textDark,
  },
  copyButton: {
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.tabActive,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.white,
  },
  shareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  shareItem: {
    width: 72,
    alignItems: 'center',
    gap: spacing.sm,
  },
  shareTile: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textDark,
  },
});
