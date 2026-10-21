import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, Pressable, StyleSheet, View } from 'react-native';
import SmokeBurst from './SmokeBurst';
import MagicSparkles, { MagicGlow } from './MagicSparkles';
import OrbitingItems, { itemSizeFor } from './OrbitingItems';
import { colors } from '../theme';

const closedImg = require('../assets/closet-closed.png');
const openImg = require('../assets/closet-open.png'); // open, with the dresses
const emptyImg = require('../assets/closet-empty.png'); // open, empty (same framing as openImg)

// Where the two door panels sit in the closed artwork (fractions of its width,
// measured from the PNG). The front of the wardrobe is drawn at a slant, so each
// panel is a slanted strip: x/w = left edge + width, y = top at the left edge,
// h = height, slope = how far the top/bottom drop per unit of width.
const DOORS = {
  left: { x: 0.339, w: 0.2241, y: 0.2461, h: 0.5945, slope: -0.215, hinge: 0.339 },
  right: { x: 0.5662, w: 0.2169, y: 0.2018, h: 0.5797, slope: -0.202, hinge: 0.7831 },
};
// The open artwork is drawn ~3% smaller and shifted; this scale/offset lays it
// exactly over the closed one so the body does not jump when the doors open.
const OPEN_FIT = { scale: 1.033, dx: -0.021, dy: -0.022 };
const DOOR_SWING = 95; // degrees each door turns outward
const OPEN_IN = [0.4, 0.8]; // part of the swing where the open picture fades in under the doors
const BLEND = [0.6, 0.95]; // then the closed picture (frame + doors) dissolves on top of it
const SWING_MS = 1300;
const SWING_EASE = Easing.bezier(0.25, 0.1, 0.25, 1); // moves straight away, soft landing

