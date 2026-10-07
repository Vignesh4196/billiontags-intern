import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function PrivacyShieldIcon({ size = 22 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2C14.5 2 16.817 2.554 18.709 3.495C19.637 3.957 20.1 4.188 20.55 4.914C21 5.64 21 6.342 21 7.748V11.237C21 16.92 16.457 20.08 13.827 21.434L13.8211 21.4371C13.091 21.812 12.725 22 12 22C11.275 22 10.909 21.812 10.1789 21.4371L10.173 21.434C7.542 20.08 3 16.921 3 11.238V7.748C3 6.342 3.001 5.64 3.45 4.914C3.899 4.188 4.363 3.957 5.291 3.495C7.184 2.554 9.5 2 12 2Z"
        stroke="#141414"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
