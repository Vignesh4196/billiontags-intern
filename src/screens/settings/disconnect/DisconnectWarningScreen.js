import React from 'react';
import { View, Text, Animated, Easing, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import Button from '../../../components/Button';
import FadeInView from '../../../components/FadeInView';
import PopInView from '../../../components/PopInView';
import { partnerService } from '../../../services';
import { setPartnerConnected } from '../../../state/settingsSlice';
import { finishFlow } from '../../../navigation/helpers';
import { colors, spacing, radius, fontFamily } from '../../../theme';

const illustration = require('../../../assets/images/broken-heart-illustration.png');

const SHARED_DATA = ['memories', 'plans', 'journal'];

const LOSSES = [
  'No shared memories and love notes',
  'No couple plans and special dates',
  'No access to shared personal updates',
];

// The heart pops in, then gives one small "heartbreak" wiggle.
function BrokenHeart() {
  const wiggle = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const step = (toValue) => Animated.timing(wiggle, { toValue, duration: 90, easing: Easing.inOut(Easing.quad), useNativeDriver: false });
    const animation = Animated.sequence([Animated.delay(450), step(1), step(-1), step(0.7), step(-0.7), step(0)]);
    animation.start();
    return () => animation.stop();
  }, [wiggle]);

  const rotate = wiggle.interpolate({ inputRange: [-1, 1], outputRange: ['-7deg', '7deg'] });

  return (
    <PopInView>
      <Animated.Image
        source={illustration}
        style={[styles.illustration, { transform: [{ rotate }] }]}
        resizeMode="contain"
        accessibilityLabel="Broken heart"
      />
    </PopInView>
  );
}

export default function DisconnectWarningScreen({ navigation }) {
  const dispatch = useDispatch();
  const [busy, setBusy] = React.useState(false);

  // Disconnects the partner and clears the shared data in one step, then shows Add partner.
  const disconnect = async () => {
    setBusy(true);
    try {
      await partnerService.deleteSyncData(SHARED_DATA);
      await partnerService.disconnect();
      dispatch(setPartnerConnected(false));
      finishFlow(navigation, 'DisconnectWarning', 'AddPartner');
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Partner settings" onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <BrokenHeart />

        <FadeInView delay={250} style={styles.textBlock}>
          <Text style={styles.title}>Disconnect your partner?</Text>
          <Text style={styles.body}>Your shared connection will end.</Text>
        </FadeInView>

        <FadeInView delay={350} style={styles.cardWrap}>
          <SettingsCard radiusSize={radius.lg} style={styles.card}>
            <Text style={styles.cardTitle}>What changes after disconnecting?</Text>
            {LOSSES.map((item, index) => (
              <View key={item} style={styles.lossRow}>
                <PopInView delay={550 + index * 150} from={0.2}>
                  <Ionicons name="close" size={18} color={colors.alertRed} />
                </PopInView>
                <Text style={styles.lossText}>{item}</Text>
              </View>
            ))}
          </SettingsCard>
        </FadeInView>

        <FadeInView delay={450} style={styles.actions}>
          <Button
            title="Yes, disconnect partner"
            variant="alert"
            pill
            loading={busy}
            onPress={disconnect}
            style={styles.button}
            textStyle={styles.buttonText}
          />
        </FadeInView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  // No scrolling: the illustration shrinks (flexShrink) on short screens so everything fits.
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
  },
  illustration: {
    width: 140,
    height: 132,
    flexShrink: 1,
    marginTop: 4,
  },
  textBlock: {
    alignItems: 'center',
    marginTop: 28,
  },
  title: {
    fontFamily: fontFamily.semiBold,
    fontSize: 22,
    lineHeight: 28,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  body: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 8,
  },
  cardWrap: {
    alignSelf: 'stretch',
    marginTop: 24,
  },
  card: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  cardTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.textPrimary,
  },
  lossRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg - 2,
  },
  lossText: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: colors.textMuted,
  },
  actions: {
    alignSelf: 'stretch',
    gap: 12,
    marginTop: 24,
  },
  button: {
    height: 64,
    borderRadius: 32,
  },
  buttonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
  },
});
