import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Circle } from 'react-native-svg';
import { colors } from '../theme';

// Soft pink / blue / yellow colour blobs behind the verification screens.
const blobs = [
  { id: 'pink', color: colors.blobPink, cx: '22%', cy: '9%', r: '38%' },
  { id: 'blue', color: colors.blobBlue, cx: '80%', cy: '9%', r: '36%' },
  { id: 'yellow', color: colors.blobYellow, cx: '14%', cy: '62%', r: '34%' },
];

export default function GradientBackdrop() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width="100%" height="100%">
        <Defs>
          {blobs.map((blob) => (
            <RadialGradient key={blob.id} id={blob.id} cx="50%" cy="50%" r="50%">
              <Stop offset="0" stopColor={blob.color} stopOpacity="0.95" />
              <Stop offset="1" stopColor={blob.color} stopOpacity="0" />
            </RadialGradient>
          ))}
        </Defs>
        {blobs.map((blob) => (
          <Circle key={blob.id} cx={blob.cx} cy={blob.cy} r={blob.r} fill={`url(#${blob.id})`} />
        ))}
      </Svg>
    </View>
  );
}
