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
import PartnerBanner from './PartnerBanner';
import Button from './Button';
import { parseDobToDate, parseTimeTo24, formatDateToDob, formatTimeTo12h } from '../utils/dateFormat';
import { colors, spacing, radius, typography, fontFamily } from '../theme';

const BIO_MAX_LENGTH = 300;

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

// connection: { connected, partnerName, sinceLabel, onInvite } shows the
// "Connected with …" banner when connected, otherwise "Invite Your Partner".
// handle / subtitle: grey line under the name. showHeaderSave: ✓ in the header.
// options: profileOptions from the slice; when set, the extended fields
// (nationality, state/district, zodiac, languages) are shown.
export default function ProfileForm({ headerTitle, avatarSource, profile, handle, subtitle, showHeaderSave = false, connection, options, onSave, onBack }) {
  const insets = useSafeAreaInsets();
  const showExtended = !!options;

  const [fullName, setFullName] = React.useState(profile.fullName);
  const [phone, setPhone] = React.useState(profile.phone);
  const [email, setEmail] = React.useState(profile.email);
  const [bio, setBio] = React.useState(profile.bio);
  const [dateOfBirth, setDateOfBirth] = React.useState(() => parseDobToDate(profile.dateOfBirth));
  const [birthTime, setBirthTime] = React.useState(() => parseTimeTo24(profile.birthTime));
  const [nationality, setNationality] = React.useState(profile.nationality);
  const [state, setState] = React.useState(profile.state);
  const [district, setDistrict] = React.useState(profile.district);
  const [zodiacSign, setZodiacSign] = React.useState(profile.zodiacSign);
  const [languages, setLanguages] = React.useState(profile.languages || []);
  const [interests, setInterests] = React.useState(profile.interests || []);
  const [addSheet, setAddSheet] = React.useState(null);
  const [avatarUri, setAvatarUri] = React.useState(profile.avatarUri || null);
  const [previewVisible, setPreviewVisible] = React.useState(false);
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
      email,
      bio,
      dateOfBirth: formatDateToDob(dateOfBirth),
      birthTime: formatTimeTo12h(birthTime),
      avatarUri,
      interests,
      ...(showExtended && { nationality, state, district, zodiacSign, languages }),
    });
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
        onBack={onBack}
        rightIconName={showHeaderSave ? 'checkmark' : undefined}
        onRightPress={handleSave}
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
          {!!(handle || subtitle) && <Text style={styles.handle}>{handle || subtitle}</Text>}
        </View>

        {!!connection && (connection.connected ? (
          <PartnerBanner
            tone="pink"
            compactSubtitle
            title={`Connected with ${connection.partnerName}`}
            subtitle={`Syncing memories since ${connection.sinceLabel}`}
            badgeLabel="Active"
          />
        ) : (
          <PartnerBanner
            title="Invite Your Partner"
            subtitle="Welcome them in and make this space feel a little more like yours together."
            badgeLabel="Invite"
            onBadgePress={connection.onInvite}
          />
        ))}

        <Input label="Full name" value={fullName} onChangeText={setFullName} />

        <View style={styles.row}>
          <PickerField
            label="Date of birth"
            mode="date"
            iconName="calendar-month-outline"
            iconSet="material"
            iconColor={colors.textPrimary}
            value={dateOfBirth}
            onChange={setDateOfBirth}
            maximumDate={new Date()}
            style={styles.halfField}
          />
          <PickerField
            label="Birth time"
            mode="time"
            iconName="time-outline"
            value={birthTime}
            onChange={setBirthTime}
            style={styles.halfField}
          />
        </View>

        <Input label="Phone" value={phone} onChangeText={setPhone} iconName="call-outline" keyboardType="phone-pad" />

        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          iconName="mail-outline"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {showExtended && (
          <>
            <SelectField label="Nationality" value={nationality} options={options.nationalities} onChange={setNationality} />

            <View style={styles.row}>
              <SelectField
                small
                label="State"
                value={state}
                options={Object.keys(districtsByState)}
                onChange={changeState}
                style={styles.halfField}
              />
              <SelectField
                small
                label="District"
                value={district}
                options={districtsByState[state] || []}
                onChange={setDistrict}
                style={styles.halfField}
              />
            </View>

            <SelectField small label="Zodiac Sign" value={zodiacSign} options={options.zodiacSigns} onChange={setZodiacSign} />

            <View>
              <Text style={fieldStyles.label}>Languages</Text>
              <View style={styles.chipRow}>
                {languages.map((language) => (
                  <Chip key={language} label={language} variant="outline" />
                ))}
                <Chip label="Add" iconName="add" variant="filled" onPress={() => setAddSheet('languages')} />
              </View>
            </View>
          </>
        )}

        <Input label="Bio" value={bio} onChangeText={setBio} multiline maxLength={BIO_MAX_LENGTH} />

        <View>
          <Text style={fieldStyles.label}>Interest</Text>
          <View style={styles.chipRow}>
            <Chip label="Add" iconName="add" variant="filled" onPress={() => setAddSheet('interests')} />
            {interests.map((interest) => (
              <Chip key={interest} label={interest} iconName={interestIcons[interest] || 'heart-outline'} variant="muted" />
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
    gap: spacing.lg,
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
