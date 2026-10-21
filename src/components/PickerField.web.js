import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { fieldStyles, FieldIcon } from './Input';
import { formatDateToDob, formatTimeTo12h } from '../utils/dateFormat';

function toHtmlDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function toHtmlTime(date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

// Shows the value in the app's format (DD/MM/YYYY, hh:mm AM) and opens the
// browser's native picker from a hidden <input> on tap.
export default function PickerField({ label, iconName, iconSet, iconColor, mode, value, onChange, maximumDate, large = false, formatValue, style }) {
  const inputRef = React.useRef(null);

  const handleChange = (event) => {
    const raw = event.target.value;
    if (!raw) return;

    if (mode === 'date') {
      const [year, month, day] = raw.split('-').map(Number);
      onChange(new Date(year, month - 1, day));
    } else {
      const [hours, minutes] = raw.split(':').map(Number);
      const next = new Date(value);
      next.setHours(hours, minutes, 0, 0);
      onChange(next);
    }
  };

  const openPicker = () => {
    const input = inputRef.current;
    if (!input) return;
    try {
      input.showPicker();
    } catch (e) {
      input.focus();
    }
  };

  const displayValue = formatValue ? formatValue(value) : mode === 'date' ? formatDateToDob(value) : formatTimeTo12h(value);

  return (
    <View style={style}>
      {!!label && <Text style={[fieldStyles.label, large && fieldStyles.labelLarge]}>{label}</Text>}
      <TouchableOpacity style={[fieldStyles.field, large && fieldStyles.fieldLarge]} activeOpacity={0.7} onPress={openPicker} accessibilityRole="button" accessibilityLabel={`${label}: ${displayValue}`}>
        <Text style={[fieldStyles.value, large && fieldStyles.valueLarge]} numberOfLines={1}>{displayValue}</Text>
        {!!iconName && <FieldIcon name={iconName} iconSet={iconSet} color={iconColor} />}
        <input
          ref={inputRef}
          type={mode}
          tabIndex={-1}
          aria-hidden="true"
          value={mode === 'date' ? toHtmlDate(value) : toHtmlTime(value)}
          max={mode === 'date' && maximumDate ? toHtmlDate(maximumDate) : undefined}
          onChange={handleChange}
          style={hiddenInputStyle}
        />
      </TouchableOpacity>
    </View>
  );
}

const hiddenInputStyle = {
  position: 'absolute',
  left: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
  opacity: 0,
  pointerEvents: 'none',
  border: 'none',
};
