import React from 'react';
import Svg, { Defs, RadialGradient, Stop, Circle } from 'react-native-svg';

let nextId = 0;

// A soft round blob that fades to transparent at the edge (radial gradient).
// Used for smoke puffs and the magic glow. Each instance gets its own gradient id
// so several can live on one web page.
export default function SoftBlob({ size, color, opacity = 1 }) {
  const id = React.useMemo(() => `softblob${nextId++}`, []);
  return (
    <Svg width={size} height={size}>
      <Defs>
        <RadialGradient id={id} cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor={color} stopOpacity={opacity} />
          <Stop offset="0.55" stopColor={color} stopOpacity={opacity * 0.55} />
          <Stop offset="1" stopColor={color} stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Circle cx={size / 2} cy={size / 2} r={size / 2} fill={`url(#${id})`} />
    </Svg>
  );
}
