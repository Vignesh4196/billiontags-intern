import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Input from './Input';
import BottomSheet from './BottomSheet';
import Button from './Button';
import { formatDateToDob, formatTimeTo12h } from '../utils/dateFormat';
import { spacing, typography } from '../theme';

export default function PickerField({ label, iconName, iconSet, iconColor, mode, value, onChange, maximumDate, large, formatValue, style }) {
  const [visible, setVisible] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const displayValue = formatValue ? formatValue(value) : mode === 'date' ? formatDateToDob(value) : formatTimeTo12h(value);

  const open = () => {
    setTempValue(value);
    setVisible(true);
  };

  const confirm = () => {
    onChange(tempValue);
    setVisible(false);
  };

  return (
    <>
      <Input
        label={label}
        value={displayValue}
        editable={false}
        iconName={iconName}
        iconSet={iconSet}
        iconColor={iconColor}
        onPress={open}
        large={large}
        style={style}
      />

      <BottomSheet visible={visible} onClose={() => setVisible(false)}>
        <Text style={styles.title}>{label}</Text>
        <DateTimePicker
          value={tempValue}
          mode={mode}
          display="spinner"
          maximumDate={maximumDate}
          onChange={(event, selected) => {
            if (selected) setTempValue(selected);
          }}
        />
        <Button title="Done" onPress={confirm} style={styles.doneButton} />
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.heading3,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  doneButton: {
    marginTop: spacing.md,
  },
});
