import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, Image, StyleSheet, View } from 'react-native';

// The picked pieces fly out of the wardrobe one by one, then circle it slowly
// on an ellipse. Works for any number of items: they are spread evenly round
// the ellipse and shrink when there are many so they never overlap.
const ORBIT_MS = 32000; // one full lap
const SAMPLES = 72; // points used to draw sin/cos with Animated.interpolate
const START_ANGLE = (-3 * Math.PI) / 4; // first item starts top-left (as in the design)
const MAX_ITEM = 112;
const MIN_ITEM = 40;
const steps = Array.from({ length: SAMPLES + 1 }, (_, k) => k / SAMPLES);

export function itemSizeFor(count, rx, ry) {
  const lap = 2 * Math.PI * Math.sqrt((rx * rx + ry * ry) / 2);
  return Math.max(MIN_ITEM, Math.min(MAX_ITEM, (lap / Math.max(count, 1)) * 0.82));
}

function Piece({ item, index, count, spin, rx, ry, itemSize, emergeDelay }) {
  const out = useRef(new Animated.Value(0)).current; // 0 inside the closet -> 1 on the orbit

  useEffect(() => {
    const anim = Animated.sequence([
      Animated.delay(emergeDelay),
      Animated.timing(out, { toValue: 1, duration: 900, easing: Easing.out(Easing.back(1.3)), useNativeDriver: false }),
    ]);
    anim.start();
    return () => anim.stop();
  }, [out, emergeDelay]);

  const style = useMemo(() => {
    const phase = START_ANGLE + (2 * Math.PI * index) / count;
    const angles = steps.map((t) => phase + t * 2 * Math.PI);
    const ox = spin.interpolate({ inputRange: steps, outputRange: angles.map((a) => rx * Math.cos(a)) });
    const oy = spin.interpolate({ inputRange: steps, outputRange: angles.map((a) => ry * Math.sin(a)) });
    // pieces in front (lower half) look a touch bigger than the ones behind
    const depth = spin.interpolate({ inputRange: steps, outputRange: angles.map((a) => 0.9 + 0.1 * Math.sin(a)) });
    return {
      opacity: out.interpolate({ inputRange: [0, 0.15, 1], outputRange: [0, 1, 1], extrapolate: 'clamp' }),
      transform: [
        { translateX: Animated.multiply(ox, out) },
        { translateY: Animated.add(Animated.multiply(oy, out), out.interpolate({ inputRange: [0, 1], outputRange: [-itemSize * 0.15, 0] })) },
        { scale: Animated.multiply(depth, out.interpolate({ inputRange: [0, 1], outputRange: [0.15, 1] })) },
        { rotate: out.interpolate({ inputRange: [0, 1], outputRange: ['-25deg', '0deg'] }) },
      ],
    };
  }, [spin, out, index, count, rx, ry, itemSize]);

  return (
    <Animated.View
      style={[styles.piece, { width: itemSize, height: itemSize, marginLeft: -itemSize / 2, marginTop: -itemSize / 2 }, style]}
    >
      <Image source={item.image} style={styles.image} resizeMode="contain" accessibilityLabel={item.name} />
    </Animated.View>
  );
}

export default function OrbitingItems({ items, rx, ry, onAllOut }) {
  const spin = useRef(new Animated.Value(0)).current;
  const count = items.length;
  const itemSize = itemSizeFor(count, rx, ry);
  const stagger = Math.min(320, 1600 / Math.max(count, 1)); // keep the whole release under ~2.5 s

  useEffect(() => {
    if (!count) return undefined;
    spin.setValue(0);
    const lap = Animated.loop(
      Animated.timing(spin, { toValue: 1, duration: ORBIT_MS, easing: Easing.linear, useNativeDriver: false })
    );
    const outMs = stagger * (count - 1) + 900;
    const timer = setTimeout(() => {
      onAllOut?.();
      lap.start();
    }, outMs);
    return () => {
      clearTimeout(timer);
      lap.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spin, count, stagger]);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {items.map((item, i) => (
        <Piece
          key={item.id}
          item={item}
          index={i}
          count={count}
          spin={spin}
          rx={rx}
          ry={ry}
          itemSize={itemSize}
          emergeDelay={i * stagger}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  piece: {
    position: 'absolute',
    left: '50%',
    top: '50%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
