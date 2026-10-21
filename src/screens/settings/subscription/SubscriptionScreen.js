import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useSelector } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import Button from '../../../components/Button';
import { subscriptionService } from '../../../services';
import { downloadTextFile } from '../../../utils/download';
import { daysUntil, RENEW_WINDOW_DAYS } from '../../../utils/dateFormat';
import { colors, spacing, radius, fontFamily, typography } from '../../../theme';

const subscriptionIcon = require('../../../assets/icons/subscription-icon.png');
const billIcon = require('../../../assets/icons/bill-icon.png');
const downloadIcon = require('../../../assets/icons/download-icon.png');

function InvoiceRow({ invoice, onDownload, showBorder }) {
  return (
    <View style={[styles.invoiceRow, showBorder && styles.rowBorder]}>
      <View style={styles.flex}>
        <Text style={styles.invoiceTitle}>{invoice.title}</Text>
        <Text style={styles.invoiceMeta}>{invoice.date}  •  {invoice.id}</Text>
      </View>
      <Text style={styles.amount}>{invoice.amount}</Text>
      <View style={styles.paidChip}>
        <Text style={styles.paidText}>{invoice.status}</Text>
      </View>
      <TouchableOpacity onPress={onDownload} hitSlop={10} style={styles.download} accessibilityRole="button" accessibilityLabel={`Download invoice ${invoice.id}`}>
        <Image source={downloadIcon} style={styles.icon} tintColor={colors.navyText} />
      </TouchableOpacity>
    </View>
  );
}

export default function SubscriptionScreen({ navigation }) {
  const subscription = useSelector((state) => state.account.subscription);
  const canRenew = daysUntil(subscription.renewsOn) <= RENEW_WINDOW_DAYS;

  const downloadInvoice = async (invoice) => {
    const { url } = await subscriptionService.getInvoiceUrl(invoice.id);
    if (url) {
      Linking.openURL(url);
      return;
    }
    downloadTextFile(`${invoice.id}.txt`, `SuperBae invoice ${invoice.id}\n${invoice.title}\n${invoice.date}\n${invoice.amount} — ${invoice.status}`);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader large transparent titleStyle={typography.headerMedium} title="Subscription" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.planCard}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('PlanDetails')}
          accessibilityRole="button"
          accessibilityLabel="View plan details"
        >
          <View style={styles.planTop}>
            <View style={styles.flex}>
              <Text style={styles.overline}>CURRENT PLAN</Text>
              <Text style={styles.planName}>{subscription.planName}</Text>
            </View>
            <Image source={subscriptionIcon} style={styles.icon} tintColor={colors.white} />
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{subscription.price}</Text>
            <Text style={styles.period}> /{subscription.period}</Text>
          </View>
          <View style={styles.planDivider} />
          <View style={styles.renewRow}>
            <Text style={styles.renewLabel}>Renews automatically on</Text>
            <Text style={styles.renewDate}>{subscription.renewsOn}</Text>
          </View>
        </TouchableOpacity>

        <SettingsCard radiusSize={radius.xl} style={styles.invoiceCard}>
          <View style={[styles.invoiceHeader, styles.rowBorder]}>
            <Image source={billIcon} style={styles.icon} tintColor={colors.navyText} />
            <Text style={styles.invoiceHeading}>Recent invoices</Text>
            <Text style={styles.receiptCount}>{subscription.invoices.length} receipts</Text>
          </View>
          {subscription.invoices.slice(0, 3).map((invoice, index, list) => (
            <InvoiceRow key={invoice.id} invoice={invoice} showBorder={index < list.length - 1} onDownload={() => downloadInvoice(invoice)} />
          ))}
        </SettingsCard>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Renew Plan" variant={canRenew ? 'primary' : 'softGray'} disabled={!canRenew} pill onPress={() => navigation.navigate('PlanDetails')} style={styles.button} textStyle={styles.buttonText} />
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
  },
  flex: {
    flex: 1,
  },
  icon: {
    width: 24,
    height: 24,
  },
  planCard: {
    borderRadius: radius.xl,
    backgroundColor: colors.textPrimary,
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 24,
    overflow: 'hidden',
  },
  planTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  overline: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: 0.3,
    color: colors.textFaint,
  },
  planName: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    lineHeight: 28,
    color: colors.white,
    marginTop: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 18,
  },
  price: {
    fontFamily: fontFamily.bold,
    fontSize: 30,
    lineHeight: 38,
    color: colors.connectedBright,
  },
  period: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.textFaint,
  },
  planDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
    marginTop: 18,
  },
  renewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  renewLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: colors.textFaint,
  },
  renewDate: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.white,
  },
  invoiceCard: {
    marginTop: 22,
    paddingHorizontal: 23,
    paddingTop: 10,
    paddingBottom: 6,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.progressTrack,
  },
  invoiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 14,
  },
  invoiceHeading: {
    flex: 1,
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.navyText,
  },
  receiptCount: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: colors.fieldLabel,
  },
  invoiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    gap: 6,
  },
  invoiceTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    lineHeight: 20,
    color: colors.navyText,
  },
  invoiceMeta: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 17,
    color: colors.fieldLabel,
    marginTop: 3,
  },
  amount: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: colors.navyText,
  },
  paidChip: {
    borderRadius: 4,
    backgroundColor: colors.successSoftBackground,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  paidText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.chipGreen,
  },
  download: {
    marginLeft: 12,
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
