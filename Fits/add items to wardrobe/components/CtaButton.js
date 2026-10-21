import React from 'react';
import { Text, Pressable, Animated, StyleSheet } from 'react-native';
import { fontFamily } from '../../../src/theme';
import { wardrobeColors } from '../theme';

// 64px black pill CTA (radius 24). `secondary` renders the text-only variant ("Retake", "Add another item").
export default function CtaButton({ title, onPress, disabled, secondary, style }) {
  const scale = React.useRef(new Animated.Value(1)).current;
  const to = (v) => Animated.spring(scale, { toValue: v, friction: 6, tension: 200, useNativeDriver: true }).start();
  return (
    <Animated.View style={[{ transform: [{ scale }], opacity: disabled ? 0.4 : 1 }, style]}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        onPressIn={() => to(0.97)}
        onPressOut={() => to(1)}
        style={[styles.btn, secondary && styles.secondary]}
        accessibilityRole="button"
      >
        <Text style={[styles.text, secondary && styles.secondaryText]}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  btn: { height: 64, borderRadius: 24, backgroundColor: wardrobeColors.ctaBg, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  secondary: { backgroundColor: 'transparent' },
  text: { fontFamily: fontFamily.semiBold, fontSize: 18, lineHeight: 24, color: wardrobeColors.ctaText },
  secondaryText: { color: '#000' },
});
