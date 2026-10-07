import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors, fontFamily } from '../theme';

// Circular progress: grey track with a dark arc that starts at 12 o'clock.
export default function ProgressRing({ percent, size = 172, trackWidth = 8, progressWidth = 6, label = 'Complete' }) {
  const radius = (size - trackWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, percent));
  const center = size / 2;

  return (
    <View style={{ width: size, height: size }} accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 100, now: clamped }}>
      <Svg width={size} height={size}>
        <Circle cx={center} cy={center} r={radius} stroke={colors.progressTrack} strokeWidth={trackWidth} fill="none" />
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={colors.buttonDark}
          strokeWidth={progressWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference * (1 - clamped / 100)}
          transform={`rotate(-90 ${center} ${center})`}
        />
      </Svg>
      <View style={styles.labelWrap} pointerEvents="none">
        <Text style={styles.percent}>{clamped}%</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  labelWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  percent: {
    fontFamily: fontFamily.bold,
    fontSize: 36,
    lineHeight: 44,
    color: colors.buttonDark,
  },
  label: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textSlate,
    marginTop: 2,
  },
});
