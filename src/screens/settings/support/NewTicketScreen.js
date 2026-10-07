import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import BottomSheet from '../../../components/BottomSheet';
import { addTicket } from '../../../state/supportSlice';
import { colors, spacing, radius, typography, fontFamily } from '../../../theme';

const CATEGORIES = ['Account security & login', 'Billing & payment', 'Technical issue', 'Other'];

export default function NewTicketScreen({ navigation }) {
  const dispatch = useDispatch();
  const [category, setCategory] = React.useState(CATEGORIES[0]);
  const [subject, setSubject] = React.useState('Unable to change recovery email address');
  const [description, setDescription] = React.useState(
    "I'm trying to replace my old workspace address with my personal gmail, but whenever i request the verification link, i don't receive any email. I've already checked my spam folder."
  );
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [screenshot, setScreenshot] = React.useState(null);

  const handleCreate = () => {
    dispatch(addTicket({ category, subject, description }));
    navigation.goBack();
  };

  const handlePickScreenshot = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Allow photo library access to attach a screenshot.');
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
    });

    if (!result.canceled && result.assets?.length) {
      setScreenshot(result.assets[0]);
    }
  };

  const handleRemoveScreenshot = () => setScreenshot(null);

  return (
    <View style={styles.container}>
      <ScreenHeader title="New ticket" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Describe your issue</Text>

        <Input
          label="Support category"
          value={category}
          editable={false}
          onPress={() => setSheetOpen(true)}
          iconName="chevron-down"
          style={styles.field}
        />

        <Input label="Subject" value={subject} onChangeText={setSubject} style={styles.field} />

        <Input
          label="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          style={styles.field}
        />

        {screenshot ? (
          <View style={styles.uploadRow}>
            <Image source={{ uri: screenshot.uri }} style={styles.thumbnail} />
            <Text style={styles.uploadTextFilled} numberOfLines={1}>
              {screenshot.fileName || 'Screenshot attached'}
            </Text>
            <TouchableOpacity onPress={handleRemoveScreenshot} hitSlop={8}>
              <Ionicons name="close-circle" size={20} color={colors.tabInactive} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.uploadRow} activeOpacity={0.7} onPress={handlePickScreenshot}>
            <Ionicons name="image-outline" size={20} color={colors.tabInactive} />
            <Text style={styles.uploadText}>Upload screenshot (optional)</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <View style={styles.bottomBar}>
        <Button title="Create support ticket" variant="primary" pill onPress={handleCreate} />
      </View>

      <BottomSheet visible={sheetOpen} onClose={() => setSheetOpen(false)}>
        <Text style={styles.sheetTitle}>Support category</Text>
        {CATEGORIES.map((option, i) => {
          const selected = option === category;
          return (
            <TouchableOpacity
              key={option}
              style={[styles.sheetRow, i < CATEGORIES.length - 1 && styles.sheetRowBorder]}
              onPress={() => {
                setCategory(option);
                setSheetOpen(false);
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.sheetRowText}>{option}</Text>
              {selected && <Ionicons name="checkmark" size={20} color={colors.textPrimary} />}
            </TouchableOpacity>
          );
        })}
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceMuted,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  sectionTitle: {
    ...typography.heading3,
    fontFamily: fontFamily.bold,
    fontSize: 16,
    marginBottom: spacing.lg,
  },
  field: {
    marginBottom: spacing.lg,
  },
  uploadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 30,
    paddingHorizontal: spacing.xl,
    height: 58,
  },
  uploadText: {
    ...typography.body,
    fontSize: 14,
    color: colors.tabInactive,
  },
  uploadTextFilled: {
    ...typography.body,
    fontSize: 14,
    color: colors.textPrimary,
    flex: 1,
  },
  thumbnail: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
  },
  bottomBar: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: 34,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  sheetTitle: {
    ...typography.heading3,
    fontFamily: fontFamily.bold,
    fontSize: 16,
    marginBottom: spacing.md,
  },
  sheetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  sheetRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderRow,
  },
  sheetRowText: {
    ...typography.body,
    fontSize: 15,
    color: colors.textPrimary,
  },
});
