import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

const TABS = [
  { key: 'Home', label: 'Home', icon: 'home-outline' },
  { key: 'Us', label: 'Us', icon: 'heart-outline' },
  { key: 'add', isAction: true },
  { key: 'Plans', label: 'Plans', icon: 'alarm-outline' },
  { key: 'Profile', label: 'Profile', icon: 'person-outline' },
];

export default function BottomTabBar({ activeTab = 'Profile', onTabPress, onAddPress, scale = 1 }) {
  return (
    <View style={[styles.container, { height: 117 * scale * scale, borderRadius: 30 * scale }]}>
      {TABS.map((tab) => {
        if (tab.isAction) {
          return (
            <TouchableOpacity
              key="add"
              style={[styles.addButtonWrap, { marginTop: -22 * scale }]}
              onPress={onAddPress}
              activeOpacity={0.8}
            >
              <Image
                source={require('../../assets/add-button.png')}
                style={[styles.addButtonImage, { width: Math.max(84, 102 * scale), height: Math.max(84, 102 * scale) }]}
                resizeMode="contain"
                accessibilityLabel="Add"
              />
            </TouchableOpacity>
          );
        }

        const isActive = tab.key === activeTab;

        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, { gap: 8 * scale, paddingTop: 30 * scale * scale }]}
            onPress={() => onTabPress && onTabPress(tab.key)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={tab.icon}
              size={28 * scale}
              color={isActive ? colors.tabActive : colors.tabInactive}
            />
            <Text style={[styles.label, { fontSize: 16 * scale }, isActive && styles.labelActive]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: colors.white,
    height: 117,
    borderRadius: 30,
    overflow: 'visible',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
    paddingTop: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.tabInactive,
  },
  labelActive: {
    color: colors.tabActive,
  },
  addButtonWrap: {
    flex: 1,
    alignItems: 'center',
    marginTop: -22,
  },
  addButtonImage: {
    width: 102,
    height: 102,
  },
});
