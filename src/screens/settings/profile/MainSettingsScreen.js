import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import SettingsRow from '../../../components/SettingsRow';
import SectionLabel from '../../../components/SectionLabel';
import HeartDiamondIcon from '../../../components/icons/HeartDiamondIcon';
import AppSettingsIcon from '../../../components/icons/AppSettingsIcon';
import DatabaseBackupIcon from '../../../components/icons/DatabaseBackupIcon';
import DatabaseExportIcon from '../../../components/icons/DatabaseExportIcon';
import InviteQrSheet from '../../../components/InviteQrSheet';
import Popup from '../../../components/Popup';
import Button from '../../../components/Button';
import { accountService } from '../../../services';
import { resetToLogin } from '../../../navigation/helpers';
import { shareMessage as shareText } from '../../../utils/share';
import { colors, spacing, typography, fontFamily } from '../../../theme';

const avatarSaara = require('../../../assets/images/avatar-saara.png');
const subscriptionsIcon = require('../../../assets/icons/subscriptions-icon.png');
const privacyPolicyIcon = require('../../../assets/icons/privacy-policy-icon.png');
const serviceTermsIcon = require('../../../assets/icons/service-terms-icon.png');
const rateAppIcon = require('../../../assets/icons/rate-app-icon.png');
const logoutIcon = require('../../../assets/icons/logout-icon.png');
const referPeopleIcon = require('../../../assets/icons/share-app-icon.png');

const SystemBackupIcon = ({ size }) => <DatabaseBackupIcon size={size} color={colors.tabActive} />;
const DataExportIcon = ({ size }) => <DatabaseExportIcon size={size} color={colors.tabActive} />;

const menuRowProps = { chevronColor: colors.textPrimary, style: { paddingRight: 24 } };
const aboutRowProps = { chevronColor: colors.textPrimary, chevronSize: 20, iconImageSize: 24, style: { paddingRight: 18 } };

export default function MainSettingsScreen({ navigation }) {
  const myProfile = useSelector((state) => state.settings.myProfile);
  const connected = useSelector((state) => state.settings.partnerConnection.connected);
  const referral = useSelector((state) => state.settings.referral);
  const [referralOpen, setReferralOpen] = React.useState(false);
  const [logoutOpen, setLogoutOpen] = React.useState(false);
  const [loggingOut, setLoggingOut] = React.useState(false);

  const goTo = (screen) => () => navigation.navigate(screen);

  // My partner: the connected space while connected, otherwise the Add partner screen.
  const openMyPartner = () => navigation.navigate(connected ? 'PartnerSettings' : 'AddPartner');

  const logout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await accountService.logout();
      setLogoutOpen(false);
      resetToLogin(navigation, 'loggedOut');
    } finally {
      setLoggingOut(false);
    }
  };

  const shareReferral = () => shareText(`Join me on SuperBae! Use my referral code ${referral.code} or open https://${referral.link}`);

  return (
    <View style={styles.container}>
      <ScreenHeader large title="Account & Settings" onBack={() => navigation.canGoBack() && navigation.goBack()} />

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

        <SectionLabel title="Profile & account" style={styles.sectionLabel} />

        <SettingsCard noPadding style={styles.listCard}>
          <SettingsRow
            IconComponent={HeartDiamondIcon}
            title="My partner"
            subtitle="Keep your favourite person closer"
            onPress={openMyPartner}
            badgeLabel={connected ? 'Active' : 'Invite'}
            showBorder={false}
            style={styles.partnerRow}
          />
        </SettingsCard>

        <SettingsCard noPadding style={styles.listCard}>
          <SettingsRow
            iconImage={subscriptionsIcon}
            iconImageSize={24}
            title="Subscriptions"
            subtitle="Discover your plan's special perks"
            onPress={goTo('Subscription')}
            {...menuRowProps}
          />
          <SettingsRow
            IconComponent={AppSettingsIcon}
            title="Help & Support"
            subtitle="We're always here for you"
            onPress={goTo('Support')}
            {...menuRowProps}
            showBorder={false}
          />
        </SettingsCard>

        <SectionLabel title="Backup & Export" style={styles.sectionLabel} />

        <SettingsCard noPadding style={styles.listCard}>
          <SettingsRow
            IconComponent={SystemBackupIcon}
            title="System backup"
            subtitle="Your data, safely backed up."
            subtitleStyle={styles.backupSubtitle}
            onPress={goTo('SystemBackup')}
            showChevron={false}
          />
          <SettingsRow
            IconComponent={DataExportIcon}
            title="Data export"
            subtitle="Take your data with you, anytime."
            subtitleStyle={styles.backupSubtitle}
            onPress={goTo('DataExport')}
            showChevron={false}
            showBorder={false}
          />
        </SettingsCard>

        <SectionLabel title="A little more about us" style={styles.sectionLabel} />

        <SettingsCard noPadding style={styles.listCard}>
          <SettingsRow
            iconImage={privacyPolicyIcon}
            title="Privacy policy"
            subtitle="Your privacy matters to us"
            onPress={goTo('PrivacyPolicy')}
            {...aboutRowProps}
          />
          <SettingsRow
            iconImage={serviceTermsIcon}
            title="Terms of service"
            subtitle="A few things worth knowing"
            onPress={goTo('TermsOfService')}
            {...aboutRowProps}
          />
          <SettingsRow
            iconImage={rateAppIcon}
            title="Rate app"
            subtitle="Show us a little love"
            onPress={() => {}}
            {...aboutRowProps}
          />
          <SettingsRow
            iconImage={referPeopleIcon}
            title="Invite your girls"
            subtitle="Share the love with girls"
            onPress={() => setReferralOpen(true)}
            {...aboutRowProps}
            showBorder={false}
          />
        </SettingsCard>

        <SettingsCard noPadding style={styles.listCard}>
          <SettingsRow
            iconImage={logoutIcon}
            iconImageSize={24}
            title="Logout"
            subtitle="See you again soon, girl!"
            onPress={() => setLogoutOpen(true)}
            showChevron={false}
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

      <Popup visible={logoutOpen} onClose={() => setLogoutOpen(false)}>
        <Text style={styles.confirmTitle}>Confirmation</Text>
        <Text style={styles.confirmMessage}>Are you sure you want to logout this account?</Text>
        <View style={styles.confirmActions}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setLogoutOpen(false)} activeOpacity={0.6} accessibilityRole="button">
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Button title="Logout account" pill loading={loggingOut} onPress={logout} style={styles.confirmButton} textStyle={styles.confirmText} />
        </View>
      </Popup>
    </View>
  );
}

const styles = StyleSheet.create({
  confirmTitle: {
    ...typography.heading3,
    fontFamily: fontFamily.semiBold,
    fontSize: 20,
    lineHeight: 26,
    color: colors.textPrimary,
  },
  confirmMessage: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    lineHeight: 23,
    color: colors.textPrimary,
    marginTop: spacing.lg,
  },
  confirmActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  cancelButton: {
    flex: 1,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.textFaint,
  },
  confirmButton: {
    flex: 1.4,
    width: undefined,
    height: 56,
  },
  confirmText: {
    fontSize: 16,
  },
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
  sectionLabel: {
    paddingTop: spacing.sm,
    paddingBottom: 0,
  },
  backupSubtitle: {
    fontSize: 14,
    lineHeight: 18,
  },
  partnerRow: {
    paddingVertical: 10,
    paddingLeft: 17,
    paddingRight: 24,
  },
});
