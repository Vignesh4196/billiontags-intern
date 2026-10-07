import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import HexPattern from '../../../components/HexPattern';
import Button from '../../../components/Button';
import { subscriptionService } from '../../../services';
import { renewPlan } from '../../../state/accountSlice';
import { formatShortDate } from '../../../utils/dateFormat';
import { colors, spacing, radius, fontFamily, typography, shadow } from '../../../theme';

const walletIcon = require('../../../assets/icons/wallet-icon.png');

export default function PlanDetailsScreen({ navigation }) {
  const offer = useSelector((state) => state.account.subscription.offer);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const renew = async () => {
    setLoading(true);
    try {
      await subscriptionService.renewPlan(offer.id);
      const now = new Date();
      const nextYear = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
      dispatch(renewPlan({ renewsOn: formatShortDate(nextYear), date: formatShortDate(now), invoiceId: `INV-${now.getFullYear()}-${String(now.getTime()).slice(-3)}` }));
      navigation.popTo('Subscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader large transparent titleStyle={typography.headerMedium} title="Plan details" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SettingsCard radiusSize={radius.xl} style={styles.planCard}>
          <HexPattern topColor="#22C55E" bottomColor="#86EFAC" width={230} height={300} top={-6} />
          <View style={styles.planHeader}>
            <Text style={styles.planName}>{offer.name}</Text>
            <View style={[styles.chip, styles.chipGreen]}>
              <Text style={[styles.chipText, { color: colors.chipGreen }]}>Recommended</Text>
            </View>
            <View style={styles.flex} />
            <View style={[styles.chip, styles.chipBlue]}>
              <Text style={[styles.chipText, { color: colors.chipBlue }]}>Save {offer.savePercent}%</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.priceRow}>
            <Text style={styles.price}>{offer.price}</Text>
            <Text style={styles.period}> / {offer.period}</Text>
          </View>
          <Text style={styles.equivalent}>
            Equivalent to just <Text style={styles.bold}>{offer.perMonth} / month</Text> (billed annually)
          </Text>
          <View style={styles.saveBox}>
            <MaterialCommunityIcons name="creation" size={18} color={colors.chipBlue} />
            <Text style={styles.saveText}>
              You save <Text style={styles.boldDark}>{offer.yearlySaving} / year</Text> compared to the monthly rolling subscription.
            </Text>
          </View>
        </SettingsCard>

        <SettingsCard radiusSize={radius.xl} style={styles.benefitsCard}>
          <Text style={styles.benefitsTitle}>Comprehensive Pro benefits</Text>
          {offer.benefits.map((benefit, index) => {
            const isLast = index === offer.benefits.length - 1;
            return (
              <View key={benefit} style={styles.benefitRow}>
                {isLast ? (
                  <MaterialCommunityIcons name="check-decagram-outline" size={22} color={colors.toggleOn} />
                ) : (
                  <Ionicons name="checkmark" size={22} color={colors.toggleOn} />
                )}
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            );
          })}
        </SettingsCard>

        <SettingsCard radiusSize={radius.lg} style={styles.termsCard}>
          <View style={styles.termsHeader}>
            <Image source={walletIcon} style={styles.icon} tintColor={colors.textPrimary} />
            <Text style={styles.termsTitle}>Subscription terms</Text>
          </View>
          <Text style={styles.termsText}>
            Your membership auto-renews at {offer.price}/{offer.period}. Cancel anytime in account settings at least 24 hours before your billing cycle ends to avoid auto-charges.
          </Text>
        </SettingsCard>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Renew Plan" variant="navy" pill loading={loading} onPress={renew} style={styles.button} textStyle={styles.buttonText} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceCool,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 2,
    paddingBottom: 24,
  },
  flex: {
    flex: 1,
  },
  icon: {
    width: 24,
    height: 24,
  },
  planCard: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 18,
    overflow: 'hidden',
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
  chipGreen: {
    backgroundColor: colors.successSoftBackground,
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
    marginTop: 18,
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
    fontSize: 15,
    lineHeight: 20,
    color: colors.fieldLabel,
    marginTop: 6,
  },
  bold: {
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },
  saveBox: {
    flexDirection: 'row',
    gap: 10,
    borderRadius: radius.sm,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginTop: 14,
    marginLeft: 12,
    ...shadow.cardSoft,
  },
  saveText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 17,
    color: colors.fieldLabel,
  },
  boldDark: {
    fontFamily: fontFamily.semiBold,
    color: colors.textPrimary,
  },
  benefitsCard: {
    marginTop: 22,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 18,
  },
  benefitsTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.8,
    color: colors.fieldLabel,
    marginBottom: 12,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 7,
  },
  benefitText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textStrong,
  },
  termsCard: {
    marginTop: 22,
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
    paddingHorizontal: 24,
    paddingBottom: 26,
    backgroundColor: colors.surfaceCool,
  },
  button: {
    height: 64,
    borderRadius: radius.pill,
  },
  buttonText: {
    fontSize: 18,
  },
});
