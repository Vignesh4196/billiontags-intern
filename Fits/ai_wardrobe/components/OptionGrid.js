import React from 'react';
import { View, StyleSheet } from 'react-native';
import OptionCard from './OptionCard';

// Grid of OptionCards. `options` = [{ id, label, emoji, description? }].
export default function OptionGrid({ options, selectedId, onSelect, columns = 4, gap = 10 }) {
  return (
    <View style={[styles.grid, { marginHorizontal: -gap / 2 }]}>
      {options.map((opt, i) => (
        <View key={opt.id} style={{ width: `${100 / columns}%`, paddingHorizontal: gap / 2, marginBottom: gap }}>
          <OptionCard
            index={i}
            icon={opt.icon}
            emoji={opt.emoji}
            label={opt.label}
            description={opt.description}
            selected={selectedId === opt.id}
            onPress={() => onSelect?.(opt.id)}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
