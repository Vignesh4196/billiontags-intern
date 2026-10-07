import React from 'react';
import { View, Animated, Easing, Platform, StyleSheet } from 'react-native';
import { colors } from '../../theme';

export default function DottedSpinner({ size = 60, dotColor = colors.border, dotCount = 10, fade = true, dotSize: dotSizeProp }) {
  const rotation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    rotation.setValue(0);
    // Restart from 0 on every pass, otherwise the timing starts at 1 and the spinner stops after one turn.
    const loop = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        // The native driver's loop does not restart on react-native-web, so the spinner stalled after one turn.
        useNativeDriver: Platform.OS !== 'web',
      }),
      { iterations: -1, resetBeforeIteration: true },
    );
    loop.start();
    return () => loop.stop();
  }, [rotation]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const radius = size / 2;
  const dotSize = dotSizeProp || size * 0.12;

  return (
    <Animated.View style={{ width: size, height: size, transform: [{ rotate: spin }] }}>
      {Array.from({ length: dotCount }).map((_, index) => {
        const angle = (index / dotCount) * 2 * Math.PI;
        const x = radius + radius * Math.sin(angle) - dotSize / 2;
        const y = radius - radius * Math.cos(angle) - dotSize / 2;
        const opacity = fade ? 0.25 + 0.75 * (index / dotCount) : 1;

        return (
          <View
            key={index}
            style={[
              styles.dot,
              {
                width: dotSize,
                height: dotSize,
                borderRadius: dotSize / 2,
                left: x,
                top: y,
                backgroundColor: dotColor,
                opacity,
              },
            ]}
          />
        );
      })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  dot: {
    position: 'absolute',
  },
});
