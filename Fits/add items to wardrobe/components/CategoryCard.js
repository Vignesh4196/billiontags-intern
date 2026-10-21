import React from 'react';
import { View, Text, Image, Pressable, Animated, StyleSheet } from 'react-native';
import CheckBadge from './CheckBadge';
import { colors, radius, shadow, typography, fontFamily } from '../../../src/theme';
import { wardrobeColors } from '../theme';

// Design slot width (105.33px); artwork keeps its Figma offset from the slot centre so it stays centred on narrower phones.
const SLOT_W = 105.33;
const CARD_W = 122.67;

// Artwork is placed like Figma; shared artwork (tops, jackets) is scaled inside a clipped box.
// `k` shrinks everything proportionally when the card is narrower than the 105px design slot.
function Artwork({ item, k }) {
  const { slot, crop } = item;
  return (
    <View style={[StyleSheet.absoluteFill, { alignItems: 'center' }]}>
      <View
        style={{
          marginTop: slot.y * k,
          width: slot.w * k,
          height: slot.h * k,
          overflow: 'hidden',
          transform: [{ translateX: (slot.x + slot.w / 2 - SLOT_W / 2) * k }],
        }}
      >
        {crop ? (
          <Image
            source={item.image}
            resizeMode="stretch"
            style={{ position: 'absolute', width: `${crop.w}%`, height: `${crop.h}%`, left: `${crop.x}%`, top: `${crop.y}%` }}
          />
        ) : (
          <Image source={item.image} resizeMode="stretch" style={{ width: '100%', height: '100%' }} />
        )}
      </View>
    </View>
  );
}

export default function CategoryCard({ item, selected, onPress }) {
  const [slotWidth, setSlotWidth] = React.useState(SLOT_W);
  const [cardWidth, setCardWidth] = React.useState(CARD_W);
  const scale = React.useRef(new Animated.Value(1)).current;
  const badge = React.useRef(new Animated.Value(selected ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.spring(badge, { toValue: selected ? 1 : 0, friction: 5, tension: 140, useNativeDriver: true }).start();
    if (selected) {
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.05, duration: 110, useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }),
      ]).start();
    }
  }, [selected, badge, scale]);

  const press = (to) => Animated.timing(scale, { toValue: to, duration: 90, useNativeDriver: true }).start();

  return (
    <Animated.View style={[styles.wrap, { transform: [{ scale }] }]}>
      <Pressable
        onPress={onPress}
        onPressIn={() => press(0.96)}
        onPressOut={() => press(1)}
        onLayout={(e) => setCardWidth(e.nativeEvent.layout.width)}
        style={[styles.card, selected && styles.cardSelected]}
        accessibilityRole="button"
        accessibilityState={{ selected }}
      >
        <View style={styles.imageSlot} onLayout={(e) => setSlotWidth(e.nativeEvent.layout.width)}>
          <Artwork item={item} k={slotWidth / SLOT_W} />
        </View>
        <Text style={[styles.label, { fontSize: Math.max(11, Math.min(18, Math.round(cardWidth * 0.13))) }]} numberOfLines={1}>{item.label}</Text>
      </Pressable>
      <Animated.View pointerEvents="none" style={[styles.badge, { opacity: badge, transform: [{ scale: badge }] }]}>
        <CheckBadge />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    ...shadow.cardSoft,
  },
  cardSelected: {
    backgroundColor: wardrobeColors.lavenderFill,
    borderWidth: 1,
    borderColor: wardrobeColors.lavenderStroke,
    ...shadow.card,
  },
  imageSlot: {
    flex: 1,
    width: '100%',
    borderRadius: radius.md,
    overflow: 'hidden',
    marginBottom: 8,
  },
  label: {
    ...typography.heading3,
    fontFamily: fontFamily.semiBold,
    color: '#000',
    textAlign: 'center',
    width: '100%',
  },
  badge: { position: 'absolute', top: -7, right: -6 },
});
