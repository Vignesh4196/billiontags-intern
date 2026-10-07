import React from 'react';
import { Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from './BottomSheet';
import { colors, spacing, typography, fontFamily } from '../theme';

export default function OptionSheet({ visible, title, options, selected, onSelect, onClose, emptyText = 'Nothing left to add' }) {
  return (
    <BottomSheet visible={visible} onClose={onClose}>
      {!!title && <Text style={styles.title}>{title}</Text>}
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {options.length === 0 && <Text style={styles.empty}>{emptyText}</Text>}
        {options.map((option) => {
          const isSelected = option === selected;
          return (
            <TouchableOpacity
              key={option}
              style={styles.row}
              activeOpacity={0.6}
              onPress={() => onSelect(option)}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
            >
              <Text style={[styles.rowText, isSelected && styles.rowTextSelected]}>{option}</Text>
              {isSelected && <Ionicons name="checkmark" size={20} color={colors.textPrimary} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.heading3,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  list: {
    maxHeight: 360,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderRow,
  },
  rowText: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.textPrimary,
  },
  rowTextSelected: {
    fontFamily: fontFamily.semiBold,
  },
  empty: {
    ...typography.body,
    textAlign: 'center',
    paddingVertical: spacing.xl,
  },
});
