import React from 'react';
import { View, Text, Animated, Easing, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import Button from '../../../components/Button';
import FadeInView from '../../../components/FadeInView';
import PopInView from '../../../components/PopInView';
import { setPartnerConnected } from '../../../state/settingsSlice';
import { exitInviteFlow } from '../../../navigation/helpers';
import { colors, spacing, radius, fontFamily } from '../../../theme';

const padlocks = require('../../../assets/images/connected-padlocks.png');

const benefits = [
  'Save memories and milestones together',
  'Plan dates and exchange notes',
  'Let him view selected updates',
];

// The padlocks pop in, then swing gently like two locks clicking together.
function Padlocks() {
  const swing = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const step = (toValue) => Animated.timing(swing, { toValue, duration: 140, easing: Easing.inOut(Easing.quad), useNativeDriver: false });
    const animation = Animated.sequence([Animated.delay(450), step(1), step(-1), step(0.6), step(-0.6), step(0)]);
    animation.start();
    return () => animation.stop();
  }, [swing]);

  const rotate = swing.interpolate({ inputRange: [-1, 1], outputRange: ['-6deg', '6deg'] });

  return (
    <PopInView>
      <Animated.Image source={padlocks} style={[styles.padlocks, { transform: [{ rotate }] }]} resizeMode="contain" accessibilityLabel="Two padlocks locked together" />
    </PopInView>
  );
}

export default function ConnectionSuccessScreen({ navigation }) {
  const profile = useSelector((state) => state.settings.profile);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setPartnerConnected(true));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <ScreenHeader large transparent title="" onBack={() => exitInviteFlow(navigation)} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Padlocks />

        <FadeInView delay={250} style={styles.titleBlock}>
          <Text style={styles.title}>You{'\u2019'}re officially connected!</Text>
          <Text style={styles.subtitle}>Your favourite person is here</Text>
        </FadeInView>

        <FadeInView delay={380} style={styles.cardWrap}>
          <SettingsCard radiusSize={radius.xl} style={styles.spaceCard}>
            <Text style={styles.spaceLabel}>Your little space together</Text>
            <Text style={styles.spaceNames}>{profile.user.name} & {profile.partner.name}</Text>
          </SettingsCard>
        </FadeInView>

        <FadeInView delay={500} style={styles.checklistSection}>
          <Text style={styles.checklistTitle}>Your story starts here</Text>
          {benefits.map((benefit, index) => (
            <View key={benefit} style={styles.checklistRow}>
              <PopInView delay={700 + index * 150} from={0.2}>
                <Ionicons name="checkmark" size={18} color={colors.connectedBright} />
              </PopInView>
              <Text style={styles.checklistText}>{benefit}</Text>
            </View>
          ))}
        </FadeInView>

        <FadeInView delay={650} style={styles.actions}>
          <Button
            title="Explore our shared space"
            variant="primary"
            pill
            onPress={() => exitInviteFlow(navigation)}
            style={styles.enterButton}
            textStyle={styles.enterText}
          />
        </FadeInView>
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
  padlocks: {
    width: 172,
    height: 130,
    marginTop: 40,
  },
  titleBlock: {
    alignItems: 'center',
    marginTop: 56,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 28,
    lineHeight: 36,
    color: colors.connectedBright,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    lineHeight: 21,
    color: colors.textFaint,
    marginTop: 4,
  },
  cardWrap: {
    alignSelf: 'stretch',
    marginTop: 20,
  },
  spaceCard: {
    alignItems: 'center',
    paddingVertical: 18,
    gap: 6,
  },
  spaceLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 17,
    color: colors.textFaint,
  },
  spaceNames: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    lineHeight: 26,
    color: colors.textPrimary,
  },
  checklistSection: {
    alignSelf: 'stretch',
    paddingHorizontal: spacing.sm,
    marginTop: 32,
    gap: 14,
  },
  checklistTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    lineHeight: 20,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  checklistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  checklistText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  actions: {
    alignSelf: 'stretch',
    marginTop: 40,
  },
  enterButton: {
    height: 64,
    borderRadius: radius.pill,
  },
  enterText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
  },
});
