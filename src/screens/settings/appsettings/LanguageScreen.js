import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import SettingsRow from '../../../components/SettingsRow';
import { colors, spacing, radius, fontFamily, shadow } from '../../../theme';

const AVAILABLE_LANGUAGES = [
  { name: 'English (US)', subtitle: 'English (System Default)' },
  { name: 'English (UK)', subtitle: 'British English' },
  { name: 'English (Australia)', subtitle: 'Australian English' },
  { name: 'English (Canada)', subtitle: 'Canadian English' },
  { name: 'English (India)', subtitle: 'Indian English' },
  { name: 'English (New Zealand)', subtitle: 'New Zealand English' },
  { name: 'English (South Africa)', subtitle: 'South African English' },
];

const SUGGESTED_LANGUAGES = [
  { name: 'Hindi (IN)', subtitle: 'हिन्दी' },
  { name: 'Tamil (IN)', subtitle: 'தமிழ்' },
  { name: 'Telugu (IN)', subtitle: 'తెలుగు' },
  { name: 'Kannada (IN)', subtitle: 'ಕನ್ನಡ' },
  { name: 'Malayalam (IN)', subtitle: 'മലയാളം' },
  { name: 'Bengali (IN)', subtitle: 'বাংলা' },
  { name: 'Marathi (IN)', subtitle: 'मराठी' },
  { name: 'Gujarati (IN)', subtitle: 'ગુજરાતી' },
  { name: 'Punjabi (IN)', subtitle: 'ਪੰਜਾਬੀ' },
  { name: 'Urdu (IN)', subtitle: 'اردو' },
  { name: 'Deutsch (DE)', subtitle: 'German' },
  { name: 'Español (ES)', subtitle: 'Spanish' },
  { name: 'Français (FR)', subtitle: 'French' },
  { name: 'Italiano (IT)', subtitle: 'Italian' },
  { name: 'Português (BR)', subtitle: 'Portuguese' },
  { name: 'Nederlands (NL)', subtitle: 'Dutch' },
  { name: 'Türkçe (TR)', subtitle: 'Turkish' },
  { name: 'Bahasa Indonesia (ID)', subtitle: 'Indonesian' },
];

function LanguageRow({ lang, selected, onPress, showBorder }) {
  return (
    <TouchableOpacity
      style={[styles.languageRow, showBorder && styles.rowBorder]}
      onPress={onPress}
      disabled={selected}
      activeOpacity={0.6}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
    >
      <View style={styles.flex}>
        <Text style={[styles.languageName, selected && styles.languageNameSelected]}>{lang.name}</Text>
        <Text style={styles.languageSubtitle}>{lang.subtitle}</Text>
      </View>
      {selected && <Ionicons name="checkmark" size={22} color={colors.textPrimary} />}
    </TouchableOpacity>
  );
}

export default function LanguageScreen({ navigation }) {
  const language = useSelector((state) => state.settings.language);
  const [query, setQuery] = React.useState('');

  const display = language.current === 'English (US)' ? 'English' : language.current;
  const goToConfirm = (lang) => () => navigation.navigate('LanguageChangeConfirm', { language: lang });

  const renderList = (list) => list.map((lang, index) => (
    <LanguageRow
      key={lang.name}
      lang={lang}
      selected={lang.name === language.current}
      onPress={goToConfirm(lang)}
      showBorder={index < list.length - 1}
    />
  ));

  const trimmed = query.trim().toLowerCase();
  const matches = trimmed
    ? [...AVAILABLE_LANGUAGES, ...SUGGESTED_LANGUAGES].filter(
        (lang) => lang.name.toLowerCase().includes(trimmed) || lang.subtitle.toLowerCase().includes(trimmed),
      )
    : [];

  return (
    <View style={styles.container}>
      <ScreenHeader large transparent title="Language" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.searchField}>
          <Ionicons name="search-outline" size={22} color={colors.fieldLabel} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search language.."
            placeholderTextColor={colors.textSlate}
            style={styles.searchInput}
          />
          {!!query && (
            <TouchableOpacity onPress={() => setQuery('')} hitSlop={8} accessibilityLabel="Clear search">
              <Ionicons name="close-circle" size={18} color={colors.textFaint} />
            </TouchableOpacity>
          )}
        </View>

        {trimmed ? (
          <>
            <Text style={styles.sectionLabel}>Matches</Text>
            <SettingsCard noPadding radiusSize={radius.xl} style={styles.card}>
              {matches.length > 0 ? renderList(matches) : (
                <Text style={styles.emptyText}>No languages found</Text>
              )}
            </SettingsCard>
          </>
        ) : (
          <>
            <Text style={styles.sectionLabel}>Localization</Text>
            <SettingsCard noPadding radiusSize={radius.xl} style={styles.card}>
              <SettingsRow iconName="globe-outline" title="App language" subtitle={`Current language: ${display}`} showChevron={false} />
              <SettingsRow iconName="globe-outline" title="Region formats" subtitle={language.region} showChevron={false} showBorder={false} />
            </SettingsCard>

            <Text style={styles.sectionLabel}>Available languages</Text>
            <SettingsCard noPadding radiusSize={radius.xl} style={styles.card}>
              {renderList(AVAILABLE_LANGUAGES)}
            </SettingsCard>

            <Text style={styles.sectionLabel}>Suggested languages</Text>
            <SettingsCard noPadding radiusSize={radius.xl} style={styles.card}>
              {renderList(SUGGESTED_LANGUAGES)}
            </SettingsCard>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenMuted,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: 10,
    paddingBottom: spacing.xxl,
  },
  flex: {
    flex: 1,
  },
  searchField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    height: 62,
    borderRadius: 31,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    paddingHorizontal: 18,
    ...shadow.cardSoft,
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 17,
    color: colors.textPrimary,
    padding: 0,
    outlineStyle: 'none',
  },
  sectionLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 24,
    marginBottom: 14,
  },
  card: {
    overflow: 'hidden',
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderRow,
  },
  languageName: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    lineHeight: 21,
    color: colors.textPrimary,
  },
  languageNameSelected: {
    fontFamily: fontFamily.semiBold,
  },
  languageSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 17,
    color: colors.textMuted,
    marginTop: 2,
  },
  emptyText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingVertical: spacing.xl,
  },
});
