import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import Button from '../../../components/Button';
import FadeInView from '../../../components/FadeInView';
import { formatAnniversary, formatConnectedSince, formatTogetherDuration } from '../../../utils/dateFormat';
import { colors, spacing, radius, fontFamily, typography } from '../../../theme';

const avatarArjun = require('../../../assets/images/avatar-arjun.png');

function InfoRow({ icon, label, value, onPress }) {
  const Wrapper = onPress ? TouchableOpacity : View;
  return (
    <Wrapper style={styles.infoRow} onPress={onPress} activeOpacity={0.7} accessibilityRole={onPress ? 'button' : undefined}>
      <View style={styles.infoIcon}>{icon}</View>
      <View style={styles.infoText}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue} numberOfLines={1}>{value}</Text>
      </View>
      {!!onPress && <Ionicons name="chevron-forward" size={18} color={colors.textPrimary} />}
    </Wrapper>
  );
}

// Read-only partner profile. The love-story card is worked out from the "Together since" date,
// so editing that date (Edit profile) updates it everywhere.
export default function PartnerProfileScreen({ navigation }) {
  const partnerProfile = useSelector((state) => state.settings.partnerProfile);
  const profile = useSelector((state) => state.settings.profile);
  const edit = () => navigation.navigate('EditPartnerProfile');

  return (
    <View style={styles.container}>
      <ScreenHeader title="Partner profile" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <FadeInView style={styles.avatarSection}>
          <View style={styles.avatarWrap}>
            <Image
              source={partnerProfile.avatarUri ? { uri: partnerProfile.avatarUri } : avatarArjun}
              style={styles.avatar}
              accessibilityLabel={`${partnerProfile.displayName}'s profile photo`}
            />
            <TouchableOpacity style={styles.cameraBadge} activeOpacity={0.7} onPress={edit} accessibilityLabel="Change profile photo">
              <Ionicons name="camera-outline" size={14} color={colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{partnerProfile.displayName}</Text>
        </FadeInView>

        <FadeInView delay={120}>
          <SettingsCard radiusSize={radius.xl} style={styles.storyCard}>
            <Text style={styles.storyLabel}>Our little love story</Text>
            <Text style={styles.storyDuration}>{formatTogetherDuration(profile.connectedAt)}</Text>
            <Text style={styles.storySince}>Together since {formatConnectedSince(profile.connectedAt)}</Text>
            <View style={styles.dashed} />
            <View style={styles.anniversary}>
              <MaterialCommunityIcons name="calendar-heart" size={16} color={colors.pink} />
              <Text style={styles.anniversaryText}>Our anniversary · {formatAnniversary(profile.connectedAt)}</Text>
            </View>
          </SettingsCard>
        </FadeInView>

        <FadeInView delay={240}>
          <SettingsCard noPadding radiusSize={radius.xl} style={styles.infoCard}>
            <InfoRow icon={<Ionicons name="person-outline" size={22} color={colors.textPrimary} />} label="Full name" value={partnerProfile.fullName} onPress={edit} />
            <InfoRow
              icon={<Ionicons name="call-outline" size={22} color={colors.textPrimary} />}
              label="Phone number"
              value={`${partnerProfile.phoneCode} ${partnerProfile.phoneNumber}`}
              onPress={edit}
            />
            <InfoRow
              icon={<MaterialCommunityIcons name="calendar-heart" size={22} color={colors.textPrimary} />}
              label="Together since"
              value={formatConnectedSince(profile.connectedAt)}
            />
          </SettingsCard>
        </FadeInView>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Edit profile" pill onPress={edit} style={styles.editButton} textStyle={styles.editText} />
      </View>
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
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
    gap: spacing.lg,
  },
  avatarSection: {
    alignItems: 'center',
  },
  avatarWrap: {
    width: 96,
    height: 96,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  cameraBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.tabActive,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  name: {
    ...typography.heading3,
    fontSize: 20,
    lineHeight: 26,
    color: colors.textDark,
    marginTop: spacing.md,
  },
  storyCard: {
    alignItems: 'center',
    paddingTop: 22,
    paddingBottom: 16,
    paddingHorizontal: 0,
  },
  storyLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    lineHeight: 17,
    letterSpacing: 0.8,
    color: colors.pink,
  },
  storyDuration: {
    fontFamily: fontFamily.bold,
    fontSize: 28,
    lineHeight: 36,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  storySince: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textMuted,
    marginTop: 4,
    marginBottom: spacing.lg,
  },
  dashed: {
    alignSelf: 'stretch',
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.border,
  },
  anniversary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  anniversaryText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 18,
    color: colors.pink,
  },
  infoCard: {
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.white,
  },
  infoIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.iconBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    flex: 1,
    gap: 4,
  },
  infoLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.fieldLabel,
  },
  infoValue: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 21,
    color: colors.textPrimary,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
  },
  editButton: {
    height: 64,
    borderRadius: radius.pill,
  },
  editText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
  },
});
