import React from 'react';
import Svg, { Path } from 'react-native-svg';

// Left arrow from Figma (arrow-left.svg), used by every screen header.
export default function BackArrowIcon({ size = 40, color = '#141414' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <Path d="M30.832 20H10M19.9994 30L10 20L19.9994 10" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}
