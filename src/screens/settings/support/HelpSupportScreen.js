import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import { colors, spacing, radius, fontFamily, typography, shadow } from '../../../theme';

const APP_VERSION = 'Version 1.1.0 (Build 2026)';

function IconTile({ name }) {
  return (
    <View style={styles.iconTile}>
      <MaterialCommunityIcons name={name} size={22} color={colors.textPrimary} />
    </View>
  );
}

export default function HelpSupportScreen({ navigation }) {
  const faqs = useSelector((state) => state.support.faqs);
  const [query, setQuery] = React.useState('');

  const normalized = query.trim().toLowerCase();
  const visibleFaqs = (normalized
    ? faqs.filter((faq) => faq.question.toLowerCase().includes(normalized))
    : faqs
  ).slice(0, normalized ? faqs.length : 4);

  return (
    <View style={styles.container}>
      <ScreenHeader large transparent titleStyle={typography.headerMedium} title="Help & support" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.search}>
          <Ionicons name="search-outline" size={20} color={colors.fieldLabel} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search help articles, faqs..."
            placeholderTextColor={colors.textFaint}
            style={styles.searchInput}
            returnKeyType="search"
          />
        </View>

        <SettingsCard radiusSize={radius.lg} style={styles.rowCard}>
          <IconTile name="account-box-outline" />
          <View style={styles.flex}>
            <Text style={styles.cardTitle}>Contact us</Text>
            <Text style={styles.cardSubtitle}>Track your active requests</Text>
          </View>
        </SettingsCard>

        <SettingsCard radiusSize={radius.xl} style={styles.faqCard}>
          <View style={styles.faqHeader}>
            <IconTile name="message-question-outline" />
            <View style={styles.flex}>
              <Text style={styles.faqHeaderTitle}>Common faqs</Text>
              <Text style={styles.cardSubtitle}>Frequently asked questions</Text>
            </View>
          </View>

          <View style={styles.faqList}>
            {visibleFaqs.length === 0 && <Text style={styles.empty}>No articles match “{query}”.</Text>}
            {visibleFaqs.map((faq, index) => (
              <TouchableOpacity
                key={faq.id}
                style={[styles.faqRow, index < visibleFaqs.length - 1 && styles.rowBorder]}
                activeOpacity={0.6}
                onPress={() => navigation.navigate('FaqArticle', { faqId: faq.id })}
                accessibilityRole="button"
              >
                <Text style={styles.faqQuestion}>{faq.question}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.faqHeader}>
            <IconTile name="message-question-outline" />
            <View style={styles.flex}>
              <Text style={styles.faqHeaderTitle}>Feedback & Suggestions</Text>
              <Text style={styles.cardSubtitle}>Your voice helps us make SuperBae better.</Text>
            </View>
          </View>
        </SettingsCard>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.links}>
          <Text style={styles.link} onPress={() => navigation.navigate('TermsOfService')}>Terms of Service</Text>
          <Text style={styles.linkDivider}>  |  </Text>
          <Text style={styles.link} onPress={() => navigation.navigate('PrivacyPolicy')}>Privacy Policy</Text>
        </View>
        <Text style={styles.version}>{APP_VERSION}</Text>
      </View>
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
    paddingTop: 10,
    paddingBottom: 24,
  },
  flex: {
    flex: 1,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    paddingHorizontal: 18,
    ...shadow.cardSoft,
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.textPrimary,
    outlineStyle: 'none',
  },
  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 24,
    paddingHorizontal: 15,
    paddingVertical: 14,
  },
  iconTile: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.iconBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    lineHeight: 21,
    color: colors.textPrimary,
  },
  cardSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 17,
    color: colors.textMuted,
    marginTop: 2,
  },
  faqCard: {
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingVertical: 6,
  },
  faqHeaderTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    lineHeight: 21,
    color: colors.textPrimary,
  },
  faqList: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.progressTrack,
    marginVertical: 12,
    overflow: 'hidden',
  },
  faqRow: {
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderRow,
  },
  faqQuestion: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    lineHeight: 21,
    color: colors.textPrimary,
  },
  empty: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.textMuted,
    padding: 18,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 36,
    gap: 14,
  },
  links: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: colors.textBody,
    textDecorationLine: 'underline',
  },
  linkDivider: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: colors.textBody,
  },
  version: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.textFaint,
  },
});
