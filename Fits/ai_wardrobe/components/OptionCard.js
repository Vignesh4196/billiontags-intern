import React, { useEffect, useRef } from 'react';
import { Animated, Easing, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native';
import { colors, fontFamily, radius, shadow } from '../theme';

const ENTER_STAGGER_MS = 60; // delay between tiles popping in
const BOB_PX = 3; // idle float distance of the icon
const SELECT_POP = 1.28; // icon scale at the peak of the selection pop
const PRESS_SCALE = 0.94; // tile squish while pressed

// A single selectable tile: a 3D icon (image) or emoji on top, label, optional
// description. Turns lavender with a purple border when selected.
// Animations: staggered pop-in (by `index`), gentle idle float of the icon,
// press squish, and a bounce + wiggle of the icon when it becomes selected.
export default function OptionCard({ icon, emoji, label, description, selected, onPress, index = 0 }) {
  const enter = useRef(new Animated.Value(0)).current; // 0 hidden -> 1 shown
  const bob = useRef(new Animated.Value(0)).current; // idle float
  const press = useRef(new Animated.Value(0)).current; // 0 rest -> 1 pressed
  const pop = useRef(new Animated.Value(0)).current; // selection bounce/wiggle
  const wasSelected = useRef(selected);

  useEffect(() => {
    const ease = Easing.inOut(Easing.sin);
    const entrance = Animated.timing(enter, {
      toValue: 1,
      duration: 420,
      delay: index * ENTER_STAGGER_MS,
      easing: Easing.out(Easing.back(1.6)),
      useNativeDriver: false,
    });
    const half = 1500 + (index % 3) * 250; // vary speed so icons don't float in sync
    const idle = Animated.loop(
      Animated.sequence([
        Animated.timing(bob, { toValue: 1, duration: half, easing: ease, useNativeDriver: false }),
        Animated.timing(bob, { toValue: 0, duration: half, easing: ease, useNativeDriver: false }),
      ])
    );
    entrance.start(({ finished }) => finished && idle.start());
    return () => {
      entrance.stop();
      idle.stop();
    };
  }, [enter, bob, index]);

  useEffect(() => {
    if (selected && !wasSelected.current) {
      pop.setValue(0);
      Animated.timing(pop, { toValue: 1, duration: 650, easing: Easing.linear, useNativeDriver: false }).start();
    }
    wasSelected.current = selected;
  }, [selected, pop]);

  const squish = (toValue) =>
    Animated.spring(press, { toValue, friction: 5, tension: 160, useNativeDriver: false }).start();

  const lerp = (v, inputRange, outputRange) => v.interpolate({ inputRange, outputRange });
  const cardStyle = {
    opacity: lerp(enter, [0, 0.6, 1], [0, 1, 1]),
    transform: [
      { translateY: lerp(enter, [0, 1], [18, 0]) },
      { scale: Animated.multiply(lerp(enter, [0, 1], [0.7, 1]), lerp(press, [0, 1], [1, PRESS_SCALE])) },
    ],
  };
  const iconStyle = {
    transform: [
      { translateY: lerp(bob, [0, 1], [0, -BOB_PX]) },
      { scale: lerp(pop, [0, 0.3, 0.6, 1], [1, SELECT_POP, 0.94, 1]) },
      { rotate: lerp(pop, [0, 0.2, 0.4, 0.6, 0.8, 1], ['0deg', '-14deg', '12deg', '-8deg', '4deg', '0deg']) },
    ],
  };

  return (
    <TouchableWithoutFeedback onPress={onPress} onPressIn={() => squish(1)} onPressOut={() => squish(0)}>
      <Animated.View style={[styles.card, selected && styles.cardSelected, description && styles.cardTall, cardStyle]}>
        {icon ? (
          <Animated.Image source={icon} style={[styles.icon, iconStyle]} resizeMode="contain" />
        ) : (
          <Animated.Text style={[styles.emoji, iconStyle]}>{emoji}</Animated.Text>
        )}
        <Text style={styles.label}>{label}</Text>
        {!!description && <Text style={styles.description}>{description}</Text>}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 96,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.tileBorder,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
    ...shadow.tile,
  },
  cardTall: {
    minHeight: 116,
    justifyContent: 'flex-start',
  },
  cardSelected: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.accentBorder,
  },
  icon: {
    width: 48,
    height: 48,
    marginBottom: 6,
  },
  emoji: {
    fontSize: 30,
    marginBottom: 8,
  },
  label: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    lineHeight: 17,
    color: colors.textHeading,
    textAlign: 'center',
  },
  description: {
    fontFamily: fontFamily.regular,
    fontSize: 9,
    lineHeight: 12,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 3,
  },
});