// Phases: closed -> opening -> magic -> items -> done.
//   1. the closed wardrobe pops in
//   2. both doors swing open smoothly on their hinges with a burst of dust; the
//      lavender glow and sparkles appear together as they start to open
//   3. the sparkles keep shimmering over the dresses
//   4. `items` fly out one by one (the wardrobe is left empty) and circle it slowly (any count)
// Tap the wardrobe after it finishes to play it again.
export default function WardrobeCloset({ items, width, height, onPhaseChange }) {
  const [phase, setPhase] = useState('closed');
  const [run, setRun] = useState(0); // bump to replay
  const enter = useRef(new Animated.Value(0)).current;
  const open = useRef(new Animated.Value(0)).current;
  const smoke = useRef(new Animated.Value(0)).current;
  const glow = useRef(new Animated.Value(0)).current;
  const empty = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    onPhaseChange?.(phase);
  }, [phase, onPhaseChange]);

  useEffect(() => {
    let alive = true;
    let timer;
    const values = [enter, open, smoke, glow, empty];
    values.forEach((v) => v.setValue(0));
    setPhase('closed');
    const t = (v, duration, easing = Easing.linear) =>
      Animated.timing(v, { toValue: 1, duration, easing, useNativeDriver: false });
    // run `anim`, then `next` if the screen is still showing
    const then = (anim, next) => anim.start(({ finished }) => finished && alive && next());

    then(Animated.sequence([t(enter, 600, Easing.out(Easing.back(1.5))), Animated.delay(400)]), () => {
      setPhase('opening');
      then(
        Animated.parallel([
          t(open, SWING_MS, SWING_EASE),
          Animated.sequence([Animated.delay(200), t(smoke, 1800, Easing.out(Easing.quad))]),
          Animated.sequence([Animated.delay(200), t(glow, 500, Easing.out(Easing.quad))]),
        ]),
        () => {
          setPhase('magic');
          timer = setTimeout(() => {
            if (!alive) return;
            setPhase('items');
            t(empty, 500, Easing.out(Easing.quad)).start();
          }, 1000);
        }
      );
    });

    return () => {
      alive = false;
      clearTimeout(timer);
      values.forEach((v) => v.stopAnimation());
    };
  }, [run, enter, open, smoke, glow, empty]);

  if (!width || !height) return null;

  // closet artwork size, and the orbit that fits round it
  const size = Math.min(width * 0.56, height * 0.72, 250);
  const roughItem = itemSizeFor(items.length, width / 2 - 46, height / 2 - 46);
  const rx = width / 2 - roughItem / 2 - 4;
  const ry = height / 2 - roughItem / 2 - 4;

  const closetStyle = {
    opacity: enter,
    transform: [
      { scale: Animated.multiply(
        enter.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] }),
        // a soft bump as the doors open
        open.interpolate({ inputRange: [0, 0.3, 0.7, 1], outputRange: [1, 1.03, 0.995, 1] })
      ) },
    ],
  };
  const openImgStyle = {
    position: 'absolute',
    width: size * OPEN_FIT.scale,
    height: size * OPEN_FIT.scale,
    left: size * OPEN_FIT.dx,
    top: size * OPEN_FIT.dy,
  };
  // The closed wardrobe (frame, top, feet, doors) stays one still picture while
  // the doors swing, then hands over to the open picture in one quick fade.
  // The open picture fades in underneath while the closed one is still solid, and
  // only then does the closed one (frame + swinging doors) dissolve away on top of
  // it, so the two never dim each other and there is no jump at the end.
  const closedFade = open.interpolate({ inputRange: BLEND, outputRange: [1, 0], extrapolate: 'clamp' });
  const openShow = open.interpolate({ inputRange: OPEN_IN, outputRange: [0, 1], extrapolate: 'clamp' });
  const doorShade = open.interpolate({ inputRange: [0, 1], outputRange: [0, 0.3] }); // darker as it turns from the light
  const swing = (dir) => open.interpolate({ inputRange: [0, 1], outputRange: ['0deg', `${dir * DOOR_SWING}deg`] });

  // Each door panel, cut along its slanted outline, swinging on its hinge.
  const door = (side) => {
    const d = DOORS[side];
    return (
      <Animated.View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, {
          transformOrigin: `${d.hinge * size}px ${size / 2}px`,
          transform: [{ perspective: 850 }, { rotateY: swing(side === 'left' ? -1 : 1) }],
        }]}
      >
        <SlantCut door={d} size={size}>
          <Image source={closedImg} style={{ width: size, height: size }} resizeMode="contain" />
          <Animated.View style={[styles.doorShade, { width: size, height: size, opacity: doorShade }]} />
        </SlantCut>
      </Animated.View>
    );
  };

  return (
    <Pressable
      style={[styles.stage, { width, height }]}
      onPress={() => phase === 'done' && setRun((r) => r + 1)}
      accessibilityLabel="Your wardrobe"
    >
      {phase !== 'closed' && <MagicGlow size={size} glow={glow} />}

      <Animated.View style={[styles.closet, { width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }, closetStyle]}>
        {/* the open picture (with its own open doors) once the swing lands, then the empty one as the pieces fly out */}
        <Animated.Image source={openImg} resizeMode="contain" style={[openImgStyle, { opacity: openShow }]} />
        <Animated.Image source={emptyImg} resizeMode="contain" style={[openImgStyle, { opacity: empty }]} />

        <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { opacity: closedFade }]}>
          <Image source={closedImg} style={{ width: size, height: size }} resizeMode="contain" />
          {/* inside of the wardrobe, showing through the two door openings */}
          {['left', 'right'].map((side) => (
            <Animated.View
              key={side}
              style={[StyleSheet.absoluteFill, { opacity: open.interpolate({ inputRange: [0, 0.02], outputRange: [0, 1], extrapolate: 'clamp' }) }]}
            >
              <SlantCut door={DOORS[side]} size={size}>
                <Image source={openImg} resizeMode="contain" style={openImgStyle} />
              </SlantCut>
            </Animated.View>
          ))}
          {door('left')}
          {door('right')}
        </Animated.View>
      </Animated.View>

      {(phase === 'opening' || phase === 'magic' || phase === 'items' || phase === 'done') && (
        <SmokeBurst progress={smoke} size={size} />
      )}
      {phase !== 'closed' && <MagicSparkles size={size} />}
      {(phase === 'items' || phase === 'done') && (
        <OrbitingItems key={run} items={items} rx={rx} ry={ry} onAllOut={() => setPhase('done')} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  stage: {
    alignSelf: 'center',
  },
  closet: {
    position: 'absolute',
    left: '50%',
    top: '50%',
  },
  slant: {
    position: 'absolute',
    overflow: 'hidden',
    transformOrigin: 'left top',
  },
  slantInner: {
    position: 'absolute',
  },
  doorShade: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: colors.doorShade,
  },
});

// Shows `children` (laid out in closet coordinates, size x size) only inside one
// slanted door outline: the frame is skewed to the door's slant and the content
// is skewed back so the artwork itself stays undistorted.
function SlantCut({ door, size, children }) {
  const angle = `${(Math.atan(door.slope) * 180) / Math.PI}deg`;
  const back = `${(-Math.atan(door.slope) * 180) / Math.PI}deg`;
  const x = door.x * size;
  const y = door.y * size;
  return (
    <View style={[styles.slant, { left: x, top: y, width: door.w * size, height: door.h * size, transform: [{ skewY: angle }] }]}>
      <View
        style={[styles.slantInner, {
          left: -x,
          top: -y,
          width: size,
          height: size,
          transformOrigin: `${x}px ${y}px`,
          transform: [{ skewY: back }],
        }]}
      >
        {children}
      </View>
    </View>
  );
}
