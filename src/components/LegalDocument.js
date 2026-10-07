import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ScreenHeader from './ScreenHeader';
import SettingsCard from './SettingsCard';
import { colors, spacing, radius, fontFamily, typography } from '../theme';

// A long-form legal page (Terms of Service, Privacy Policy): header, an info card, numbered sections and a footer.
export default function LegalDocument({ title, iconName, cardTitle, cardSubtitle, sections, footer, onBack }) {
  return (
    <View style={styles.container}>
      <ScreenHeader large titleStyle={typography.headerSemi} title={title} onBack={onBack} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SettingsCard radiusSize={radius.xl} noPadding style={styles.infoCard}>
          <MaterialCommunityIcons name={iconName} size={28} color={colors.fieldLabel} />
          <View>
            <Text style={styles.infoTitle}>{cardTitle}</Text>
            <Text style={styles.infoSubtitle}>{cardSubtitle}</Text>
          </View>
        </SettingsCard>

        {sections.map((section) => (
          <View key={section.heading} style={styles.section}>
            <Text style={styles.heading}>{section.heading}</Text>
            <Text style={styles.body}>{section.body}</Text>
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerVersion}>{footer.version}</Text>
          <Text style={styles.footerCopyright}>{footer.copyright}</Text>
        </View>
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
    paddingTop: 22,
    paddingBottom: 40,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    minHeight: 60,
    paddingLeft: 12,
    paddingRight: spacing.lg,
  },
  infoTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    lineHeight: 17,
    color: colors.textStrong,
  },
  infoSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    lineHeight: 15,
    color: colors.textLight,
    marginTop: 1,
  },
  section: {
    paddingTop: 16,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderDivider,
  },
  heading: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0.15,
    color: colors.textStrong,
  },
  body: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 17,
    color: colors.textSlate,
    marginTop: 8,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 28,
  },
  footerVersion: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textLight,
  },
  footerCopyright: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    lineHeight: 15,
    color: colors.textSlate,
    marginTop: 3,
  },
});
