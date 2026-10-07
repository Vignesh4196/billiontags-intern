import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import SettingsRow from '../../../components/SettingsRow';
import BottomSheet from '../../../components/BottomSheet';
import PrivacyShieldIcon from '../../../components/icons/PrivacyShieldIcon';
import {
  setAppLockEnabled,
  setAppLockAuthMethod,
  setAppLockTiming,
  setAppLockRequireAuth,
} from '../../../state/settingsSlice';
import { colors, spacing, radius, typography, fontFamily } from '../../../theme';

const authFaceIdIcon = require('../../../assets/icons/auth-faceid-icon.png');
const authPasscodeIcon = require('../../../assets/icons/auth-passcode-icon.png');
const reqAuthEverytimeIcon = require('../../../assets/icons/reqauth-everytime-icon.png');
const reqAuthRestartIcon = require('../../../assets/icons/reqauth-restart-icon.png');
const reqAuthPrivateIcon = require('../../../assets/icons/reqauth-private-icon.png');

const SELECTED_BLUE = '#3B82F6';
const DARK_GREEN = '#0E8A3E';

const AUTH_METHODS = [
  {
    key: 'Face ID + Passcode',
    iconImage: authFaceIdIcon,
    title: 'Face ID + Passcode',
    subtitle: 'Use Face ID with passcode fallback',
  },
  {
    key: 'Passcode only',
    iconImage: authPasscodeIcon,
    title: 'Passcode only',
    subtitle: 'Unlock using your 4-digit device PIN',
  },
  {
    key: 'Biometrics only',
    iconName: 'finger-print-outline',
    title: 'Biometrics only',
    subtitle: 'Unlock using Face ID or Touch ID only',
  },
];

const TIMING_OPTIONS = ['Immediately', 'After 1 minute', 'After 5 minute', 'After 15 minute', 'After 1 hour'];

const REQUIRE_AUTH_OPTIONS = [
  {
    key: 'Every time the app opens',
    iconImage: reqAuthEverytimeIcon,
    title: 'Every time the app opens',
    subtitle: 'Prompt whenever returning from home screen or app switcher',
  },
  {
    key: 'Only after app restart',
    iconImage: reqAuthRestartIcon,
    title: 'Only after app restart',
    subtitle: 'Prompt only when launching the app fresh',
  },
  {
    key: 'When viewing private items',
    iconImage: reqAuthPrivateIcon,
    title: 'When viewing private items',
    subtitle: 'Prompt only when accessing private folders or memories',
  },
];

