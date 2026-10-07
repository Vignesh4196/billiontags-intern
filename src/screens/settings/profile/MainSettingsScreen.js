import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import SettingsRow from '../../../components/SettingsRow';
import SectionLabel from '../../../components/SectionLabel';
import HeartDiamondIcon from '../../../components/icons/HeartDiamondIcon';
import AppSettingsIcon from '../../../components/icons/AppSettingsIcon';
import InviteQrSheet from '../../../components/InviteQrSheet';
import { shareMessage as shareText } from '../../../utils/share';
import { colors, spacing, typography, fontFamily } from '../../../theme';

const avatarSaara = require('../../../assets/images/avatar-saara.png');
const membershipIcon = require('../../../assets/icons/membership-benefits-icon.png');
const privacyPolicyIcon = require('../../../assets/icons/privacy-policy-icon.png');
const serviceTermsIcon = require('../../../assets/icons/service-terms-icon.png');
const rateAppIcon = require('../../../assets/icons/rate-app-icon.png');
const shareAppIcon = require('../../../assets/icons/share-app-icon.png');
const referPeopleIcon = require('../../../assets/icons/refer-people-icon.png');

const menuRowProps = { chevronColor: colors.textPrimary, style: { paddingRight: 24 } };
const aboutRowProps = { chevronColor: colors.textPrimary, chevronSize: 20, iconImageSize: 24, style: { paddingRight: 18 } };

function NotificationsIcon({ size }) {
  return <Ionicons name="notifications-outline" size={size} color={colors.textPrimary} />;
}

export default function MainSettingsScreen({ navigation }) {
  const myProfile = useSelector((state) => state.settings.myProfile);
  const shareMessage = useSelector((state) => state.settings.shareApp.message);
  const connected = useSelector((state) => state.settings.partnerConnection.connected);
  const referral = useSelector((state) => state.settings.referral);
  const [referralOpen, setReferralOpen] = React.useState(false);

  const goTo = (screen) => () => navigation.navigate(screen);

  // My Partner: the connected space while connected, otherwise Our space (where "Invite your partner" is).
  const openMyPartner = () => navigation.navigate(connected ? 'PartnerSettings' : 'OurSpace');

  const shareApp = () => shareText(shareMessage);
  const shareReferral = () => shareText(`Join me on SuperBae! Use my referral code ${referral.code} or open https://${referral.link}`);

  return (
    <View style={styles.container}>
      <ScreenHeader large title="Profile" onBack={() => navigation.canGoBack() && navigation.goBack()} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity activeOpacity={0.8} onPress={goTo('MyProfile')} accessibilityRole="button" accessibilityLabel="Open your profile">
          <SettingsCard style={styles.profileCard}>
            <Image
              source={myProfile.avatarUri ? { uri: myProfile.avatarUri } : avatarSaara}
              style={styles.profileAvatar}
              accessibilityLabel={`${myProfile.displayName}'s profile photo`}
            />
            <View style={styles.profileText}>
              <Text style={styles.profileName} numberOfLines={1}>{myProfile.displayName}</Text>
              <Text style={styles.profileHandle} numberOfLines={1}>{myProfile.handle}</Text>
            </View>
          </SettingsCard>
        </TouchableOpacity>

        <SettingsCard noPadding style={styles.listCard}>
          <SettingsRow
            IconComponent={NotificationsIcon}
            title="Notifications"
            subtitle="Manage your notifications"
            onPress={goTo('Notifications')}
            {...menuRowProps}
          />
          <SettingsRow
            iconImage={membershipIcon}
            title="Membership settings"
            subtitle="More features, more benefits, made for you."
            onPress={goTo('Subscription')}
            {...menuRowProps}
          />
          <SettingsRow
            IconComponent={AppSettingsIcon}
            title="App settings"
            subtitle="Customize your app experience"
            onPress={goTo('AppSettings')}
            {...menuRowProps}
            showBorder={false}
          />
        </SettingsCard>

        <SettingsCard noPadding style={styles.listCard}>
          <SettingsRow
            IconComponent={HeartDiamondIcon}
            title="My Partner"
            subtitle="Manage your shared space"
            onPress={openMyPartner}
            {...menuRowProps}
            showBorder={false}
            style={styles.partnerRow}
          />
        </SettingsCard>

        <SectionLabel title="About us" />

        <SettingsCard noPadding style={styles.listCard}>
          <SettingsRow
            iconImage={privacyPolicyIcon}
            title="Privacy policy"
            subtitle="Review the Privacy Policy for using SuperBae"
            onPress={goTo('PrivacyPolicy')}
            {...aboutRowProps}
          />
          <SettingsRow
            iconImage={serviceTermsIcon}
            title="Service terms"
            subtitle="Review the Terms of Service for using SuperBae"
            onPress={goTo('TermsOfService')}
            {...aboutRowProps}
          />
          <SettingsRow
            iconImage={rateAppIcon}
            title="Rate app"
            subtitle="Manage your shared space"
            onPress={() => {}}
            {...aboutRowProps}
          />
          <SettingsRow
            iconImage={shareAppIcon}
            title="Share app"
            subtitle="Manage your shared space"
            onPress={shareApp}
            {...aboutRowProps}
          />
          <SettingsRow
            iconImage={referPeopleIcon}
            title="Refer to people"
            subtitle="Manage your shared space"
            onPress={() => setReferralOpen(true)}
            {...aboutRowProps}
            showBorder={false}
          />
        </SettingsCard>
      </ScrollView>

      <InviteQrSheet
        visible={referralOpen}
        onClose={() => setReferralOpen(false)}
        title="Invite Friends"
        codeLabel="Referral Code"
        linkLabel="Referral Link"
        code={referral.code}
        link={referral.link}
        onShare={shareReferral}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: 40,
    gap: spacing.md,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    padding: spacing.xl - 1,
  },
  profileAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  profileText: {
    flex: 1,
    gap: spacing.xs,
  },
  profileName: {
    ...typography.heading3,
    fontSize: 18,
    lineHeight: 23,
  },
  profileHandle: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 17,
    color: colors.textSlate,
  },
  listCard: {
    overflow: 'hidden',
  },
  partnerRow: {
    paddingVertical: 10,
    paddingLeft: 17,
    paddingRight: 24,
  },
});
