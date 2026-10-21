import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from '../../../src/components/BottomSheet';
import CtaButton from './CtaButton';
import { colors, fontFamily, shadow } from '../../../src/theme';

// "Camera / Albam" popup (label spelled as in the design).
export default function PhotoSourceSheet({ visible, onClose, onCamera, onAlbum }) {
  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <View style={styles.list}>
        <Pressable style={({ hovered, pressed }) => [styles.row, (hovered || pressed) && styles.rowActive]} onPress={onCamera}>
          <Ionicons name="camera-outline" size={24} color={colors.textSecondary} />
          <Text style={styles.text}>Camera</Text>
        </Pressable>
        <View style={styles.divider} />
        <Pressable style={({ hovered, pressed }) => [styles.row, (hovered || pressed) && styles.rowActive]} onPress={onAlbum}>
          <Ionicons name="images-outline" size={24} color={colors.textSecondary} />
          <Text style={styles.text}>Album</Text>
        </Pressable>
      </View>
      <CtaButton title="Cancel" onPress={onClose} style={styles.cancel} />
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  list: { backgroundColor: colors.white, borderRadius: 20, borderWidth: 0.5, borderColor: colors.border, overflow: 'hidden', ...shadow.cardSoft },
  row: { height: 72, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 },
  rowActive: { backgroundColor: colors.surfaceMuted },
  divider: { height: 1, backgroundColor: colors.borderDivider },
  text: { marginLeft: 12, fontFamily: fontFamily.semiBold, fontSize: 18, color: colors.textPrimary },
  cancel: { marginTop: 10 },
});
