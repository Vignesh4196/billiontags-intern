import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../theme';

// "Ara" – the AI stylist mascot. The cloud is the supplied 3D art with the face
// removed (cloud-ara-faceless.png, rendered from cloud-3d-detailed.svg); the
// face is rebuilt from separate layers so it can animate: the left eye winks shut
// into a happy arc and reopens (right eye stays open) while its brow lifts and the
// cheeks swell. One smooth wink, then a 10s rest, then it repeats.
// Four stars twinkle around the cloud and the whole mascot floats.
const cloud = require('../assets/cloud-ara-faceless.png');
const starOrange = require('../assets/star-orange.png');
const starYellow = require('../assets/star-yellow.png');

// Face layout, measured in the 825x660 source artwork (centre x/y, size).
const SRC_H = 660;
const WINK_MS = 1200; // one full close + open
const WINK_PAUSE_MS = 6000; // rest, eyes open, before the next wink
const BROW_LIFT = -10; // source px the left brow rises on the wink
const CHEEK_SWELL = 1.1; // cheeks grow ~28% while the eyes are shut
const SMILE_SHIFT = -20; // source px the smile slides right
const SMILE_SHRINK_X = 0.9; // smile narrows to ~70% on the wink, pulling in from the LEFT end (right end stays put)
const SMILE_SHRINK_Y = 0.9; // and flattens slightly
const RIGHT_BROW_LIFT = 8; // source px the right brow rises on the wink
const RIGHT_EYE_BULGE = 1.12; // open (right) eye grows ~12% on the wink
const FACE = {
  leftEye: { cx: 269, cy: 387, w: 34, h: 62 }, // winking eye (closes and reopens)
  rightEye: { cx: 478, cy: 390, w: 38, h: 62 }, // stays open
  leftBlush: { cx: 262, cy: 452, w: 62, h: 46 },
  rightBlush: { cx: 481, cy: 451, w: 62, h: 46 },
  smile: { cx: 374, cy: 455, w: 132, h: 38, stroke: 5 },
  leftClosed: { cx: 269, cy: 385, w: 52, h: 30, stroke: 9 },
  leftBrow: { cx: 253, cy: 330, w: 29, h: 11, stroke: 4.5 }, // same cx as leftEye so it sits straight above it
  rightBrow: { cx: 490, cy: 335, w: 29, h: 12, stroke: 4 },
};

