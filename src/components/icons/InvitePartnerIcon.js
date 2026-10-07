import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function InvitePartnerIcon({ size = 24, color = '#141414' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M11.995 13.5663L11 13.5C10.6446 13.5097 10.3134 13.5226 10.0008 13.5379C6.3 13.7193 3.28417 16.8058 3 20.5002"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11 10.5C13.2091 10.5 15 8.70914 15 6.5C15 4.29086 13.2091 2.5 11 2.5C8.79086 2.5 7 4.29086 7 6.5C7 8.70914 8.79086 10.5 11 10.5Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity={0.5}
        d="M16.9437 21.3121C15.9563 20.5675 14 18.8652 14 17.3333C14 16.3208 14.7368 15.5 15.75 15.5C16.275 15.5 16.8 15.6765 17.5 16.3823C18.2 15.6765 18.725 15.5 19.25 15.5C20.2632 15.5 21 16.3208 21 17.3333C21 18.8652 19.0437 20.5675 18.0563 21.3121C17.724 21.5626 17.276 21.5626 16.9437 21.3121Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
