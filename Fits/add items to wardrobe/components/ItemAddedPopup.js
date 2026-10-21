import React from 'react';
import { Modal, View, Text, Image, Animated, StyleSheet } from 'react-native';
import CtaButton from './CtaButton';
import { colors, fontFamily, radius, shadow } from '../../../src/theme';

// "Item Added" success popup: card springs in, the green tick pops after it.
export default function ItemAddedPopup({ visible, onView, onAddAnother }) {
  const card = React.useRef(new Animated.Value(0)).current;
  const tick = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (!visible) {
      card.setValue(0);
      tick.setValue(0);
      return;
    }
    Animated.sequence([
      Animated.spring(card, { toValue: 1, friction: 7, tension: 90, useNativeDriver: true }),
      Animated.spring(tick, { toValue: 1, friction: 4, tension: 160, useNativeDriver: true }),
    ]).start();
  }, [visible, card, tick]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onAddAnother}>
      <View style={styles.backdrop}>
        <Animated.View style={[styles.card, { opacity: card, transform: [{ scale: card.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1] }) }] }]}>
          <Animated.View style={{ transform: [{ scale: tick }] }}>
            <Image source={require('../assets/success-check.png')} style={styles.tick} />
          </Animated.View>
          <Text style={styles.title}>Item Added</Text>
          <Text style={styles.body}>Your new item is now part of your wardrobe. Ready to style it?</Text>
          <View style={styles.actions}>
            <CtaButton title="View item" onPress={onView} />
            <CtaButton title="Add another item" onPress={onAddAnother} secondary style={styles.second} />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    paddingTop: 32,
    paddingHorizontal: 20,
    paddingBottom: 16,
    alignItems: 'center',
    ...shadow.card,
  },
  tick: { width: 60, height: 60 },
  title: { marginTop: 16, fontFamily: fontFamily.bold, fontSize: 20, lineHeight: 24, color: colors.textPrimary },
  body: { marginTop: 18, width: 248, textAlign: 'center', fontFamily: fontFamily.regular, fontSize: 16, lineHeight: 24, color: colors.textFaint },
  actions: { width: '100%', marginTop: 16 },
  second: { marginTop: 12 },
});
