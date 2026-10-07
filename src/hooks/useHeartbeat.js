import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export function useHeartbeat() {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const easeOut = Easing.out(Easing.ease);
    const easeIn = Easing.in(Easing.ease);
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 140, easing: easeOut, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 2, duration: 140, easing: easeIn, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 3, duration: 140, easing: easeOut, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 4, duration: 140, easing: easeIn, useNativeDriver: true }),
        Animated.delay(1440),
        Animated.timing(anim, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [anim]);

  const inputRange = [0, 1, 2, 3, 4, 5];
  const scale = anim.interpolate({ inputRange, outputRange: [1, 1.12, 1, 1.07, 1, 1] });
  const translateX = anim.interpolate({ inputRange, outputRange: [0, -3.206, 0, -1.87, 0, 0] });
  const translateY = anim.interpolate({ inputRange, outputRange: [0, -2.883, 0, -1.682, 0, 0] });

  return [{ translateX }, { translateY }, { scale }];
}
