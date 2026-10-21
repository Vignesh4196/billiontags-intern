import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import LogoSuperbae from '../../../src/components/icons/LogoSuperbae';
import Button from '../../../src/components/Button';
import Mascot from '../components/Mascot';
import { colors, fontFamily, radius, shadow, spacing } from '../theme';

const avatarSaara = require('../../../src/assets/images/avatar-saara.png');
const avatarArjun = require('../../../src/assets/images/avatar-arjun.png');
// Design shows 3 avatars; only 2 exist in the repo, so the stack reuses them.
const avatars = [avatarSaara, avatarArjun, avatarSaara];

export default function IntroScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <LogoSuperbae width={78} height={40} />
        <View style={styles.topRight}>
          <TouchableOpacity hitSlop={10}>
            <Ionicons name="notifications-outline" size={24} color={colors.textPrimary} />
            <View style={styles.bellDot} />
          </TouchableOpacity>
          <TouchableOpacity hitSlop={10} style={styles.menuBtn}>
            <Ionicons name="menu" size={26} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.center}>
        <View style={styles.mascotWrap}>
          <Mascot size={150} />
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>Hi there! I'm Ara</Text>
          <Text style={styles.subtitle}>Your personal AI stylist.</Text>
          <Text style={styles.subtitle}>
            I'll get to know your plans, mood and style to create outfits that feel so you.
          </Text>
        </View>
        <View style={styles.lovedRow}>
          <View style={styles.avatarStack}>
            {avatars.map((src, i) => (
              <Image key={i} source={src} style={[styles.avatar, { marginLeft: i === 0 ? 0 : -10 }]} />
            ))}
          </View>
          <Text style={styles.lovedText}>Loved by 10k girls</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button title="Start Styling  ✨" pill onPress={() => navigation.navigate('StyleSetup')} />
      </View>
    </SafeAreaView>
  );
}

const CARD_WIDTH = 292;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuBtn: {
    marginLeft: spacing.lg,
  },
  bellDot: {
    position: 'absolute',
    top: 1,
    right: 2,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.accent,
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mascotWrap: {
    zIndex: 2,
    marginBottom: -6,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.xl,
    paddingVertical: 18,
    ...shadow.card,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    lineHeight: 28,
    color: colors.textHeading,
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textLight,
  },
  lovedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: CARD_WIDTH,
    marginTop: spacing.lg,
    paddingLeft: spacing.xs,
  },
  avatarStack: {
    flexDirection: 'row',
    marginRight: spacing.md,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.white,
  },
  lovedText: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.textSecondary,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.sm,
  },
});
