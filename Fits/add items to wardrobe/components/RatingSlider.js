import React from 'react';
import { View, Text, Animated, PanResponder, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontFamily } from '../../../src/theme';
import { wardrobeColors } from '../theme';

const THUMB_W = 14;
const MAX = 5;

// Rating 0-5 in 0.5 steps. Drag or tap the track; the star under the new value pops.
export default function RatingSlider({ value, onChange }) {
  const [width, setWidth] = React.useState(0);
  const widthRef = React.useRef(0);
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;
  const fill = React.useRef(new Animated.Value(value / MAX)).current;
  const pops = React.useRef([0, 1, 2, 3, 4].map(() => new Animated.Value(1))).current;
  const prevStars = React.useRef(Math.ceil(value));

  const setFromX = React.useCallback((x) => {
    if (!widthRef.current) return;
    const ratio = Math.min(1, Math.max(0, x / widthRef.current));
    onChangeRef.current(Math.round(ratio * MAX * 2) / 2);
  }, []);

  React.useEffect(() => {
    Animated.timing(fill, { toValue: value / MAX, duration: 120, useNativeDriver: false }).start();
    const stars = Math.ceil(value);
    if (stars !== prevStars.current && stars >= 1) {
      Animated.sequence([
        Animated.timing(pops[stars - 1], { toValue: 1.35, duration: 100, useNativeDriver: true }),
        Animated.spring(pops[stars - 1], { toValue: 1, friction: 4, useNativeDriver: true }),
      ]).start();
    }
    prevStars.current = stars;
  }, [value, fill, pops]);

  const pan = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => setFromX(e.nativeEvent.locationX),
      onPanResponderMove: (e) => setFromX(e.nativeEvent.locationX),
    }),
  ).current;

  const thumbLeft = fill.interpolate({ inputRange: [0, 1], outputRange: [0, Math.max(0, width - THUMB_W)] });
  const fillWidth = fill.interpolate({ inputRange: [0, 1], outputRange: [0, width] });

  return (
    <View>
      <View style={styles.head}>
        <Text style={styles.title}>Rating</Text>
        <Text style={styles.value}>{value.toFixed(1)}</Text>
      </View>
      <View
        style={styles.track}
        onLayout={(e) => { widthRef.current = e.nativeEvent.layout.width; setWidth(e.nativeEvent.layout.width); }}
        {...pan.panHandlers}
      >
        <View style={styles.bar} pointerEvents="none">
          <Animated.View style={[styles.fill, { width: fillWidth }]}>
            <LinearGradient
              colors={[wardrobeColors.ratingGreenStart, wardrobeColors.ratingGreenEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        </View>
        <Animated.View pointerEvents="none" style={[styles.thumb, { left: thumbLeft }]} />
      </View>
      <View style={styles.stars}>
        {pops.map((scale, i) => (
          <Animated.View key={i} style={{ transform: [{ scale }] }}>
            <Ionicons name="star" size={34} color={value >= i + 0.5 ? wardrobeColors.star : wardrobeColors.starOff} />
          </Animated.View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontFamily: fontFamily.semiBold, fontSize: 18, color: colors.textPrimary },
  value: { fontFamily: fontFamily.semiBold, fontSize: 14, color: colors.textPrimary },
  track: { height: 32, justifyContent: 'center', marginTop: 12, marginHorizontal: 4 },
  bar: { height: 16, borderRadius: 8, backgroundColor: wardrobeColors.ratingTrack, overflow: 'hidden' },
  fill: { height: 16, overflow: 'hidden' },
  thumb: {
    position: 'absolute',
    top: 1,
    width: THUMB_W,
    height: 30,
    borderRadius: 4,
    backgroundColor: wardrobeColors.ratingGreenEnd,
    borderWidth: 2,
    borderColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  stars: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, marginTop: 10 },
});
