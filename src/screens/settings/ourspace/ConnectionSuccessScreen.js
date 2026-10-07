import React from 'react';
import { View, Text, Image, Animated, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import Button from '../../../components/Button';
import { useHeartbeat } from '../../../hooks/useHeartbeat';
import { setPartnerConnected } from '../../../state/settingsSlice';
import { exitInviteFlow } from '../../../navigation/helpers';
import { colors, spacing, radius, fontFamily } from '../../../theme';

const coupleConnectedBody = require('../../../assets/images/couple-connected-body.png');
const coupleHeartOnly = require('../../../assets/images/couple-heart-only.png');

// couple-connected-body.png is 250×205 with the drawing at (41, 47)–(209, 205).
const ILLUSTRATION = { width: 250, height: 205, cropX: 41, cropY: 47, drawingWidth: 168, drawingHeight: 158 };

const benefits = [
  'Co-create logs, dates, and milestones together.',
  'Instantly share live stickers and interactive status updates.',
];

export default function ConnectionSuccessScreen({ navigation }) {
  const profile = useSelector((state) => state.settings.profile);
  const heartTransform = useHeartbeat();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setPartnerConnected(true));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <ScreenHeader large transparent title="" onBack={() => exitInviteFlow(navigation)} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.matchBadge}>
          <Text style={styles.matchBadgeText}>🎉 IT'S a MATCH!</Text>
        </View>

        <View style={styles.illustrationWrap}>
          <Image source={coupleConnectedBody} style={styles.illustrationImage} />
          <Animated.Image source={coupleHeartOnly} style={[styles.heartOverlay, { transform: heartTransform }]} resizeMode="contain" />
        </View>

        <Text style={styles.connectedTitle}>Connected!</Text>

        <SettingsCard radiusSize={radius.xl} style={styles.welcomeCard}>
          <Text style={styles.welcomeLabel}>Welcome to your new Haven</Text>
          <Text style={styles.welcomeTitle}>
            {profile.user.name} & {profile.partner.name}'S space
          </Text>
        </SettingsCard>

        <View style={styles.checklistSection}>
          <Text style={styles.checklistTitle}>WHAT YOU CAN DO NOW:</Text>
          {benefits.map((benefit) => (
            <View key={benefit} style={styles.checklistRow}>
              <Ionicons name="checkmark" size={18} color={colors.toggleOn} />
              <Text style={styles.checklistText}>{benefit}</Text>
            </View>
          ))}
        </View>

        <Button
          title="Enter shared space"
          variant="primary"
          onPress={() => exitInviteFlow(navigation)}
          style={styles.enterButton}
          textStyle={styles.enterText}
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
    paddingBottom: 40,
    alignItems: 'center',
  },
  matchBadge: {
    height: 30,
    justifyContent: 'center',
    backgroundColor: colors.matchBadgeBackground,
    borderRadius: 15,
    paddingHorizontal: 14,
  },
  matchBadgeText: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    color: colors.matchBadgeText,
  },
  illustrationWrap: {
    width: ILLUSTRATION.drawingWidth,
    height: ILLUSTRATION.drawingHeight,
    marginTop: 18,
  },
  illustrationImage: {
    position: 'absolute',
    left: -ILLUSTRATION.cropX,
    top: -ILLUSTRATION.cropY,
    width: ILLUSTRATION.width,
    height: ILLUSTRATION.height,
  },
  heartOverlay: {
    position: 'absolute',
    left: 94 - ILLUSTRATION.cropX,
    top: 52 - ILLUSTRATION.cropY,
    width: 36,
    height: 26,
  },
  connectedTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 30,
    lineHeight: 38,
    color: colors.connectedBright,
    marginTop: 30,
  },
  welcomeCard: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 18,
    gap: 6,
    marginTop: 9,
  },
  welcomeLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textFaint,
  },
  welcomeTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    lineHeight: 26,
    color: colors.textPrimary,
  },
  checklistSection: {
    alignSelf: 'stretch',
    paddingHorizontal: spacing.sm,
    marginTop: 32,
    gap: 13,
  },
  checklistTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 1,
    color: colors.textSecondary,
    marginBottom: 5,
  },
  checklistRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checklistText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  enterButton: {
    height: 64,
    borderRadius: radius.pill,
    marginTop: 42,
  },
  enterText: {
    fontFamily: fontFamily.medium,
    fontSize: 18,
  },
});
