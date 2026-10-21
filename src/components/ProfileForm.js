import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Modal, Platform, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScreenHeader from './ScreenHeader';
import Input, { fieldStyles } from './Input';
import Chip from './Chip';
import PickerField from './PickerField';
import SelectField from './SelectField';
import OptionSheet from './OptionSheet';
import Button from './Button';
import Popup from './Popup';
import { parseDobToDate, parseTimeTo24, formatDateToDob, formatTimeTo12h } from '../utils/dateFormat';
import { colors, spacing, radius, typography, fontFamily } from '../theme';

const interestIcons = {
  Music: 'musical-notes-outline',
  Travel: 'airplane-outline',
  Coffee: 'cafe-outline',
  Photography: 'camera-outline',
  Books: 'book-outline',
  Food: 'restaurant-outline',
  Movies: 'film-outline',
  Fitness: 'barbell-outline',
  Art: 'color-palette-outline',
  Gaming: 'game-controller-outline',
};

// My profile edit form. handle: grey line under the name. options: profileOptions from the slice.
export default function ProfileForm({ headerTitle, avatarSource, profile, handle, options, onSave, onBack }) {
  const insets = useSafeAreaInsets();

  const [fullName, setFullName] = React.useState(profile.fullName);
  const [phone, setPhone] = React.useState(profile.phone);
  const [dateOfBirth, setDateOfBirth] = React.useState(() => parseDobToDate(profile.dateOfBirth));
  const [birthTime, setBirthTime] = React.useState(() => parseTimeTo24(profile.birthTime));
  const [nationality, setNationality] = React.useState(profile.nationality);
  const [state, setState] = React.useState(profile.state);
  const [district, setDistrict] = React.useState(profile.district);
  const [birthPlace, setBirthPlace] = React.useState(profile.birthPlace);
  const [zodiacSign, setZodiacSign] = React.useState(profile.zodiacSign);
  const [languages, setLanguages] = React.useState(profile.languages || []);
  const [interests, setInterests] = React.useState(profile.interests || []);
  const [addSheet, setAddSheet] = React.useState(null);
  const [avatarUri, setAvatarUri] = React.useState(profile.avatarUri || null);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [confirmVisible, setConfirmVisible] = React.useState(false);
  const uploadRef = React.useRef(null);

  const districtsByState = options?.districtsByState || {};

  const changeState = (nextState) => {
    setState(nextState);
    const districts = districtsByState[nextState] || [];
    if (!districts.includes(district)) setDistrict(districts[0]);
  };

  const useImageResult = (result) => {
    if (!result.canceled && result.assets?.[0]?.uri) setAvatarUri(result.assets[0].uri);
  };

  const takePhoto = async () => {
    if (Platform.OS === 'web') {
      uploadRef.current?.click?.();
      return;
    }
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Camera access needed', 'Allow camera access to take a profile photo.');
      return;
    }
    useImageResult(await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], cameraType: ImagePicker.CameraType.front, quality: 0.85 }));
  };

  const choosePhoto = async () => {
    if (Platform.OS === 'web') {
      uploadRef.current?.click?.();
      return;
    }
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Photo access needed', 'Allow photo library access to choose a profile photo.');
      return;
    }
    useImageResult(await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.85 }));
  };

  const openPhotoOptions = () => {
    if (Platform.OS === 'web') {
      uploadRef.current?.click?.();
      return;
    }
    Alert.alert('Profile photo', 'Choose how you want to add a photo.', [
      { text: 'Take photo', onPress: takePhoto },
      { text: 'Choose from library', onPress: choosePhoto },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleSave = () => {
    onSave({
      fullName,
      phone,
      dateOfBirth: formatDateToDob(dateOfBirth),
      birthTime: formatTimeTo12h(birthTime),
      avatarUri,
      interests,
      nationality,
      state,
      district,
      birthPlace,
      zodiacSign,
      languages,
    });
  };

  // True once any field differs from what the screen opened with.
  const hasChanges = fullName !== profile.fullName
    || phone !== profile.phone
    || formatDateToDob(dateOfBirth) !== profile.dateOfBirth
    || formatTimeTo12h(birthTime) !== profile.birthTime
    || avatarUri !== (profile.avatarUri || null)
    || JSON.stringify(interests) !== JSON.stringify(profile.interests || [])
    || nationality !== profile.nationality
    || state !== profile.state
    || district !== profile.district
    || birthPlace !== profile.birthPlace
    || zodiacSign !== profile.zodiacSign
    || JSON.stringify(languages) !== JSON.stringify(profile.languages || []);

  const handleBack = () => {
    if (hasChanges) setConfirmVisible(true);
    else onBack();
  };

  const discardChanges = () => {
    setConfirmVisible(false);
    onBack();
  };

  const saveChanges = () => {
    setConfirmVisible(false);
    handleSave();
  };

  const addSheetOptions = addSheet === 'languages'
    ? (options?.languages || []).filter((language) => !languages.includes(language))
    : addSheet === 'interests'
      ? (options?.interests || Object.keys(interestIcons)).filter((interest) => !interests.includes(interest))
      : [];

  const addFromSheet = (option) => {
    if (addSheet === 'languages') setLanguages((current) => [...current, option]);
    if (addSheet === 'interests') setInterests((current) => [...current, option]);
    setAddSheet(null);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        large
        title={headerTitle}
        onBack={handleBack}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrap}>
            <TouchableOpacity activeOpacity={0.85} onPress={() => setPreviewVisible(true)}>
              <Image source={avatarUri ? { uri: avatarUri } : avatarSource} style={styles.avatar} accessibilityLabel={`${profile.displayName}'s profile photo`} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraBadge} activeOpacity={0.7} onPress={openPhotoOptions} accessibilityLabel="Change profile photo">
              <Ionicons name="camera-outline" size={14} color={colors.white} />
            </TouchableOpacity>
          </View>
          {Platform.OS === 'web' && (
            <input
              ref={uploadRef}
              type="file"
              accept="image/*"
              capture="user"
              aria-label="Choose profile photo"
              style={{ display: 'none' }}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => setAvatarUri(reader.result);
                reader.readAsDataURL(file);
                event.target.value = '';
              }}
            />
          )}
          <Text style={styles.name}>{profile.displayName}</Text>
          {!!handle && <Text style={styles.handle}>{handle}</Text>}
        </View>

        <Input large label="My name" value={fullName} onChangeText={setFullName} />

        <View style={styles.row}>
          <PickerField
            large
            label="Date of birth"
            mode="date"
            iconName="calendar-month-outline"
            iconSet="material"
            value={dateOfBirth}
            onChange={setDateOfBirth}
            maximumDate={new Date()}
            style={styles.halfField}
          />
          <PickerField
            large
            label="Birth time"
            mode="time"
            iconName="time-outline"
            value={birthTime}
            onChange={setBirthTime}
            style={styles.halfField}
          />
        </View>

        <Input large label="Phone" value={phone} onChangeText={setPhone} iconName="call-outline" keyboardType="phone-pad" />

        <>
            <SelectField large label="Nationality" value={nationality} options={options.nationalities} onChange={setNationality} />

            <View style={styles.row}>
              <SelectField
                large
                label="State"
                value={state}
                options={Object.keys(districtsByState)}
                onChange={changeState}
                style={styles.halfField}
              />
              <SelectField
                large
                label="District"
                value={district}
                options={districtsByState[state] || []}
                onChange={setDistrict}
                style={styles.halfField}
              />
            </View>

            <Input large label="Birth place" value={birthPlace} onChangeText={setBirthPlace} />

            <SelectField large label="Zodiac Sign" value={zodiacSign} options={options.zodiacSigns} onChange={setZodiacSign} />

            <View>
              <Text style={fieldStyles.label}>Languages</Text>
              <View style={styles.chipRow}>
                {languages.map((language) => (
                  <Chip key={language} label={language} variant="outline" onRemove={() => setLanguages((current) => current.filter((item) => item !== language))} />
                ))}
                <Chip label="Add" iconName="add" variant="filled" onPress={() => setAddSheet('languages')} />
              </View>
            </View>
        </>

        <View>
          <Text style={fieldStyles.label}>Interest</Text>
          <View style={styles.chipRow}>
            <Chip label="Add" iconName="add" variant="filled" onPress={() => setAddSheet('interests')} />
            {interests.map((interest) => (
              <Chip key={interest} label={interest} iconName={interestIcons[interest] || 'heart-outline'} variant="muted" onRemove={() => setInterests((current) => current.filter((item) => item !== interest))} />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.xxl }]}>
        <Button title="Save" pill onPress={handleSave} style={styles.saveButton} textStyle={styles.saveText} />
      </View>

      <OptionSheet
        visible={!!addSheet}
        title={addSheet === 'languages' ? 'Add language' : 'Add interest'}
        options={addSheetOptions}
        onSelect={addFromSheet}
        onClose={() => setAddSheet(null)}
      />

      <Popup visible={confirmVisible} onClose={() => setConfirmVisible(false)}>
        <Text style={styles.confirmTitle}>Confirmation</Text>
        <Text style={styles.confirmMessage}>You need to save your changes before moving onto your next action.</Text>
        <View style={styles.confirmActions}>
          <Button title="Discard" variant="outline" pill onPress={discardChanges} style={styles.confirmButton} textStyle={styles.confirmText} />
          <Button title="Save changes" pill onPress={saveChanges} style={styles.confirmButton} textStyle={styles.confirmText} />
        </View>
      </Popup>

      <Modal visible={previewVisible} transparent animationType="fade" onRequestClose={() => setPreviewVisible(false)}>
        <Pressable style={styles.previewBackdrop} onPress={() => setPreviewVisible(false)}>
          <TouchableOpacity style={styles.previewClose} onPress={() => setPreviewVisible(false)} accessibilityLabel="Close photo preview">
            <Ionicons name="close" size={26} color={colors.white} />
          </TouchableOpacity>
          <Image source={avatarUri ? { uri: avatarUri } : avatarSource} style={styles.previewImage} resizeMode="contain" accessibilityLabel="Profile photo preview" />
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: 11,
    paddingBottom: spacing.xxl,
    gap: spacing.xl,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatarWrap: {
    width: 96,
    height: 96,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  cameraBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.tabActive,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  name: {
    ...typography.heading3,
    fontSize: 20,
    lineHeight: 28,
    color: colors.textDark,
    marginTop: spacing.md,
  },
  handle: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textHint,
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  halfField: {
    flex: 1,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 12,
    rowGap: spacing.md,
  },
  footer: {
    paddingHorizontal: spacing.xxl,
    paddingTop: 12,
    backgroundColor: colors.white,
  },
  saveButton: {
    height: 64,
    borderRadius: radius.pill,
  },
  saveText: {
    fontSize: 18,
  },
  confirmTitle: {
    ...typography.heading3,
    fontFamily: fontFamily.semiBold,
    fontSize: 20,
    lineHeight: 26,
    color: colors.textPrimary,
  },
  confirmMessage: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    lineHeight: 23,
    color: colors.textPrimary,
    marginTop: spacing.lg,
  },
  confirmActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  confirmButton: {
    flex: 1,
    width: undefined,
    height: 56,
  },
  confirmText: {
    fontSize: 16,
  },
  previewBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  previewImage: { width: '100%', height: '75%' },
  previewClose: { position: 'absolute', top: 48, right: 24, zIndex: 1, padding: 8 },
});
