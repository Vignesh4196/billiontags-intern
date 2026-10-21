import React from 'react';
import { Animated } from 'react-native';

// Springs a block in from a smaller size while it fades up. `delay` staggers siblings.
// JS driver, like the other animations here, so it also runs on react-native-web.
export default function PopInView({ children, delay = 0, from = 0.6, style }) {
  const progress = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const animation = Animated.sequence([
      Animated.delay(delay),
      Animated.spring(progress, { toValue: 1, friction: 6, tension: 130, useNativeDriver: false }),
    ]);
    animation.start();
    return () => animation.stop();
  }, [progress, delay]);

  const scale = progress.interpolate({ inputRange: [0, 1], outputRange: [from, 1] });
  const opacity = progress.interpolate({ inputRange: [0, 0.4, 1], outputRange: [0, 1, 1] });

  return <Animated.View style={[style, { opacity, transform: [{ scale }] }]}>{children}</Animated.View>;
}
