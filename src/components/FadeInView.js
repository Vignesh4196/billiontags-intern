import React from 'react';
import { Animated, Easing } from 'react-native';

// Fades a block in while it slides up a few pixels. `delay` staggers siblings.
// JS driver, like the other animations here, so it also runs on react-native-web.
export default function FadeInView({ children, delay = 0, distance = 14, duration = 380, style }) {
  const progress = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const animation = Animated.timing(progress, { toValue: 1, duration, delay, easing: Easing.out(Easing.cubic), useNativeDriver: false });
    animation.start();
    return () => animation.stop();
  }, [progress, delay, duration]);

  const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [distance, 0] });

  return <Animated.View style={[style, { opacity: progress, transform: [{ translateY }] }]}>{children}</Animated.View>;
}
