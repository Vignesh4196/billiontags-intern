import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import SoftBlob from './SoftBlob';
import { colors } from '../theme';

// Magic over the opening wardrobe: four-point sparkles pop in together and keep shimmering
// across it (MagicGlow below adds the lavender glow behind it). Positions are
// fractions of the closet size from its centre.
const SPARKLES = [
  { x: -0.22, y: -0.18, s: 0.09, c: 'accentBorder', d: 0 },
  { x: 0.18, y: -0.3, s: 0.07, c: 'sparkleGold', d: 120 },
  { x: 0.05, y: -0.02, s: 0.06, c: 'accentBorder', d: 240 },
  { x: -0.12, y: 0.16, s: 0.05, c: 'white', d: 360 },
  { x: 0.28, y: 0.1, s: 0.08, c: 'accentBorder', d: 180 },
  { x: -0.36, y: -0.02, s: 0.06, c: 'sparkleGold', d: 300 },
  { x: 0.36, y: -0.34, s: 0.05, c: 'accentBorder', d: 420 },
  { x: -0.3, y: 0.34, s: 0.06, c: 'sparkleGold', d: 520 },
  { x: 0.22, y: 0.3, s: 0.05, c: 'white', d: 600 },
  { x: 0.0, y: -0.42, s: 0.07, c: 'accentBorder', d: 80 },
];
const STAR = 'M12 0 C13 7 17 11 24 12 C17 13 13 17 12 24 C11 17 7 13 0 12 C7 11 11 7 12 0 Z';

const POP_MS = 260; // all sparkles pop in together, almost at once
const SHIMMER_MS = 700; // then each one gently pulses (never disappears)

function Sparkle({ x, y, s, c, d, size }) {
  const t = useRef(new Animated.Value(0)).current; // 0 hidden -> 1 shown
  const shimmer = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const ease = Easing.inOut(Easing.sin);
    const pop = Animated.sequence([
      Animated.delay(d * 0.15),
      Animated.timing(t, { toValue: 1, duration: POP_MS, easing: Easing.out(Easing.back(2.2)), useNativeDriver: false }),
    ]);
    const half = SHIMMER_MS / 2 + (d % 200); // vary speed so they don't pulse in sync
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: half, easing: ease, useNativeDriver: false }),
        Animated.timing(shimmer, { toValue: 0, duration: half, easing: ease, useNativeDriver: false }),
      ])
    );
    pop.start();
    loop.start();
    return () => {
      pop.stop();
      loop.stop();
    };
  }, [t, shimmer, d]);

  const px = s * size;
  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: x * size - px / 2,
        marginTop: y * size - px / 2,
        opacity: Animated.multiply(t, shimmer.interpolate({ inputRange: [0, 1], outputRange: [1, 0.65] })),
        transform: [
          { scale: Animated.multiply(t, shimmer.interpolate({ inputRange: [0, 1], outputRange: [1, 0.7] })) },
          { rotate: t.interpolate({ inputRange: [0, 1], outputRange: ['-45deg', '0deg'] }) },
        ],
      }}
    >
      <Svg width={px} height={px} viewBox="0 0 24 24">
        <Path d={STAR} fill={colors[c]} />
      </Svg>
    </Animated.View>
  );
}

// Lavender glow that swells behind the wardrobe. `glow` 0 -> 1.
export function MagicGlow({ size, glow }) {
  const glowSize = size * 1.25;
  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const ease = Easing.inOut(Easing.sin);
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1600, easing: ease, useNativeDriver: false }),
        Animated.timing(pulse, { toValue: 0, duration: 1600, easing: ease, useNativeDriver: false }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);
  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: -glowSize / 2,
        marginTop: -glowSize / 2,
        opacity: Animated.multiply(glow, pulse.interpolate({ inputRange: [0, 1], outputRange: [0.75, 1] })),
        transform: [
          { scale: glow.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }) },
          { scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.06] }) },
        ],
      }}
    >
      <SoftBlob size={glowSize} color={colors.accentSoft} />
    </Animated.View>
  );
}

export default function MagicSparkles({ size }) {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {SPARKLES.map((sp, i) => (
        <Sparkle key={i} {...sp} size={size} />
      ))}
    </View>
  );
}
