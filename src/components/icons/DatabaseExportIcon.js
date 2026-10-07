import React from 'react';
import Svg, { Path } from 'react-native-svg';

// Database with a download arrow (database-export.svg), used for "Data export".
export default function DatabaseExportIcon({ size = 24, color = '#141414' }) {
  const stroke = { stroke: color, strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M19 16V22M16 19L19 22L22 19" {...stroke} />
      <Path d="M4 6V12C4 12 4 15 11 15C18 15 18 12 18 12V6" {...stroke} />
      <Path d="M11 3C18 3 18 6 18 6C18 6 18 9 11 9C4 9 4 6 4 6C4 6 4 3 11 3Z" {...stroke} />
      <Path d="M11 21C4 21 4 18 4 18V12" {...stroke} />
    </Svg>
  );
}
