import React from 'react';
import Svg, { Path } from 'react-native-svg';

// Bucket-shaped outline used for Permissions; with `dots` it marks an in-progress item.
export default function PermissionsIcon({ size = 24, color = '#141414', dots = false }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 4.6C9.6 3.1 14.4 3.1 19 4.6L17.7 18.6C17.5 20.3 15.6 21 12 21C8.4 21 6.5 20.3 6.3 18.6L5 4.6Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {dots && (
        <Path d="M9.2 9.5H9.8M11.7 9.5H12.3M14.2 9.5H14.8" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      )}
    </Svg>
  );
}
