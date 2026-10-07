import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import Button from '../../../components/Button';
import { markFaqHelpful } from '../../../state/supportSlice';
import { colors, spacing, radius, typography, fontFamily } from '../../../theme';

function RichParagraph({ text, style }) {
  const parts = text.split('**');
  return (
    <Text style={style}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <Text key={i} style={styles.bold}>
            {part}
          </Text>
        ) : (
          part
        )
      )}
    </Text>
  );
}

export default function FaqArticleScreen({ navigation, route }) {
  const faqs = useSelector((state) => state.support.faqs);
  const dispatch = useDispatch();
  const faqId = route?.params?.faqId;
  const faq = faqs.find((f) => f.id === faqId) || faqs[0];
  const [helpful, setHelpful] = React.useState(faq.helpful ?? null);

  const handleHelpful = (value) => {
    setHelpful(value);
    dispatch(markFaqHelpful({ faqId: faq.id, helpful: value }));
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="FAQ Article" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.categoryLabel}>{faq.categoryLabel}</Text>
        <Text style={styles.title}>{faq.question}</Text>
        <Text style={styles.meta}>
          {faq.publishedLabel} • {faq.readTime}
        </Text>

        <SettingsCard style={styles.bodyCard}>
          {faq.body.map((paragraph, i) => (
            <RichParagraph key={i} text={paragraph} style={[styles.paragraph, i > 0 && styles.paragraphSpaced]} />
          ))}
          <View style={styles.divider} />
          <Text style={styles.note}>{faq.note}</Text>
        </SettingsCard>
      </ScrollView>

      {/* Pinned to the bottom of the screen; the article scrolls above it. */}
      <View style={styles.footer}>
        <SettingsCard style={styles.helpfulCard}>
          <Text style={styles.helpfulTitle}>Was this article helpful?</Text>
          <View style={styles.helpfulRow}>
            <Button
              title="Yes"
              variant={helpful === true ? 'primary' : 'outline'}
              pill
              onPress={() => handleHelpful(true)}
              style={styles.helpfulButton}
            />
            <Button
              title="No"
              variant={helpful === false ? 'primary' : 'outline'}
              pill
              onPress={() => handleHelpful(false)}
              style={styles.helpfulButton}
            />
          </View>
        </SettingsCard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceMuted,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  categoryLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
  },
  title: {
    ...typography.heading3,
    fontFamily: fontFamily.bold,
    fontSize: 20,
    marginTop: spacing.xs,
  },
  meta: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 12,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  bodyCard: {
    marginBottom: spacing.sm,
  },
  paragraph: {
    ...typography.body,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textPrimary,
  },
  paragraphSpaced: {
    marginTop: spacing.md,
  },
  bold: {
    fontFamily: fontFamily.bold,
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: colors.borderRow,
    marginVertical: spacing.lg,
  },
  note: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
  },
  helpfulCard: {
    alignItems: 'center',
    gap: spacing.lg,
  },
  helpfulTitle: {
    ...typography.heading3,
    fontFamily: fontFamily.bold,
    fontSize: 15,
  },
  helpfulRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    width: '100%',
  },
  helpfulButton: {
    flex: 1,
  },
});
