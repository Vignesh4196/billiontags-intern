import React from 'react';
import { View, Text, Image, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import SettingsCard from './SettingsCard';
import { useHeartbeat } from '../hooks/useHeartbeat';
import { useDrift } from '../hooks/useDrift';
import { colors, typography, fontFamily } from '../theme';

const coupleHeart = require('../assets/images/us-card-heart.png');
const coupleBackground = require('../assets/images/us-card-bg.png');

const AVATAR_SIZE = 62;
// Clouds at their original size: the strip band is 59 tall, and the tile width keeps the image's
// real aspect ratio (347×52) so the clouds are never squished. A tile ≈ one card width, and copies
// of it flow through continuously.
const CLOUD_ASPECT = 52 / 347; // us-card-bg.png is 347×52
const CLOUD_HEIGHT = 59;
const TILE_WIDTH = CLOUD_HEIGHT / CLOUD_ASPECT;
// One tile slides across in this time (a slow drift, ~20px/s); the strip then loops seamlessly to the next identical tile.
const SLIDE_MS = 25000;

function AvatarBlock({ source, name, onPress, accessibilityLabel }) {
  return (
    <TouchableOpacity style={styles.avatarBlock} activeOpacity={0.8} onPress={onPress} accessibilityLabel={accessibilityLabel}>
      <View style={styles.avatarCircle}>
        <Image source={source} style={styles.avatarImage} accessibilityLabel={`${name}'s profile photo`} />
      </View>
      <Text style={styles.name} numberOfLines={1}>{name}</Text>
    </TouchableOpacity>
  );
}

export default function CoupleCard({ userName, userAvatar, partnerName, partnerAvatar, togetherLabel, onUserPress, onPartnerPress, style }) {
  const heartTransform = useHeartbeat();
  const [cardWidth, setCardWidth] = React.useState(0);
  const tileWidth = TILE_WIDTH;
  const tileHeight = CLOUD_HEIGHT;
  // Enough tiles to cover the strip plus one spare, so the loop never shows a gap.
  const tileCount = cardWidth ? Math.ceil(cardWidth / tileWidth) + 1 : 0;
  const stripShift = useDrift(tileWidth, SLIDE_MS);

  return (
    <SettingsCard style={[styles.card, style]}>
      <View style={styles.stripClip} pointerEvents="none" onLayout={(event) => setCardWidth(event.nativeEvent.layout.width)}>
        {tileCount > 0 && (
          <Animated.View style={[styles.stripRow, { transform: [{ translateX: stripShift }] }]}>
            {Array.from({ length: tileCount }).map((_, index) => (
              <Image key={index} source={coupleBackground} resizeMode="stretch" style={{ width: tileWidth, height: tileHeight }} />
            ))}
          </Animated.View>
        )}
      </View>

      <View style={styles.row}>
        <AvatarBlock source={userAvatar} name={userName} onPress={onUserPress} accessibilityLabel="Open your profile" />
        <Animated.Image source={coupleHeart} resizeMode="contain" style={[styles.heart, { transform: heartTransform }]} />
        <AvatarBlock source={partnerAvatar} name={partnerName} onPress={onPartnerPress} accessibilityLabel={`Open ${partnerName}'s profile`} />
      </View>

      {!!togetherLabel && (
        <View style={styles.pill}>
          <Text style={styles.pillText} numberOfLines={1}>{togetherLabel}</Text>
        </View>
      )}
    </SettingsCard>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingTop: 31,
    paddingHorizontal: 20,
    paddingBottom: 20,
    overflow: 'hidden',
  },
  stripClip: {
    position: 'absolute',
    top: 24,
    left: 0,
    right: 0,
    height: 59,
    overflow: 'hidden',
  },
  stripRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 59,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 30,
  },
  avatarBlock: {
    alignItems: 'center',
    minWidth: AVATAR_SIZE,
    gap: 4,
  },
  avatarCircle: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: colors.pinkBackground,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  name: {
    ...typography.heading3,
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
    lineHeight: 23,
  },
  heart: {
    width: 54,
    height: 46,
    marginTop: 25,
  },
  pill: {
    marginTop: 17,
    minHeight: 37,
    borderRadius: 10,
    backgroundColor: colors.pinkBackground,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  pillText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    lineHeight: 18,
    color: colors.pink,
    textAlign: 'center',
  },
});
