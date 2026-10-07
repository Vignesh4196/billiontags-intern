import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { accountService } from '../../../services';
import BackArrowIcon from '../../../components/icons/BackArrowIcon';
import { colors, fontFamily } from '../../../theme';

const illustration = require('../../../assets/images/logout-illustration.png');

export default function LogoutConfirmScreen({ navigation }) {
  const [busy, setBusy] = React.useState(false);

  const logout = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await accountService.logout();
      // Signed out: Logout success becomes the only screen, so back can't reach settings.
      navigation.reset({ index: 0, routes: [{ name: 'LogoutSuccess' }] });
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.side} onPress={() => navigation.goBack()} accessibilityLabel="Go back">
          <BackArrowIcon size={36} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Logout</Text>
        <View style={styles.side}><Ionicons name="checkmark" size={24} color={colors.textPrimary} /></View>
      </View>

      <View style={styles.content}>
        <Image source={illustration} style={styles.illustration} resizeMode="contain" accessibilityLabel="Person waving goodbye" />
        <Text style={styles.title}>Are you sure you want to log out?</Text>
        <Text style={styles.description}>
          You are about to sign out of Saara's profile. Your connected widgets will stop updating until you return, but Arjun can still securely access and add milestones in your shared space.
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.logoutButton} onPress={logout} activeOpacity={0.85}>
            <Ionicons name="log-out-outline" size={23} color={colors.white} style={styles.logoutIcon} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: { height: 76, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 25 },
  side: { width: 30, alignItems: 'center' },
  headerTitle: { color: colors.textHeading, fontFamily: fontFamily.semiBold, fontSize: 23 },
  // No scrolling: the illustration shrinks (flexShrink) on short screens so everything fits.
  content: { flex: 1, alignItems: 'center', paddingHorizontal: 24, paddingBottom: 24 },
  illustration: { width: 255, height: 280, maxHeight: '38%', marginTop: 32, marginBottom: 24, flexShrink: 1 },
  title: { color: colors.textHeading, fontFamily: fontFamily.bold, fontSize: 22, textAlign: 'center', marginBottom: 12 },
  description: { color: colors.textSecondary, fontFamily: fontFamily.regular, fontSize: 16, lineHeight: 23, textAlign: 'center', maxWidth: 385 },
  actions: { width: '100%', marginTop: 'auto', alignItems: 'center' },
  logoutButton: { width: '100%', height: 64, borderRadius: 32, backgroundColor: colors.tabActive, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
  logoutIcon: { transform: [{ scaleX: -1 }], marginRight: 12 },
  logoutText: { color: colors.white, fontFamily: fontFamily.semiBold, fontSize: 17 },
  cancelButton: { paddingVertical: 16, paddingHorizontal: 30 },
  cancelText: { color: colors.textPrimary, fontFamily: fontFamily.medium, fontSize: 16 },
});
