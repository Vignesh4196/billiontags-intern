import React from 'react';
import { TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { colors } from '../theme';

const TRACK_WIDTH = 48;
const TRACK_HEIGHT = 24;
const KNOB_SIZE = 16;
const KNOB_INSET = 4;

export default function Toggle({ value, onValueChange, disabled }) {
  const anim = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [value, anim]);

  const trackColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.toggleOff, colors.toggleOn],
  });

  const knobTranslate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, TRACK_WIDTH - KNOB_SIZE - KNOB_INSET * 2],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={disabled}
      onPress={() => onValueChange && onValueChange(!value)}
    >
      <Animated.View style={[styles.track, { backgroundColor: trackColor, opacity: disabled ? 0.5 : 1 }]}>
        <Animated.View style={[styles.knob, { transform: [{ translateX: knobTranslate }] }]} />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    justifyContent: 'center',
    paddingHorizontal: KNOB_INSET,
  },
  knob: {
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: KNOB_SIZE / 2,
    backgroundColor: colors.white,
  },
});
