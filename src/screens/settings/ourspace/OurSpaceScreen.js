import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import SettingsRow from '../../../components/SettingsRow';
import SectionLabel from '../../../components/SectionLabel';
import CoupleCard from '../../../components/CoupleCard';
import DisconnectPartnerCard from '../../../components/DisconnectPartnerCard';
import IntimacyIcon from '../../../components/icons/IntimacyIcon';
import HeartCheckIcon from '../../../components/icons/HeartCheckIcon';
import CycleIcon from '../../../components/icons/CycleIcon';
import ThemeHeartIcon from '../../../components/icons/ThemeHeartIcon';
import InvitePartnerIcon from '../../../components/icons/InvitePartnerIcon';
import { togglePartnerFeature } from '../../../state/settingsSlice';
import { partnerService } from '../../../services';
import { formatTogetherSince } from '../../../utils/dateFormat';
import { colors, spacing, fontFamily } from '../../../theme';

const avatarSaara = require('../../../assets/images/avatar-saara.png');
const avatarArjun = require('../../../assets/images/avatar-arjun.png');

export default function OurSpaceScreen({ navigation }) {
  const profile = useSelector((state) => state.settings.profile);
  const myProfile = useSelector((state) => state.settings.myProfile);
  const partnerProfile = useSelector((state) => state.settings.partnerProfile);
  const features = useSelector((state) => state.settings.partnerFeatures);
  const connected = useSelector((state) => state.settings.partnerConnection.connected);
  const dispatch = useDispatch();

  const toggle = (key) => () => {
    dispatch(togglePartnerFeature(key));
    partnerService.updateFeature(key, !features[key]).catch(() => dispatch(togglePartnerFeature(key)));
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="My partner" subtitle="Manage your shared space" onBack={() => navigation.goBack()} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {connected && (
          <CoupleCard
            userName={profile.user.name}
            userAvatar={myProfile.avatarUri ? { uri: myProfile.avatarUri } : avatarSaara}
            partnerName={profile.partner.name}
            partnerAvatar={partnerProfile.avatarUri ? { uri: partnerProfile.avatarUri } : avatarArjun}
            togetherLabel={formatTogetherSince(profile.connectedAt)}
            onUserPress={() => navigation.navigate('MyProfile')}
            onPartnerPress={() => navigation.navigate('PartnerProfile')}
          />
        )}

        <SettingsCard noPadding style={[styles.listCard, connected && styles.featureCard]}>
          <SettingsRow
            IconComponent={IntimacyIcon}
            iconSize={24}
            title="Our Intimacy"
            subtitle="Save the memories. Feel the connection."
            toggleValue={features.intimacy}
            onToggleChange={toggle('intimacy')}
          />
          <SettingsRow
            IconComponent={HeartCheckIcon}
            iconSize={24}
            title="Heart Check"
            subtitle="A simple way to share your mood with your person."
            toggleValue={features.heartCheck}
            onToggleChange={toggle('heartCheck')}
          />
          <SettingsRow
            IconComponent={CycleIcon}
            iconSize={24}
            title="My Cycle"
            subtitle="Understand your cycle and be there when it matters."
            toggleValue={features.cycle}
            onToggleChange={toggle('cycle')}
          />
          <SettingsRow
            IconComponent={ThemeHeartIcon}
            iconSize={24}
            title="Theme & personalization"
            subtitle="Make your space feel like you"
            toggleValue={features.theme}
            onToggleChange={toggle('theme')}
            showBorder={!connected}
          />
          {!connected && (
          <SettingsRow
            IconComponent={InvitePartnerIcon}
            iconSize={24}
            title="Invite your partner"
            subtitle="Bring your partner in and make this space yours together."
            onPress={() => navigation.navigate('InvitePartner')}
            chevronColor={colors.textPrimary}
            showBorder={false}
            style={styles.inviteRow}
          />
          )}
        </SettingsCard>

        {connected && (
          <>
            <SectionLabel title="Connection management" style={styles.sectionLabel} />

            <DisconnectPartnerCard onDisconnect={() => navigation.navigate('DisconnectWarning')} />
          </>
        )}
      </ScrollView>
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
    paddingTop: 22,
    paddingBottom: 40,
    gap: spacing.md,
  },
  listCard: {
    overflow: 'hidden',
  },
  featureCard: {
    marginTop: 14,
  },
  inviteRow: {
    paddingRight: 45,
  },
  sectionLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 18,
    paddingTop: spacing.md + 4,
    paddingBottom: 2,
  },
});
