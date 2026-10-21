import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import Button from '../../../src/components/Button';
import Mascot from '../components/Mascot';
import StepHeader from '../components/StepHeader';
import StepBadge from '../components/StepBadge';
import PagerDots from '../components/PagerDots';
import ItemsCountPill from '../components/ItemsCountPill';
import WardrobeCloset from '../components/WardrobeCloset';
import { colors, fontFamily, spacing } from '../theme';

const TOTAL_STEPS = 3;
const STAGE_HEIGHT = 380;
const MAX_SHOWN = 8; // the wardrobe shows at most this many pieces, however many the AI sends

// Step 2 of 3 — "Build your perfect outfit from your wardrobe...": the wardrobe
// opens and the pieces the AI picked fly out and circle it.
export default function WardrobePicksScreen({ navigation }) {
  const picks = useSelector((s) => s.aiWardrobe.picks).slice(0, MAX_SHOWN);
  const [stageWidth, setStageWidth] = useState(0);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StepHeader onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.badgeRow}>
          <StepBadge current={2} total={TOTAL_STEPS} />
        </View>
        <View style={styles.mascotWrap}>
          <Mascot size={130} />
        </View>
        <Text style={styles.title}>Build your perfect outfit from your wardrobe...</Text>

        <View style={styles.stageWrap} onLayout={(e) => setStageWidth(e.nativeEvent.layout.width)}>
          <WardrobeCloset items={picks} width={stageWidth} height={STAGE_HEIGHT} />
        </View>

        <ItemsCountPill count={picks.length} style={styles.countPill} />
        <PagerDots total={3} current={2} />
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Back"
          variant="outline"
          pill
          scale={1.2}
          textStyle={styles.btnText}
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        />
        <Button
          title="Continue"
          pill
          scale={1.2}
          textStyle={styles.btnText}
          style={styles.continueBtn}
          onPress={() => navigation.navigate('OutfitReady')}
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
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: spacing.md,
  },
  mascotWrap: {
    alignItems: 'center',
    marginTop: -spacing.lg,
  },
  title: {
    fontFamily: fontFamily.semiBold,
    fontSize: 20,
    lineHeight: 28,
    color: colors.textHeading,
    marginTop: spacing.md,
  },
  stageWrap: {
    height: STAGE_HEIGHT,
    marginTop: spacing.sm,
    marginHorizontal: -spacing.sm,
  },
  countPill: {
    marginTop: 'auto',
    marginBottom: spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  backBtn: {
    flex: 4,
    marginRight: spacing.md,
  },
  continueBtn: {
    flex: 6,
  },
  btnText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 17,
  },
});
