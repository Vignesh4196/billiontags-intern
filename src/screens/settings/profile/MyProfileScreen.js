import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Image, ScrollView, TouchableOpacity, Animated, Easing, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import FadeInView from '../../../components/FadeInView';
import SectionLabel from '../../../components/SectionLabel';
import { formatIsoLongDate, formatDobDisplay } from '../../../utils/dateFormat';
import { colors, spacing, typography, fontFamily } from '../../../theme';

const avatarSaara = require('../../../assets/images/avatar-saara.png');
const connectedOnIcon = require('../../../assets/icons/connected-on-icon.png');
const connectionStatusIcon = require('../../../assets/icons/connection-status-icon.png');
const editPencilIcon = require('../../../assets/icons/edit-pencil-icon.png');
const verifiedIcon = require('../../../assets/icons/verified-badge-icon.png');

function InfoRow({ label, value, showBorder = true }) {
  return (
    <View style={[styles.infoRow, showBorder && styles.infoRowBorder]}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue} numberOfLines={1}>{value}</Text>
    </View>
  );
}

// Green verified badge: pops in, then breathes gently.
function VerifiedBadge() {
  const pop = React.useRef(new Animated.Value(0)).current;
  const pulse = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    let loop;
    const entrance = Animated.sequence([
      Animated.delay(650),
      Animated.spring(pop, { toValue: 1, friction: 4, tension: 120, useNativeDriver: false }),
    ]);
    entrance.start(({ finished }) => {
      if (!finished) return;
      loop = Animated.loop(Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1100, easing: Easing.inOut(Easing.quad), useNativeDriver: false }),
        Animated.timing(pulse, { toValue: 0, duration: 1100, easing: Easing.inOut(Easing.quad), useNativeDriver: false }),
      ]));
      loop.start();
    });
    return () => {
      entrance.stop();
      loop?.stop();
    };
  }, [pop, pulse]);

  const scale = Animated.multiply(pop, pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.12] }));

  return <Animated.Image source={verifiedIcon} style={[styles.connectionBadge, { opacity: pop, transform: [{ scale }] }]} resizeMode="contain" />;
}

// Edit button: shrinks slightly while pressed.
function EditButton({ onPress }) {
  const scale = React.useRef(new Animated.Value(1)).current;
  const to = (value) => Animated.spring(scale, { toValue: value, friction: 7, tension: 200, useNativeDriver: false }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        style={styles.editButton}
        onPress={onPress}
        onPressIn={() => to(0.92)}
        onPressOut={() => to(1)}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel="Edit profile"
      >
        <Image source={editPencilIcon} style={styles.editPencil} />
        <Text style={styles.editLabel}>Edit</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

function ConnectionRow({ icon, label, value, badge, inactiveBadge }) {
  return (
    <View style={styles.connectionRow}>
      <View style={styles.connectionIcon}>
        <Image source={icon} style={styles.connectionIconImage} resizeMode="contain" />
      </View>
      <View style={styles.connectionText}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
      {!!badge && <VerifiedBadge />}
      {!!inactiveBadge && <Ionicons name="close-circle-outline" size={24} color={colors.textHint} style={styles.connectionBadge} />}
    </View>
  );
}

// Read-only profile. The Edit button in the header opens the edit form (EditProfile).
export default function MyProfileScreen({ navigation }) {
  const myProfile = useSelector((state) => state.settings.myProfile);
  const partnerConnected = useSelector((state) => state.settings.partnerConnection.connected);

  const rows = [
    ['Nickname', myProfile.fullName],
    ['Phone number', myProfile.phone],
    ['Date of birth', formatDobDisplay(myProfile.dateOfBirth)],
    ['Birth time', myProfile.birthTime],
    ['Birthplace', `${myProfile.birthPlace}, India`],
    ['Zodiac sign', myProfile.zodiacSign],
    ['Languages', myProfile.languages.join(', ')],
    ['Current city', myProfile.currentCity],
    ['Interest', myProfile.interests.join(', ')],
    ['Nationality', myProfile.nationality],
  ];

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Profile"
        onBack={() => navigation.goBack()}
        rightElement={<EditButton onPress={() => navigation.navigate('EditProfile')} />}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <FadeInView style={styles.avatarSection}>
          <Image
            source={myProfile.avatarUri ? { uri: myProfile.avatarUri } : avatarSaara}
            style={styles.avatar}
            accessibilityLabel={`${myProfile.displayName}'s profile photo`}
          />
          <Text style={styles.name}>{myProfile.displayName}</Text>
          <Text style={styles.handle}>{myProfile.handle}</Text>
        </FadeInView>

        <FadeInView delay={120}>
        <SettingsCard noPadding style={styles.infoCard}>
          {rows.map(([label, value], index) => (
            <InfoRow key={label} label={label} value={value} showBorder={index < rows.length - 1} />
          ))}
        </SettingsCard>
        </FadeInView>

        <FadeInView delay={260} style={styles.connectionSection}>
          <SectionLabel title="Our connection" style={styles.sectionLabel} />
          <SettingsCard noPadding style={styles.infoCard}>
            <ConnectionRow icon={connectedOnIcon} label="Connected on Superbae" value={formatIsoLongDate(myProfile.signedUpAt)} />
            <ConnectionRow
              icon={connectionStatusIcon}
              label="Connection status"
              value={partnerConnected ? 'Partner connected' : 'Partner not connected'}
              badge={partnerConnected}
              inactiveBadge={!partnerConnected}
            />
          </SettingsCard>
        </FadeInView>
      </ScrollView>
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
    paddingTop: spacing.sm,
    paddingBottom: 40,
    gap: spacing.lg,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 38,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: colors.rowMuted,
  },
  editPencil: {
    width: 16,
    height: 16,
  },
  editLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textPrimary,
  },
  connectionSection: {
    gap: spacing.lg,
  },
  sectionLabel: {
    paddingTop: 4,
    paddingBottom: 0,
  },
  connectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.white,
  },
  connectionIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.iconBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectionIconImage: {
    width: 24,
    height: 24,
  },
  connectionText: {
    flex: 1,
    gap: 4,
  },
  connectionBadge: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  name: {
    ...typography.heading3,
    fontSize: 18,
    lineHeight: 24,
    color: colors.textDark,
    marginTop: spacing.md,
  },
  handle: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textHint,
    marginTop: 2,
  },
  infoCard: {
    overflow: 'hidden',
  },
  infoRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 4,
    backgroundColor: colors.white,
  },
  infoRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderDivider,
  },
  infoLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 17,
    color: colors.fieldLabel,
  },
  infoValue: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 21,
    color: colors.textPrimary,
  },
});
