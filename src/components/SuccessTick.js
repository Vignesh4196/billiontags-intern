import React from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const CHECK_LENGTH = 70;
const RING_RADIUS = 38.5;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

// Green success badge, in three steps: the light green disc pops in, the green border draws
// around it, then the check draws itself. Drawn with SVG so the strokes can be animated; the JS
// driver is used because strokeDashoffset isn't supported by the native driver (and for react-native-web).
export default function SuccessTick({ size = 96 }) {
  const pop = React.useRef(new Animated.Value(0)).current;
  const ring = React.useRef(new Animated.Value(0)).current;
  const draw = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const animation = Animated.sequence([
      Animated.spring(pop, { toValue: 1, friction: 6, tension: 120, useNativeDriver: false }),
      Animated.timing(ring, { toValue: 1, duration: 450, easing: Easing.out(Easing.cubic), useNativeDriver: false }),
      Animated.timing(draw, { toValue: 1, duration: 450, easing: Easing.out(Easing.cubic), useNativeDriver: false }),
    ]);
    animation.start();
    return () => animation.stop();
  }, [pop, ring, draw]);

  const discRadius = pop.interpolate({ inputRange: [0, 1], outputRange: [0, 33] });
  const ringOffset = ring.interpolate({ inputRange: [0, 1], outputRange: [RING_LENGTH, 0] });
  const checkOffset = draw.interpolate({ inputRange: [0, 1], outputRange: [CHECK_LENGTH, 0] });

  return (
    <Svg width={size} height={size} viewBox="0 0 96 96" fill="none">
      <Defs>
        <LinearGradient id="tickRing" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#4ADE80" />
          <Stop offset="1" stopColor="#16A34A" />
        </LinearGradient>
      </Defs>
      <AnimatedCircle cx={48} cy={48} r={discRadius} fill="#DCFCE7" />
      <AnimatedCircle
        cx={48}
        cy={48}
        r={RING_RADIUS}
        stroke="url(#tickRing)"
        strokeWidth={11}
        strokeDasharray={RING_LENGTH}
        strokeDashoffset={ringOffset}
        transform="rotate(-90 48 48)"
      />
      <AnimatedPath
        d="M27 50 L40 63 L68 32"
        stroke="#16A34A"
        strokeWidth={9}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={CHECK_LENGTH}
        strokeDashoffset={checkOffset}
      />
    </Svg>
  );
}
