import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Platform, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import Input, { fieldStyles } from '../../../components/Input';
import PickerField from '../../../components/PickerField';
import OptionSheet from '../../../components/OptionSheet';
import Button from '../../../components/Button';
import { updatePartnerDetails } from '../../../state/settingsSlice';
import { settingsService } from '../../../services';
import { formatSpacedDate, parseConnectedAt, toIsoDate } from '../../../utils/dateFormat';
import { colors, spacing, radius, typography } from '../../../theme';

const avatarArjun = require('../../../assets/images/avatar-arjun.png');

const COUNTRIES = [
  { id: 'IN', name: 'India', dial: '+91' },
  { id: 'US', name: 'United States', dial: '+1' },
  { id: 'GB', name: 'United Kingdom', dial: '+44' },
  { id: 'AU', name: 'Australia', dial: '+61' },
  { id: 'CA', name: 'Canada', dial: '+1' },
  { id: 'SG', name: 'Singapore', dial: '+65' },
  { id: 'MY', name: 'Malaysia', dial: '+60' },
  { id: 'LK', name: 'Sri Lanka', dial: '+94' },
];
const countryLabel = (country) => `${country.name} (${country.dial})`;

// India is drawn; the other countries use a plain flag icon.
function Flag({ countryId }) {
  if (countryId !== 'IN') return <Ionicons name="flag-outline" size={22} color={colors.fieldLabel} />;
  return (
    <View style={styles.flag}>
      <View style={[styles.flagStripe, { backgroundColor: '#FF9933' }]} />
      <View style={[styles.flagStripe, { backgroundColor: '#FFFFFF' }]}>
        <View style={styles.flagWheel} />
      </View>
      <View style={[styles.flagStripe, { backgroundColor: '#138808' }]} />
    </View>
  );
}

export default function EditPartnerProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const partnerProfile = useSelector((state) => state.settings.partnerProfile);
  const connectedAt = useSelector((state) => state.settings.profile.connectedAt);

  const [name, setName] = React.useState(partnerProfile.fullName);
  const [country, setCountry] = React.useState(() => COUNTRIES.find((item) => item.dial === partnerProfile.phoneCode) || COUNTRIES[0]);
  const [phone, setPhone] = React.useState(partnerProfile.phoneNumber);
  const [since, setSince] = React.useState(() => parseConnectedAt(connectedAt) || new Date());
  const [avatarUri, setAvatarUri] = React.useState(partnerProfile.avatarUri || null);
  const [countrySheet, setCountrySheet] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const uploadRef = React.useRef(null);

  const changePhoto = async () => {
    if (Platform.OS === 'web') {
      uploadRef.current?.click?.();
      return;
    }
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Photo access needed', 'Allow photo library access to choose a profile photo.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.85 });
    if (!result.canceled && result.assets?.[0]?.uri) setAvatarUri(result.assets[0].uri);
  };

  const canSave = name.trim().length > 0 && phone.trim().length > 0 && !saving;

  const save = async () => {
    if (!canSave) return;
    setSaving(true);
    try {
      const details = { name: name.trim(), phoneCode: country.dial, phoneNumber: phone.trim(), connectedAt: toIsoDate(since), avatarUri };
      await settingsService.updatePartnerProfile(details);
      dispatch(updatePartnerDetails(details));
      navigation.goBack();
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader large title="Edit partner profile" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrap}>
            <Image source={avatarUri ? { uri: avatarUri } : avatarArjun} style={styles.avatar} accessibilityLabel="Partner profile photo" />
            <TouchableOpacity style={styles.cameraBadge} activeOpacity={0.7} onPress={changePhoto} accessibilityLabel="Change profile photo">
              <Ionicons name="camera-outline" size={14} color={colors.white} />
            </TouchableOpacity>
          </View>
          {Platform.OS === 'web' && (
            <input
              ref={uploadRef}
              type="file"
              accept="image/*"
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
          <Text style={styles.name} numberOfLines={1}>{name.trim() || partnerProfile.displayName}</Text>
        </View>

        <Input large label="Partner name" value={name} onChangeText={setName} />

        <View>
          <Text style={[fieldStyles.label, fieldStyles.labelLarge]}>Partner phone number</Text>
          <View style={styles.phoneRow}>
            <TouchableOpacity
              style={[fieldStyles.field, fieldStyles.fieldLarge, styles.countryButton]}
              activeOpacity={0.7}
              onPress={() => setCountrySheet(true)}
              accessibilityRole="button"
              accessibilityLabel={`Country code ${country.dial}`}
            >
              <Flag countryId={country.id} />
              <View style={styles.flagDivider} />
              <Text style={[fieldStyles.value, fieldStyles.valueLarge, styles.dial]}>{country.dial}</Text>
              <Ionicons name="chevron-down" size={20} color={colors.fieldLabel} />
            </TouchableOpacity>
            <Input large value={phone} onChangeText={(text) => setPhone(text.replace(/[^\d]/g, ''))} keyboardType="phone-pad" style={styles.phoneInput} />
          </View>
        </View>

        <PickerField
          large
          label="Together since"
          mode="date"
          iconName="calendar-heart"
          iconSet="material"
          value={since}
          onChange={setSince}
          maximumDate={new Date()}
          formatValue={formatSpacedDate}
        />
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.xxl }]}>
        <Button title="Save" pill loading={saving} disabled={!canSave} onPress={save} style={styles.saveButton} textStyle={styles.saveText} />
      </View>

      <OptionSheet
        visible={countrySheet}
        title="Country code"
        options={COUNTRIES.map(countryLabel)}
        selected={countryLabel(country)}
        onSelect={(label) => {
          setCountry(COUNTRIES.find((item) => countryLabel(item) === label));
          setCountrySheet(false);
        }}
        onClose={() => setCountrySheet(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: 11,
    paddingBottom: spacing.xxl,
    gap: spacing.xl,
  },
  avatarSection: {
    alignItems: 'center',
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
    fontSize: 18,
    lineHeight: 24,
    color: colors.textDark,
    marginTop: spacing.md,
  },
  phoneRow: {
    flexDirection: 'row',
    gap: 10,
  },
  countryButton: {
    width: 142,
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  dial: {
    flex: 0,
  },
  phoneInput: {
    flex: 1,
  },
  flag: {
    width: 30,
    height: 21,
    borderRadius: 2,
    overflow: 'hidden',
  },
  flagStripe: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagWheel: {
    width: 6,
    height: 6,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#000080',
  },
  flagDivider: {
    width: 1,
    height: 26,
    backgroundColor: colors.border,
    marginHorizontal: 2,
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
});
