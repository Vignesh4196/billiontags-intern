import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

// List with two bullets and a check on the last row (Profile Bio and Pictures sync).
export default function ListCheckIcon({ size = 24, color = '#8E8E93' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={4} y={5} width={2} height={2} fill={color} />
      <Rect x={4} y={11} width={2} height={2} fill={color} />
      <Path d="M9 6H20M9 12H20M9 18H20" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M3.5 17.5L5 19L7 16.5" stroke={color} strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
