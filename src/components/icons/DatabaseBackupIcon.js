import React from 'react';
import Svg, { Path } from 'react-native-svg';

// Database with a restore arrow (database-backup.svg), used for "System backup".
export default function DatabaseBackupIcon({ size = 24, color = '#141414' }) {
  const stroke = { stroke: color, strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 6V12C4 12 4 15 11 15C11.5925 15 12.1349 14.9785 12.6313 14.9392" {...stroke} />
      <Path d="M18 6V12" {...stroke} />
      <Path d="M11 3C18 3 18 6 18 6C18 6 18 9 11 9C4 9 4 6 4 6C4 6 4 3 11 3Z" {...stroke} />
      <Path d="M11 21C4 21 4 18 4 18V12" {...stroke} />
      <Path d="M22.6669 17.6667C22.0481 16.097 20.635 15 18.9906 15C17.2322 15 15.7382 16.2545 15.1973 18" {...stroke} />
      <Path d="M20.9961 17.6675H22.6674C22.8517 17.6675 23.001 17.5182 23.001 17.3339V15.4453" {...stroke} />
      <Path d="M15.3331 20.3333C15.9519 21.903 17.365 23 19.0094 23C20.7678 23 22.2618 21.7455 22.8027 20" {...stroke} />
      <Path d="M17.0039 20.3325H15.3326C15.1483 20.3325 14.999 20.4818 14.999 20.6661V22.5547" {...stroke} />
    </Svg>
  );
}
