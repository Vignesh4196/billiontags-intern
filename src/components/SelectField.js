import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import OptionSheet from './OptionSheet';
import { fieldStyles } from './Input';
import { colors } from '../theme';

export default function SelectField({ label, value, options, onChange, large = false, style }) {
  const [open, setOpen] = React.useState(false);

  return (
    <View style={style}>
      {!!label && <Text style={[fieldStyles.label, large && fieldStyles.labelLarge]}>{label}</Text>}
      <TouchableOpacity
        style={[fieldStyles.field, large && fieldStyles.fieldLarge]}
        activeOpacity={0.7}
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${value}`}
      >
        <Text style={[fieldStyles.value, large && fieldStyles.valueLarge]} numberOfLines={1}>{value}</Text>
        <Ionicons name="chevron-down" size={large ? 20 : 18} color={colors.fieldLabel} />
      </TouchableOpacity>

      <OptionSheet
        visible={open}
        title={label}
        options={options}
        selected={value}
        onSelect={(option) => {
          onChange(option);
          setOpen(false);
        }}
        onClose={() => setOpen(false)}
      />
    </View>
  );
}
