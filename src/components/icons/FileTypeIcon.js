import React from 'react';
import Svg, { Path, Text as SvgText } from 'react-native-svg';

// Folded-corner file outline with a short label underneath ("CSV", "PDF").
export default function FileTypeIcon({ label, size = 24, color = '#141414' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 13V5.5C6 4.4 6.9 3.5 8 3.5H13.5L18 8V13M13.5 3.5V6.5C13.5 7.3 14.2 8 15 8H18"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <SvgText x="12" y="22" fill={color} fontSize="7.5" fontWeight="bold" textAnchor="middle">
        {label}
      </SvgText>
    </Svg>
  );
}
