import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import SoftBlob from './SoftBlob';
import { colors } from '../theme';

// Dust / smoke puffs that billow out of the wardrobe as the doors open.
// `progress` (0 -> 1) is driven by the parent; each puff runs inside its own
// slice of it. Positions are fractions of the closet size, measured from its
// centre: x/y = start, dx/dy = drift, r = blob size, d = start delay.
const PUFFS = [
  // along the door seam
  { x: 0.05, y: -0.05, dx: -0.18, dy: -0.2, r: 0.45, d: 0.0 },
  { x: 0.05, y: 0.12, dx: 0.2, dy: -0.08, r: 0.5, d: 0.04 },
  { x: 0.0, y: 0.25, dx: -0.12, dy: 0.12, r: 0.42, d: 0.08 },
  // rolling out along the floor
  { x: -0.25, y: 0.42, dx: -0.35, dy: 0.04, r: 0.38, d: 0.1 },
  { x: 0.3, y: 0.42, dx: 0.38, dy: 0.02, r: 0.4, d: 0.12 },
  { x: -0.05, y: 0.45, dx: -0.1, dy: 0.1, r: 0.46, d: 0.16 },
  { x: 0.12, y: 0.46, dx: 0.16, dy: 0.12, r: 0.36, d: 0.2 },
  // escaping past the door edges
  { x: -0.32, y: 0.0, dx: -0.3, dy: -0.22, r: 0.34, d: 0.14 },
  { x: 0.4, y: -0.05, dx: 0.32, dy: -0.25, r: 0.34, d: 0.18 },
  { x: 0.05, y: -0.3, dx: 0.06, dy: -0.32, r: 0.3, d: 0.24 },
];
const TINTS = [colors.white, colors.smokeLight, colors.smokeDust];
const LIFE = 0.7; // share of `progress` each puff lives for

export default function SmokeBurst({ progress, size }) {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {PUFFS.map((p, i) => {
        const local = progress.interpolate({
          inputRange: [p.d, p.d + LIFE],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        });
        const blob = p.r * size * 1.3;
        return (
          <Animated.View
            key={i}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              marginLeft: p.x * size - blob / 2,
              marginTop: p.y * size - blob / 2,
              opacity: local.interpolate({ inputRange: [0, 0.15, 1], outputRange: [0, 0.95, 0] }),
              transform: [
                { translateX: local.interpolate({ inputRange: [0, 1], outputRange: [0, p.dx * size] }) },
                { translateY: local.interpolate({ inputRange: [0, 1], outputRange: [0, p.dy * size] }) },
                { scale: local.interpolate({ inputRange: [0, 1], outputRange: [0.4, 2] }) },
              ],
            }}
          >
            <SoftBlob size={blob} color={TINTS[i % TINTS.length]} />
          </Animated.View>
        );
      })}
    </View>
  );
}
