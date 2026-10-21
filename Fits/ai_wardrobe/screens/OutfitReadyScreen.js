import React, { useRef, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../../src/components/Button';
import StepHeader from '../components/StepHeader';
import StepBadge from '../components/StepBadge';
import PagerDots from '../components/PagerDots';
import ItemsCountPill from '../components/ItemsCountPill';
import { outfitSummary, saveLook } from '../state/aiWardrobeSlice';
import { colors, fontFamily, radius, spacing } from '../theme';

const TOTAL_STEPS = 3;
const CARD_W = 300;
const CARD_H = 374;
const GAP = 30;
const PHONE_MAX = 440; // the design width; wider windows (Expo web) keep this layout

// Step 3 of 3 — "Your outfit is ready": swipe through the looks, then try another
// (back to the wardrobe step) or save the current one.
export default function OutfitReadyScreen({ navigation }) {
  const dispatch = useDispatch();
  const looks = useSelector((s) => s.aiWardrobe.looks);
  const saved = useSelector((s) => s.aiWardrobe.savedLooks);
  const { width: winW } = useWindowDimensions();
  const screenW = Math.min(winW, PHONE_MAX);
  const sidePad = (screenW - CARD_W) / 2; // centres the current card, neighbours peek in
  const [index, setIndex] = useState(0);
  const scroller = useRef(null);

  const look = looks[index] || looks[0];
  const isSaved = saved.includes(look.id);

  const onScroll = (e) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / (CARD_W + GAP));
    if (i !== index && i >= 0 && i < looks.length) setIndex(i);
  };
  const goTo = (i) => scroller.current?.scrollTo({ x: i * (CARD_W + GAP), animated: true });

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StepHeader onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.badgeRow}>
          <StepBadge current={3} total={TOTAL_STEPS} />
        </View>

        <View style={styles.intro}>
          <Text style={styles.title}>Your outfit is ready</Text>
          <Text style={styles.subtitle}>{`Here are ${looks.length} looks from your wardrobe for ${outfitSummary} mood.`}</Text>
        </View>

        <ScrollView
          ref={scroller}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_W + GAP}
          decelerationRate="fast"
          disableIntervalMomentum
          scrollEventThrottle={16}
          onScroll={onScroll}
          style={styles.carousel}
          contentContainerStyle={{ paddingHorizontal: sidePad }}
        >
          {looks.map((l, i) => (
            <View key={l.id} style={[styles.card, i < looks.length - 1 && { marginRight: GAP }]}>
              <Image source={l.image} style={styles.cardImage} resizeMode="cover" accessibilityLabel={l.title} />
            </View>
          ))}
        </ScrollView>

        <View style={styles.dotsRow}>
          {looks.map((l, i) => (
            <View key={l.id} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>

        <View style={styles.info}>
          <Text style={styles.lookCount}>{`Look ${index + 1} of ${looks.length}`}</Text>
          <Text style={styles.lookTitle}>{look.title}</Text>
          <Text style={styles.lookSubtitle}>{look.subtitle}</Text>
        </View>

        <ItemsCountPill count={look.itemCount} style={styles.pill} />
        <PagerDots total={3} current={3} />
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Try another"
          variant="outline"
          pill
          scale={1.2}
          textStyle={styles.btnText}
          style={styles.tryBtn}
          onPress={() => (index < looks.length - 1 ? goTo(index + 1) : navigation.goBack())}
        />
        <Button
          title={isSaved ? 'Saved ✓' : 'Save'}
          pill
          scale={1.2}
          textStyle={styles.btnText}
          style={styles.saveBtn}
          disabled={isSaved}
          onPress={() => dispatch(saveLook(look.id))}
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
  content: {
    flexGrow: 1,
    paddingBottom: spacing.lg,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: spacing.xl,
  },
  intro: {
    paddingHorizontal: spacing.xl,
    marginTop: spacing.lg,
  },
  title: {
    fontFamily: fontFamily.semiBold,
    fontSize: 22,
    lineHeight: 30,
    color: colors.textHeading,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
    marginTop: 4,
  },
  carousel: {
    flexGrow: 0,
    marginTop: 48,
  },
  card: {
    width: CARD_W,
    height: CARD_H,
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: colors.chipMuted,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  dot: {
    width: 14,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 3,
    backgroundColor: colors.borderTabBar,
  },
  dotActive: {
    width: 20,
    backgroundColor: colors.textPrimary,
  },
  info: {
    paddingHorizontal: spacing.xl,
    marginTop: spacing.lg,
  },
  lookCount: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.textSecondary,
  },
  lookTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 22,
    lineHeight: 30,
    color: colors.textHeading,
    marginTop: 2,
  },
  lookSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
    marginTop: 2,
  },
  pill: {
    marginTop: spacing.lg,
    marginBottom: 'auto',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  tryBtn: {
    flex: 4,
    marginRight: spacing.md,
  },
  saveBtn: {
    flex: 6,
  },
  btnText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 17,
  },
});
