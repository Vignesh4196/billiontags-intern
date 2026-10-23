import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  Pressable,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import Button from '../../../src/components/Button';
import { colors, fontFamily, radius, shadow, spacing } from '../theme';

const TILE_STAGGER_MS = 55;
const SELECT_POP = 1.2;

// One tile: pops in with a stagger when the card opens, squishes while pressed,
// and bounces its icon when it becomes selected.
function Tile({ option, index, selected, open, onPress }) {
  const enter = useRef(new Animated.Value(0)).current;
  const press = useRef(new Animated.Value(0)).current;
  const pop = useRef(new Animated.Value(0)).current;
  const wasSelected = useRef(selected);

  useEffect(() => {
    if (open) {
      enter.setValue(0);
      Animated.timing(enter, {
        toValue: 1,
        duration: 380,
        delay: 180 + index * TILE_STAGGER_MS,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: false,
      }).start();
    } else {
      enter.setValue(0);
    }
  }, [open, enter, index]);

  useEffect(() => {
    if (selected && !wasSelected.current) {
      pop.setValue(0);
      Animated.timing(pop, { toValue: 1, duration: 600, easing: Easing.linear, useNativeDriver: false }).start();
    }
    wasSelected.current = selected;
  }, [selected, pop]);

  const squish = (toValue) =>
    Animated.spring(press, { toValue, friction: 5, tension: 160, useNativeDriver: false }).start();
  const lerp = (v, input, output) => v.interpolate({ inputRange: input, outputRange: output });

  const tileStyle = {
    opacity: lerp(enter, [0, 0.6, 1], [0, 1, 1]),
    transform: [
      { translateY: lerp(enter, [0, 1], [16, 0]) },
      { scale: Animated.multiply(lerp(enter, [0, 1], [0.7, 1]), lerp(press, [0, 1], [1, 0.95])) },
    ],
  };
  const iconStyle = {
    transform: [
      { scale: lerp(pop, [0, 0.3, 0.6, 1], [1, SELECT_POP, 0.95, 1]) },
      { rotate: lerp(pop, [0, 0.2, 0.4, 0.6, 0.8, 1], ['0deg', '-10deg', '8deg', '-5deg', '2deg', '0deg']) },
    ],
  };

  return (
    <View style={styles.cell}>
      <TouchableWithoutFeedback
        onPress={onPress}
        onPressIn={() => squish(1)}
        onPressOut={() => squish(0)}
        accessibilityRole="button"
        accessibilityState={{ selected }}
      >
        <Animated.View style={[styles.tile, selected && styles.tileSelected, tileStyle]}>
          <Animated.Image source={option.icon} style={[styles.icon, iconStyle]} resizeMode="contain" />
          <Text style={styles.label} numberOfLines={1}>{option.label}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

// Bottom-sheet popup (slides up from the bottom edge) used for "Look & Fit" and "Color preference".
// Multi-select grid of 3D-icon tiles; "No Preference" (`none`) is exclusive.
// Selections are held locally and only committed with the Apply button.
export default function PreferenceSheet({ visible, title, subtitle, options, selected, onApply, onClose }) {
  const [draft, setDraft] = useState(selected);
  const [mounted, setMounted] = useState(visible);
  const progress = useRef(new Animated.Value(0)).current; // 0 closed -> 1 open

  useEffect(() => {
    if (visible) {
      setDraft(selected);
      setMounted(true);
      Animated.spring(progress, { toValue: 1, friction: 8, tension: 70, useNativeDriver: true }).start();
    } else if (mounted) {
      Animated.timing(progress, {
        toValue: 0,
        duration: 200,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(({ finished }) => finished && setMounted(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const toggle = (id) => {
    setDraft((prev) => {
      if (id === 'none') return prev.includes('none') ? [] : ['none'];
      const without = prev.filter((x) => x !== 'none');
      return without.includes(id) ? without.filter((x) => x !== id) : [...without, id];
    });
  };

  const cardStyle = {
    opacity: progress.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 1, 1], extrapolate: 'clamp' }),
    transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [420, 0] }) }],
  };

  return (
    <Modal visible={mounted} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              styles.backdrop,
              { opacity: progress.interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolate: 'clamp' }) },
            ]}
          />
        </TouchableWithoutFeedback>

        <Animated.View style={[styles.card, cardStyle]}>
          <Pressable onPress={onClose} hitSlop={{ top: 12, bottom: 12, left: 40, right: 40 }} accessibilityLabel="Close">
            <View style={styles.handle} />
          </Pressable>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>

          <View style={styles.grid}>
            {options.map((opt, i) => (
              <Tile
                key={opt.id}
                option={opt}
                index={i}
                open={visible}
                selected={draft.includes(opt.id)}
                onPress={() => toggle(opt.id)}
              />
            ))}
          </View>

          <Button
            title={`Apply (${draft.length} Selected)`}
            pill
            textStyle={styles.applyText}
            onPress={() => onApply(draft)}
          />
          <View style={styles.homeBar} />
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  card: {
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  handle: {
    alignSelf: 'center',
    width: 80,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    marginBottom: spacing.lg,
  },
  title: {
    fontFamily: fontFamily.semiBold,
    fontSize: 20,
    lineHeight: 26,
    color: colors.textHeading,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textLight,
    marginTop: 2,
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
    marginBottom: spacing.xs,
  },
  cell: {
    width: '33.333%',
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  tile: {
    height: 130,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.tileBorder,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    ...shadow.tile,
  },
  tileSelected: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.accentBorder,
  },
  icon: {
    width: 76,
    height: 76,
    marginBottom: 8,
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textHeading,
    textAlign: 'center',
  },
  applyText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
  },
  homeBar: {
    alignSelf: 'center',
    width: 80,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    marginTop: spacing.md,
  },
});
