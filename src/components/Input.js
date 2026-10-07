import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, radius, typography, fontFamily, shadow } from '../theme';

const iconSets = {
  ionicon: Ionicons,
  material: MaterialCommunityIcons,
};

export function FieldIcon({ name, iconSet = 'ionicon', color = colors.fieldLabel }) {
  const IconSet = iconSets[iconSet] || Ionicons;
  return <IconSet name={name} size={24} color={color} />;
}

export default function Input({
  label,
  value,
  onChangeText,
  iconName,
  iconSet,
  iconColor,
  multiline,
  maxLength,
  onPress,
  style,
  ...rest
}) {
  const FieldWrapper = onPress ? TouchableOpacity : View;

  return (
    <View style={style}>
      {!!label && <Text style={fieldStyles.label}>{label}</Text>}

      <FieldWrapper
        style={[fieldStyles.field, multiline && styles.fieldMultiline]}
        onPress={onPress}
        activeOpacity={onPress ? 0.7 : undefined}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          maxLength={maxLength}
          pointerEvents={onPress ? 'none' : 'auto'}
          style={[fieldStyles.value, multiline && styles.inputMultiline]}
          placeholderTextColor={colors.tabInactive}
          {...rest}
          editable={onPress ? false : rest.editable}
        />
        {!!iconName && !multiline && <FieldIcon name={iconName} iconSet={iconSet} color={iconColor} />}

        {multiline && maxLength && (
          <Text style={styles.counter}>{(value || '').length}/{maxLength}</Text>
        )}
      </FieldWrapper>
    </View>
  );
}

// Shared field look, also used by PickerField and SelectField.
export const fieldStyles = StyleSheet.create({
  label: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.fieldLabel,
    marginBottom: spacing.xs + 2,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 28,
    paddingHorizontal: spacing.lg,
    height: 56,
    ...shadow.cardSoft,
  },
  value: {
    flex: 1,
    ...typography.heading3,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.textPrimary,
    padding: 0,
  },
});

const styles = StyleSheet.create({
  fieldMultiline: {
    height: 'auto',
    borderRadius: radius.xl,
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: 17,
    gap: spacing.lg,
  },
  inputMultiline: {
    flex: 0,
    flexGrow: 0,
    flexBasis: 'auto',
    fontSize: 14,
    lineHeight: 18,
    minHeight: 108,
    textAlignVertical: 'top',
  },
  counter: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    lineHeight: 13,
    color: colors.fieldLabel,
    textAlign: 'right',
  },
});
