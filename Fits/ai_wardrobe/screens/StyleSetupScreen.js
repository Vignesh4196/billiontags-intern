import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import BackArrowIcon from '../../../src/components/icons/BackArrowIcon';
import Button from '../../../src/components/Button';
import Mascot from '../components/Mascot';
import StepBadge from '../components/StepBadge';
import OptionGrid from '../components/OptionGrid';
import { occasions, moods, preferences, setOccasion, setMood } from '../state/aiWardrobeSlice';
import { colors, fontFamily, radius, shadow, spacing } from '../theme';

const TOTAL_STEPS = 3;

// Step 1 of 3 — "Where are we going today?": occasion + mood + preference.
export default function StyleSetupScreen({ navigation }) {
  const dispatch = useDispatch();
  const occasion = useSelector((s) => s.aiWardrobe.occasion);
  const mood = useSelector((s) => s.aiWardrobe.mood);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12} accessibilityLabel="Go back">
          <BackArrowIcon size={36} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.badgeRow}>
          <StepBadge current={1} total={TOTAL_STEPS} />
        </View>

        <View style={styles.mascotWrap}>
          <Mascot size={140} />
        </View>
        <View style={styles.promptCard}>
          <Text style={styles.promptTitle}>Where are we going today?</Text>
          <Text style={styles.promptSubtitle}>Your mood helps me style the perfect outfit for you.</Text>
        </View>

        <Text style={styles.sectionTitle}>Occasion</Text>
        <OptionGrid options={occasions} selectedId={occasion} onSelect={(id) => dispatch(setOccasion(id))} />

        <Text style={styles.sectionTitle}>Mood</Text>
        <OptionGrid options={moods} selectedId={mood} onSelect={(id) => dispatch(setMood(id))} />

        <View style={styles.prefCard}>
          <Text style={styles.prefTitle}>Preference</Text>
          {preferences.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={styles.prefRow}
              onPress={() => navigation.navigate('Placeholder', { title: p.label })}
            >
              <Image source={p.icon} style={styles.prefIcon} resizeMode="contain" />
              <Text style={styles.prefLabel}>{p.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Let’s Style You  ✨"
          pill
          scale={1.2}
          textStyle={styles.ctaText}
          onPress={() => navigation.navigate('WardrobePicks')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topBar: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: radius.xxl,
    borderBottomRightRadius: radius.xxl,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    zIndex: 2,
    ...shadow.cardSoft,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: spacing.lg,
    paddingRight: spacing.lg,
  },
  mascotWrap: {
    alignItems: 'center',
    marginTop: -spacing.sm,
  },
  promptCard: {
    alignSelf: 'center',
    width: '86%',
    backgroundColor: colors.white,
    borderRadius: radius.xxl,
    borderWidth: 1,
    borderColor: colors.borderDivider,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.xl,
    ...shadow.card,
  },
  promptTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 20,
    lineHeight: 26,
    color: colors.textHeading,
  },
  promptSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 15,
    lineHeight: 21,
    color: colors.textLight,
    marginTop: 6,
  },
  sectionTitle: {
    fontFamily: fontFamily.medium,
    fontSize: 20,
    lineHeight: 26,
    color: colors.textHeading,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  prefCard: {
    backgroundColor: colors.white,
    borderRadius: radius.xxl,
    borderWidth: 1,
    borderColor: colors.borderDivider,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    marginTop: spacing.md,
    ...shadow.card,
  },
  prefTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.textHeading,
    marginBottom: spacing.sm,
  },
  prefRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  prefIcon: {
    width: 26,
    height: 26,
    marginRight: spacing.md,
  },
  prefLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 15,
    color: colors.textHeading,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  ctaText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 17,
  },
});
