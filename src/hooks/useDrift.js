import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

// Continuous one-directional slide (clouds drifting left), looping forever. Pair it with a
// horizontally tiled image whose tile is `distance` wide: the strip moves 0 → -distance and
// snaps back, which is seamless because the next tile is identical. `duration` is one tile's time.
export function useDrift(distance, duration = 14000) {
  const anim = useRef(new Animated.Value(0)).current;
  // Restart whenever the screen regains focus: going to another screen and coming back (e.g. aborting
  // the disconnect flow) left the strip parked, because the old loop doesn't survive the screen being hidden.
  const focused = useIsFocused();

  useEffect(() => {
    if (!distance || !focused) return undefined;
    anim.setValue(0);
    const loop = Animated.loop(
      // JS driver (not native): Animated.loop with the native driver does not reliably restart on
      // react-native-web, which left the strip parked at the end of the first cycle.
      Animated.timing(anim, { toValue: 1, duration, easing: Easing.linear, useNativeDriver: false })
    );
    loop.start();
    return () => loop.stop();
  }, [anim, distance, duration, focused]);

  return anim.interpolate({ inputRange: [0, 1], outputRange: [0, -distance] });
}
