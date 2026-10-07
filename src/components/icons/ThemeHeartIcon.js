import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function ThemeHeartIcon({ size = 24, color = '#141414' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16.696 3C14.652 3 12.887 4.197 12 5.943C11.113 4.197 9.348 3 7.304 3C4.374 3 2 5.457 2 8.481C2 11.505 3.817 14.277 6.165 16.554C8.513 18.831 12 21 12 21C12 21 15.374 18.867 17.835 16.554C20.46 14.088 22 11.514 22 8.481C22 5.448 19.626 3 16.696 3Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
