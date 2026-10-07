import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, radius, typography, fontFamily } from '../theme';
import Toggle from './Toggle';

const iconSets = {
  ionicon: Ionicons,
  material: MaterialCommunityIcons,
};

export default function SettingsRow({
  iconName,
  iconSet = 'ionicon',
  iconImage,
  iconImageSize,
  IconComponent: CustomIcon,
  title,
  subtitle,
  valueLabel,
  selected = false,
  noIcon = false,
  onPress,
  showBorder = true,
  showChevron = true,
  toggleValue,
  onToggleChange,
  chevronColor = colors.textMuted,
  chevronSize = 18,
  iconSize = 22,
  iconRound = false,
  style,
  scale = 1,
}) {
  const IconComponent = iconSets[iconSet] || Ionicons;
  const isToggleRow = typeof toggleValue === 'boolean';
  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper
      style={[styles.row, { gap: 20 * scale, paddingLeft: 16 * scale, paddingRight: 30 * scale, paddingVertical: 16 * scale }, showBorder && styles.rowBorder, style]}
      onPress={onPress}
      activeOpacity={onPress ? 0.6 : undefined}
    >
      {noIcon ? null : iconImage ? (
        iconImageSize ? (
          // Small icon centered inside the gray background container
          <View style={[styles.iconBackground, { width: 48 * scale, height: 48 * scale, borderRadius: 16 * scale }]}>
            <Image
              source={iconImage}
              style={{ width: iconImageSize * scale, height: iconImageSize * scale }}
              resizeMode="contain"
            />
          </View>
        ) : (
          <Image
            source={iconImage}
            style={{ width: 48 * scale, height: 48 * scale, borderRadius: 16 * scale }}
            resizeMode="cover"
          />
        )
      ) : (
        <View style={[styles.iconBackground, { width: 48 * scale, height: 48 * scale, borderRadius: (iconRound ? 24 : 16) * scale }]}>
          {CustomIcon ? (
            <CustomIcon size={iconSize * scale} />
          ) : (
            <IconComponent name={iconName} size={22 * scale} color={colors.textPrimary} />
          )}
        </View>
      )}

      <View style={styles.textContainer}>
        <Text style={[styles.title, { fontSize: 16 * scale, lineHeight: 21 * scale }]}>{title}</Text>
        {!!subtitle && <Text style={[styles.subtitle, { fontSize: 12 * scale, lineHeight: 16 * scale }]}>{subtitle}</Text>}
      </View>

      {isToggleRow ? (
        <Toggle value={toggleValue} onValueChange={onToggleChange} />
      ) : selected ? (
        <Ionicons name="checkmark" size={20 * scale} color={colors.textPrimary} />
      ) : (
        <View style={styles.trailing}>
          {!!valueLabel && <Text style={[styles.valueLabel, { fontSize: 13 * scale }]}>{valueLabel}</Text>}
          {showChevron && (
            <Ionicons name="chevron-forward" size={chevronSize * scale} color={chevronColor} />
          )}
        </View>
      )}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xl,
    paddingLeft: spacing.lg,
    paddingRight: spacing.xxl + 6,
    paddingVertical: spacing.lg,
    width: '100%',
    backgroundColor: colors.white,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderRow,
  },
  iconBackground: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.iconBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...typography.heading3,
    fontFamily: fontFamily.bold,
    fontSize: 16,
  },
  subtitle: {
    ...typography.caption,
    fontSize: 12,
  },
  trailing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  valueLabel: {
    ...typography.caption,
    fontSize: 13,
    color: colors.textMuted,
  },
});
