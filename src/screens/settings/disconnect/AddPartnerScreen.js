import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import Button from '../../../components/Button';
import FadeInView from '../../../components/FadeInView';
import PopInView from '../../../components/PopInView';
import { partnerService } from '../../../services';
import { setInviteCode } from '../../../state/settingsSlice';
import { colors, fontFamily } from '../../../theme';

const illustration = require('../../../assets/images/add-partner-illustration.png');

// Shown while no partner is connected (My partner row) and after the disconnect flow finishes.
export default function AddPartnerScreen({ navigation }) {
  const dispatch = useDispatch();
  const connected = useSelector((state) => state.settings.partnerConnection.connected);
  const [creatingCode, setCreatingCode] = React.useState(false);

  // Back from the invite flow after connecting: this screen is stale, show the connected space instead.
  useFocusEffect(
    React.useCallback(() => {
      if (connected) navigation.replace('PartnerSettings');
    }, [connected, navigation]),
  );

  const goHome = () => navigation.popToTop();

  const invitePartner = async () => {
    setCreatingCode(true);
    try {
      const invite = await partnerService.createInviteCode();
      dispatch(setInviteCode(invite));
      navigation.navigate('InvitePartner');
    } finally {
      setCreatingCode(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Add partner" onBack={goHome} />

      <View style={styles.content}>
        <PopInView>
          <Image source={illustration} style={styles.illustration} resizeMode="contain" accessibilityLabel="Person with a plus sign" />
        </PopInView>

        <FadeInView delay={200} style={styles.textBlock}>
          <Text style={styles.title}>Make a little space for him</Text>
          <Text style={styles.subtitle}>Bring your favourite person closer</Text>
          <Text style={styles.body}>
            Share sweet memories, exchange love notes, plan special dates, and let him see the updates you choose to share.
          </Text>
        </FadeInView>

        <FadeInView delay={350} style={styles.actions}>
          <Button title="Invite my partner" pill loading={creatingCode} onPress={invitePartner} style={styles.button} textStyle={styles.buttonText} />
          <Button title="Back to home" variant="outline" pill onPress={goHome} style={styles.button} textStyle={styles.buttonText} />
        </FadeInView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  illustration: {
    width: 94,
    height: 104,
  },
  textBlock: {
    alignItems: 'center',
    marginTop: 24,
  },
  title: {
    fontFamily: fontFamily.semiBold,
    fontSize: 22,
    lineHeight: 28,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 15,
    lineHeight: 20,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 4,
  },
  body: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 24,
    maxWidth: 360,
  },
  actions: {
    alignSelf: 'stretch',
    gap: 12,
    marginTop: 32,
  },
  button: {
    height: 64,
    borderRadius: 32,
  },
  buttonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
  },
});
