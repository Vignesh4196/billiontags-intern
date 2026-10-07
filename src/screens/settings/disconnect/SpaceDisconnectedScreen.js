import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import Button from '../../../components/Button';
import { partnerService } from '../../../services';
import { setInviteCode } from '../../../state/settingsSlice';
import { setExportCategories } from '../../../state/accountSlice';
import { colors, radius, fontFamily, typography, shadow } from '../../../theme';

const illustration = require('../../../assets/images/space-disconnected-illustration.png');

function OptionCard({ title, subtitle, onPress, loading }) {
  return (
    <TouchableOpacity style={styles.optionCard} onPress={onPress} disabled={loading} activeOpacity={0.7} accessibilityRole="button">
      <View style={styles.flex}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionSubtitle}>{subtitle}</Text>
      </View>
      {loading && <ActivityIndicator size="small" color={colors.textPrimary} />}
    </TouchableOpacity>
  );
}

export default function SpaceDisconnectedScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const [creatingCode, setCreatingCode] = React.useState(false);
  // After "Delete sync data" the shared memories are gone, so there is nothing to export.
  const dataDeleted = !!route?.params?.dataDeleted;

  const goHome = () => navigation.popToTop();

  const inviteNewPartner = async () => {
    setCreatingCode(true);
    try {
      const invite = await partnerService.createInviteCode();
      dispatch(setInviteCode(invite));
      // A fresh invite flow: back / "Continue alone" lands on the space hub, not here.
      navigation.replace('InvitePartner');
    } finally {
      setCreatingCode(false);
    }
  };

  const exportMemories = () => {
    // Shared memories only: photos & love notes, not the profile / workspace defaults.
    dispatch(setExportCategories({ profile: false, workspace: false, messages: true, media: true }));
    navigation.navigate('DataExport');
  };

  return (
    <View style={styles.container}>
      <ScreenHeader large transparent titleStyle={typography.headerMedium} title="Space disconnected" onBack={goHome} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Image source={illustration} style={styles.illustration} resizeMode="contain" accessibilityLabel="Woman with arms open, feeling free" />
        <Text style={styles.title}>Your space is now all yours</Text>
        <Text style={styles.body}>
          Your shared space with partner has been closed. Your personal notes are still safely archived.
        </Text>

        <View style={styles.options}>
          <OptionCard title="Invite new partner" subtitle="Generate a new connection code" onPress={inviteNewPartner} loading={creatingCode} />
          {!dataDeleted && (
            <OptionCard title="Export shared memories" subtitle="Download photos & love notes (.ZIP)" onPress={exportMemories} />
          )}
        </View>

        <Button title="Continue alone" pill onPress={goHome} style={styles.button} textStyle={styles.buttonText} />
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
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
  illustration: {
    width: 377,
    maxWidth: '100%',
    height: 239,
    marginTop: 51,
  },
  title: {
    fontFamily: fontFamily.semiBold,
    fontSize: 22,
    lineHeight: 28,
    color: colors.textPrimary,
    marginTop: 80,
  },
  body: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 14,
    paddingHorizontal: 10,
  },
  options: {
    alignSelf: 'stretch',
    gap: 16,
    marginTop: 26,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 66,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    marginHorizontal: 1,
    ...shadow.cardSoft,
  },
  optionTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  optionSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textFaint,
    marginTop: 2,
  },
  button: {
    alignSelf: 'stretch',
    height: 64,
    borderRadius: radius.pill,
    marginTop: 26,
  },
  buttonText: {
    fontSize: 18,
  },
});