export default function Mascot({ size = 150, showStars = true }) {
  const k = size / SRC_H; // source px -> screen px
  const float = useRef(new Animated.Value(0)).current;
  const close = useRef(new Animated.Value(0)).current; // 0 = eyes open, 1 = eyes shut
  const glow = useRef(new Animated.Value(0)).current;
  const twinkleA = useRef(new Animated.Value(0)).current;
  const twinkleB = useRef(new Animated.Value(0)).current;
  const twinkleC = useRef(new Animated.Value(0)).current;
  const twinkleD = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const ease = Easing.inOut(Easing.quad);
    const t = (v, toValue, duration, easing) =>
      Animated.timing(v, { toValue, duration, easing, useNativeDriver: false });
    const floatLoop = Animated.loop(
      Animated.sequence([t(float, 1, 1800, ease), t(float, 0, 1800, ease)])
    );
    // Smooth wink: eased close, eased open, then a long rest with the eye open.
    const smooth = Easing.inOut(Easing.cubic);
    const blinkLoop = Animated.loop(
      Animated.sequence([
        t(close, 1, WINK_MS * 0.4, smooth),
        t(close, 0, WINK_MS * 0.6, smooth),
        Animated.delay(WINK_PAUSE_MS),
      ])
    );
    const glowLoop = Animated.loop(
      Animated.sequence([t(glow, 1, 1400, ease), t(glow, 0, 1400, ease)])
    );
    const twinkle = (v, duration, delay) =>
      Animated.loop(
        Animated.sequence([Animated.delay(delay), t(v, 1, duration, ease), t(v, 0, duration, ease)])
      );
    const loops = [
      floatLoop,
      blinkLoop,
      glowLoop,
      twinkle(twinkleA, 700, 0),
      twinkle(twinkleB, 950, 400),
      twinkle(twinkleC, 820, 200),
      twinkle(twinkleD, 1100, 600),
    ];
    loops.forEach((l) => l.start());
    return () => loops.forEach((l) => l.stop());
  }, [float, close, glow, twinkleA, twinkleB, twinkleC, twinkleD]);

  const lerp = (v, from, to) => v.interpolate({ inputRange: [0, 1], outputRange: [from, to] });
  const fade = (v, inputRange, outputRange) => v.interpolate({ inputRange, outputRange });
  const translateY = lerp(float, 0, -8);
  const starStyle = (v) => ({
    opacity: lerp(v, 0.45, 1),
    transform: [{ scale: lerp(v, 0.8, 1.15) }],
  });

  // Absolutely positions a face part by its source-space centre.
  const place = ({ cx, cy, w, h }) => ({
    position: 'absolute',
    left: (cx - w / 2) * k,
    top: (cy - h / 2) * k,
    width: w * k,
    height: h * k,
  });
  // Arc through the part's box: 'up' = frown/brow/wink shape, 'down' = smile.
  const arc = (part, dir) => {
    const w = part.w * k;
    const h = part.h * k;
    const sw = Math.max(2, part.stroke * k);
    const pad = sw / 2;
    const d =
      dir === 'up'
        ? `M${pad} ${h - pad} Q${w / 2} ${-h + pad * 2} ${w - pad} ${h - pad}`
        : `M${pad} ${pad} Q${w / 2} ${h * 2 - pad * 2} ${w - pad} ${pad}`;
    return (
      <Svg width={w} height={h} style={{ overflow: 'visible' }}>
        <Path d={d} fill="none" stroke={colors.mascotInk} strokeWidth={sw} strokeLinecap="round" />
      </Svg>
    );
  };

  const imgW = size * 1.25;

  return (
    <Animated.View style={[styles.wrap, { width: size * 1.8, height: size, transform: [{ translateY }] }]}>
      {showStars && (
        <>
          {/* Positions swapped: orange now bottom-left, yellow now top-right */}
          <Animated.Image source={starOrange} resizeMode="contain" style={[styles.star, styles.bottomLeft, starStyle(twinkleA)]} />
          <Animated.Image source={starYellow} resizeMode="contain" style={[styles.star, styles.topRight, starStyle(twinkleB)]} />
          {/* Two added stars */}
          <Animated.Image source={starYellow} resizeMode="contain" style={[styles.starSmall, styles.topLeft, starStyle(twinkleC)]} />
          <Animated.Image source={starOrange} resizeMode="contain" style={[styles.starSmall, styles.bottomRight, starStyle(twinkleD)]} />
        </>
      )}
      <View style={{ width: imgW, height: size }}>
        <Animated.Image source={cloud} resizeMode="contain" style={{ width: imgW, height: size }} />

        {/* Cheeks – glow gently, swell and brighten while the eyes are shut */}
        {[FACE.leftBlush, FACE.rightBlush].map((part, i) => (
          <Animated.View
            key={i}
            style={[
              place(part),
              styles.blush,
              {
                opacity: Animated.add(lerp(glow, 0.55, 0.75), lerp(close, 0, 0.25)),
                transform: [{ scale: lerp(close, 1, CHEEK_SWELL) }],
              },
            ]}
          />
        ))}

        {/* Brows – both move with the wink (right goes up; left follows BROW_LIFT) */}
        <Animated.View style={[place(FACE.leftBrow), { transform: [{ translateY: lerp(close, 0, -BROW_LIFT * k) }] }]}>
          {arc(FACE.leftBrow, 'up')}
        </Animated.View>
        <Animated.View style={[place(FACE.rightBrow), { transform: [{ translateY: lerp(close, 0, -RIGHT_BROW_LIFT * k) }] }]}>
          {arc(FACE.rightBrow, 'up')}
        </Animated.View>

        {/* RIGHT EYE – stays open, bulges slightly while the left eye winks */}
        <Animated.View style={[place(FACE.rightEye), styles.eye, { transform: [{ scale: lerp(close, 1, RIGHT_EYE_BULGE) }] }]} />

        {/* LEFT EYE – winks: the open eye squashes shut while the closed-eye arc fades in, then reverses */}
        <Animated.View
          style={[place(FACE.leftEye), styles.eye, { opacity: fade(close, [0, 0.7, 1], [1, 1, 0]), transform: [{ scaleY: lerp(close, 1, 0.08) }] }]}
        />
        <Animated.View style={[place(FACE.leftClosed), { opacity: fade(close, [0, 0.45, 1], [0, 0, 1]) }]}>{arc(FACE.leftClosed, 'up')}</Animated.View>

        {/* Smile – minimizes on one side during the wink: scales about its right end, so the left end pulls in */}
        <Animated.View
          style={[
            place(FACE.smile),
            {
              transform: [
                // scaleX shrinks about the centre; shifting right by half the lost width pins the right end
                { translateX: lerp(close, 0, SMILE_SHIFT * k + ((1 - SMILE_SHRINK_X) * FACE.smile.w * k) / 2) },
                { scaleX: lerp(close, 1, SMILE_SHRINK_X) },
                { scaleY: lerp(close, 1, SMILE_SHRINK_Y) },
              ],
            },
          ]}
        >
          {arc(FACE.smile, 'down')}
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  eye: {
    backgroundColor: colors.mascotInk,
    borderRadius: 999,
  },
  blush: {
    backgroundColor: colors.mascotBlush,
    borderRadius: 999,
  },
  star: {
    position: 'absolute',
    width: 26,
    height: 26,
    zIndex: 2,
  },
  starSmall: {
    position: 'absolute',
    width: 18,
    height: 18,
    zIndex: 2,
  },
  bottomLeft: {
    left: 6,
    bottom: 22,
  },
  topRight: {
    right: 12,
    top: 20,
  },
  topLeft: {
    left: 24,
    top: 10,
  },
  bottomRight: {
    right: 28,
    bottom: 14,
  },
});
