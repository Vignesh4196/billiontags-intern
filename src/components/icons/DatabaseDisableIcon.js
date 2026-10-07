import React from 'react';
import Svg, { Path } from 'react-native-svg';

// Database with a slash (streamline-ultimate_database-disable.svg), used for "Database preservation".
export default function DatabaseDisableIcon({ size = 24, color = '#141414' }) {
  const stroke = { stroke: color, strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M11.9989 9.69932C7.58139 9.69932 4 7.97552 4 5.84966C4 3.72379 7.58139 2 11.9989 2C16.4165 2 19.9979 3.72294 19.9979 5.84966M19.9979 5.84966C19.9979 6.85998 19.1887 7.77962 17.8648 8.46657M19.9979 5.84966V10.3409" {...stroke} />
      <Path d="M4 5.84961V10.9825C4 12.6601 6.23117 14.0879 9.34329 14.6149" {...stroke} />
      <Path d="M4 11.0008V16C4 17.6264 6.20913 19.0103 9.29707 19.5302M12.7163 19.5336L18.7479 12.4648M11.4664 16C11.4664 17.3261 11.9159 18.5979 12.7161 19.5355C13.5163 20.4732 14.6016 21 15.7332 21C16.8648 21 17.9501 20.4732 18.7503 19.5355C19.5505 18.5979 20 17.3261 20 16C20 14.6739 19.5505 13.4021 18.7503 12.4645C17.9501 11.5268 16.8648 11 15.7332 11C14.6016 11 13.5163 11.5268 12.7161 12.4645C11.9159 13.4021 11.4664 14.6739 11.4664 16Z" {...stroke} />
    </Svg>
  );
}