export default function AppLockScreen({ navigation }) {
  const appLock = useSelector((state) => state.settings.appLock);
  const dispatch = useDispatch();
  const [sheet, setSheet] = React.useState(null);

  return (
    <View style={styles.container}>
      <ScreenHeader title="App lock" onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <SettingsCard noPadding style={styles.card}>
          <SettingsRow
            noIcon
            title="Lock app"
            subtitle="Protect your memories with Face ID or passcode."
            toggleValue={appLock.enabled}
            onToggleChange={(v) => dispatch(setAppLockEnabled(v))}
          />
          <SettingsRow
            noIcon
            title="Authentication"
            subtitle={appLock.authMethod}
            onPress={() => setSheet('auth')}
          />
          <SettingsRow noIcon title="App lock" subtitle={appLock.timing} onPress={() => setSheet('timing')} />
          <SettingsRow
            noIcon
            title="Require authentication"
            subtitle={appLock.requireAuth}
            onPress={() => setSheet('requireAuth')}
            showBorder={false}
          />
        </SettingsCard>
      </View>

      <BottomSheet visible={sheet === 'auth'} onClose={() => setSheet(null)}>
        <SettingsCard radiusSize={radius.xl} style={styles.authHeaderCard}>
          <View style={styles.authHeaderIconWrap}>
            <PrivacyShieldIcon size={22} />
            <View style={styles.activeDot} />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.authHeaderTitleRow}>
              <Text style={styles.plainHeaderTitle}>Biometrics active</Text>
              <View style={styles.encryptedBadge}>
                <Text style={styles.encryptedBadgeText}>Encrypted</Text>
              </View>
            </View>
            <Text style={styles.rowSubtitle}>Secured with Apple Secure Enclave</Text>
          </View>
        </SettingsCard>

        {AUTH_METHODS.map((method, i) => {
          const selected = method.key === appLock.authMethod;
          return (
            <TouchableOpacity
              key={method.key}
              style={[styles.optionRow, i < AUTH_METHODS.length - 1 && styles.rowBorder]}
              onPress={() => {
                dispatch(setAppLockAuthMethod(method.key));
                setSheet(null);
              }}
              activeOpacity={0.7}
            >
              {method.iconImage ? (
                <Image source={method.iconImage} style={styles.rowIconImage} resizeMode="contain" />
              ) : (
                <View style={styles.iconBg}>
                  <Ionicons name={method.iconName} size={20} color={colors.textPrimary} />
                </View>
              )}
              <View style={styles.textContainer}>
                <Text style={styles.rowTitle}>{method.title}</Text>
                <Text style={styles.rowSubtitle}>{method.subtitle}</Text>
              </View>
              {selected && (
                <View style={styles.blueCheckCircle}>
                  <Ionicons name="checkmark" size={14} color={colors.white} />
                </View>
              )}
            </TouchableOpacity>
          );
        })}

        <View style={styles.footerNote}>
          <Ionicons name="information-circle-outline" size={16} color={colors.textSecondary} />
          <Text style={styles.footerNoteText}>
            If biometric recognition fails multiple times, you will be prompted to enter your device
            passcode.
          </Text>
        </View>
      </BottomSheet>

      <BottomSheet visible={sheet === 'timing'} onClose={() => setSheet(null)}>
        <View style={styles.plainHeaderRow}>
          <View style={styles.iconBg}>
            <Ionicons name="time-outline" size={20} color={colors.textPrimary} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.plainHeaderTitle}>Security preference</Text>
            <Text style={styles.rowSubtitle}>Choose when authentication is prompted</Text>
          </View>
        </View>

        <SettingsCard noPadding style={styles.optionsCard}>
          {TIMING_OPTIONS.map((option, i) => {
            const selected = option === appLock.timing;
            return (
              <TouchableOpacity
                key={option}
                style={[styles.simpleRow, i < TIMING_OPTIONS.length - 1 && styles.rowBorder]}
                onPress={() => {
                  dispatch(setAppLockTiming(option));
                  setSheet(null);
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.simpleRowText}>{option}</Text>
                {selected && <Ionicons name="checkmark" size={20} color={colors.textPrimary} />}
              </TouchableOpacity>
            );
          })}
        </SettingsCard>

        <View style={styles.footerNote}>
          <Ionicons name="lock-closed-outline" size={16} color={colors.textSecondary} />
          <Text style={styles.footerNoteText}>
            Shorter times provide higher security for your private photos and memories.
          </Text>
        </View>
      </BottomSheet>

      <BottomSheet visible={sheet === 'requireAuth'} onClose={() => setSheet(null)}>
        <View style={styles.plainHeaderRow}>
          <View style={styles.iconBg}>
            <Ionicons name="shield-outline" size={20} color={colors.textPrimary} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.plainHeaderTitle}>Require authentication</Text>
            <Text style={styles.rowSubtitle}>Choose when you're asked to unlock</Text>
          </View>
        </View>

        {REQUIRE_AUTH_OPTIONS.map((option, i) => {
          const selected = option.key === appLock.requireAuth;
          return (
            <TouchableOpacity
              key={option.key}
              style={[styles.optionRow, i < REQUIRE_AUTH_OPTIONS.length - 1 && styles.rowBorder]}
              onPress={() => {
                dispatch(setAppLockRequireAuth(option.key));
                setSheet(null);
              }}
              activeOpacity={0.7}
            >
              <View style={styles.iconBg}>
                <Image source={option.iconImage} style={styles.reqAuthIconImage} resizeMode="contain" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.rowTitle}>{option.title}</Text>
                <Text style={styles.rowSubtitle}>{option.subtitle}</Text>
              </View>
              {selected && <Ionicons name="checkmark-circle" size={22} color={DARK_GREEN} />}
            </TouchableOpacity>
          );
        })}

        <View style={styles.footerNote}>
          <Ionicons name="information-circle-outline" size={16} color={colors.textSecondary} />
          <Text style={styles.footerNoteText}>
           Biometrics like Face ID and fingerprint are prioritized for instant authentication whenever a challenge appears.
          </Text>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceMuted,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  card: {
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderRow,
  },
  rowTitle: {
    ...typography.heading3,
    fontFamily: fontFamily.bold,
    fontSize: 15,
  },
  rowSubtitle: {
    ...typography.caption,
    fontSize: 12,
    marginTop: 2,
  },
  iconBg: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.iconBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowIconImage: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
  },
  reqAuthIconImage: {
    width: 22,
    height: 22,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    paddingVertical: spacing.lg,
  },
  blueCheckCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: SELECTED_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authHeaderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  authHeaderIconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.iconBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: colors.white,
  },
  authHeaderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  encryptedBadge: {
    backgroundColor: '#C2F2D0',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 2,
  },
  encryptedBadgeText: {
    ...typography.caption,
    fontFamily: fontFamily.bold,
    fontSize: 11,
    color: colors.connectedGreen,
  },
  plainHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  plainHeaderTitle: {
    ...typography.heading3,
    fontSize: 17,
  },
  optionsCard: {
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  simpleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  simpleRowText: {
    ...typography.heading3,
    fontFamily: fontFamily.bold,
    fontSize: 15,
  },
  footerNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  footerNoteText: {
    ...typography.caption,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 18,
  },
});
