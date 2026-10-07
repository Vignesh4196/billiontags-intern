import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { toQR } from 'toqr';
import LogoSuperbae from './icons/LogoSuperbae';
import { colors } from '../theme';

const EC_HIGH = 2;

// Scannable QR for `value`, drawn as a single SVG path, with the SuperBae logo
// in the middle (high error correction keeps it readable).
export default function QrCode({ value, size = 248 }) {
  const { path, count } = React.useMemo(() => {
    const modules = toQR(value, EC_HIGH);
    const n = Math.sqrt(modules.length);
    let d = '';
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        if (modules[y * n + x]) d += `M${x} ${y}h1v1h-1z`;
      }
    }
    return { path: d, count: n };
  }, [value]);

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox={`0 0 ${count} ${count}`} shapeRendering="crispEdges">
        <Path d={path} fill={colors.textPrimary} />
      </Svg>
      <View style={styles.logoWrap} pointerEvents="none">
        <View style={styles.logoPlate}>
          <LogoSuperbae width={72} height={36.5} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoPlate: {
    backgroundColor: colors.white,
    paddingHorizontal: 6,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
