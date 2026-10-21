import React from 'react';
import { View, Text, Image, ScrollView, Linking, Alert, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import Button from '../../../components/Button';
import FadeInView from '../../../components/FadeInView';
import { subscriptionService } from '../../../services';
import { daysUntil, RENEW_WINDOW_DAYS } from '../../../utils/dateFormat';
import { colors, spacing, radius, fontFamily, typography } from '../../../theme';

const crownIcon = require('../../../assets/icons/crown-icon.png');
const checkIcon = require('../../../assets/icons/perk-check-icon.png');

// "My pro plan": plan summary, perks and terms. Renew opens the hosted payment page.
export default function PlanDetailsScreen({ navigation }) {
  const { offer, renewsOn } = useSelector((state) => state.account.subscription);
  const canRenew = daysUntil(renewsOn) <= RENEW_WINDOW_DAYS;
  const [loading, setLoading] = React.useState(false);

  const renew = async () => {
    setLoading(true);
    try {
      const { url } = await subscriptionService.getCheckoutUrl(offer.id);
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Payment unavailable', "We couldn't open the payment page. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader large transparent titleStyle={typography.headerMedium} title="My pro plan" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <FadeInView>
          <SettingsCard radiusSize={radius.xl} style={styles.planCard}>
            <View style={styles.planHeader}>
              <Text style={styles.planName}>{offer.name}</Text>
              <View style={[styles.chip, styles.chipOrange]}>
                <Text style={[styles.chipText, { color: colors.warning }]}>{offer.badge}</Text>
              </View>
              <View style={styles.flex} />
              <View style={[styles.chip, styles.chipBlue]}>
                <Text style={[styles.chipText, { color: colors.chipBlue }]}>Save {offer.savePercent}%</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.priceRow}>
              <Text style={styles.price}>{offer.price}</Text>
              <Text style={styles.period}> /{offer.period}</Text>
            </View>
            <Text style={styles.equivalent}>Just {offer.perMonth}/month, billed yearly</Text>
          </SettingsCard>
        </FadeInView>

        <FadeInView delay={120}>
          <SettingsCard radiusSize={radius.xl} style={styles.perksCard}>
            <Text style={styles.perksTitle}>Your pro perks</Text>
            {offer.benefits.map((benefit, index) => {
              const isLast = index === offer.benefits.length - 1;
              return (
                <View key={benefit.title} style={styles.perkRow}>
                  <View style={styles.perkIcon}>
                    {isLast ? (
                      <MaterialCommunityIcons name="check-decagram-outline" size={24} color={colors.connectedBright} />
                    ) : (
                      <Image source={checkIcon} style={styles.check} />
                    )}
                  </View>
                  <View style={styles.flex}>
                    <Text style={styles.perkTitle}>{benefit.title}</Text>
                    <Text style={styles.perkText}>{benefit.description}</Text>
                  </View>
                </View>
              );
            })}
          </SettingsCard>
        </FadeInView>

        <FadeInView delay={240}>
          <SettingsCard radiusSize={radius.lg} style={styles.termsCard}>
            <View style={styles.termsHeader}>
              <Image source={crownIcon} style={styles.crown} tintColor={colors.textPrimary} />
              <Text style={styles.termsTitle}>Subscription details</Text>
            </View>
            <Text style={styles.termsText}>
              Your plan renews automatically at {offer.price}/{offer.period}. To cancel your subscription, please contact our customer support helpline before your next renewal.
            </Text>
          </SettingsCard>
        </FadeInView>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Renew plan" variant={canRenew ? 'primary' : 'softGray'} disabled={!canRenew} pill loading={loading} onPress={renew} style={styles.button} textStyle={styles.buttonText} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceMuted,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: 2,
    paddingBottom: 24,
    gap: 22,
  },
  flex: {
    flex: 1,
  },
  planCard: {
    paddingHorizontal: 24,
    paddingTop: 22,
    paddingBottom: 20,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  planName: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    lineHeight: 28,
    color: colors.navyText,
  },
  chip: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  chipOrange: {
    backgroundColor: colors.warningSoft,
  },
  chipBlue: {
    backgroundColor: colors.chipBlueBackground,
  },
  chipText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
  },
  divider: {
    height: 1,
    backgroundColor: colors.progressTrack,
    marginTop: 16,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 16,
  },
  price: {
    fontFamily: fontFamily.bold,
    fontSize: 38,
    lineHeight: 46,
    color: colors.connectedBright,
  },
  period: {
    fontFamily: fontFamily.regular,
    fontSize: 18,
    color: colors.fieldLabel,
  },
  equivalent: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.fieldLabel,
    marginTop: 6,
  },
  perksCard: {
    paddingHorizontal: 24,
    paddingTop: 22,
    paddingBottom: 16,
  },
  perksTitle: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    lineHeight: 17,
    color: colors.fieldLabel,
    marginBottom: 10,
  },
  perkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 8,
  },
  perkIcon: {
    width: 24,
    alignItems: 'center',
  },
  check: {
    width: 20,
    height: 20,
  },
  perkTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    lineHeight: 20,
    color: colors.navyText,
  },
  perkText: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 17,
    color: colors.fieldLabel,
  },
  termsCard: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowOpacity: 0,
    elevation: 0,
  },
  termsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  crown: {
    width: 24,
    height: 24,
  },
  termsTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.textPrimary,
  },
  termsText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 19,
    color: colors.fieldLabel,
    marginTop: 8,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 26,
  },
  button: {
    height: 64,
    borderRadius: radius.pill,
  },
  buttonText: {
    fontSize: 18,
  },
});
