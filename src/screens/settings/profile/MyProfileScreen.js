import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileForm from '../../../components/ProfileForm';
import { setMyProfile } from '../../../state/settingsSlice';
import { settingsService } from '../../../services';
import { formatConnectedSince } from '../../../utils/dateFormat';

const avatarSaara = require('../../../assets/images/avatar-saara.png');

export default function MyProfileScreen({ navigation }) {
  const myProfile = useSelector((state) => state.settings.myProfile);
  const profile = useSelector((state) => state.settings.profile);
  const profileOptions = useSelector((state) => state.settings.profileOptions);
  const partnerConnected = useSelector((state) => state.settings.partnerConnection.connected);
  const dispatch = useDispatch();

  const handleSave = async (fields) => {
    const saved = await settingsService.updateMyProfile(fields);
    dispatch(setMyProfile(saved));
    navigation.goBack();
  };

  return (
    <ProfileForm
      headerTitle="Profile"
      avatarSource={avatarSaara}
      profile={myProfile}
      handle={myProfile.handle}
      connection={{
        connected: partnerConnected,
        partnerName: profile.partner.name,
        sinceLabel: formatConnectedSince(profile.connectedAt),
        onInvite: () => navigation.navigate('InvitePartner'),
      }}
      options={profileOptions}
      onSave={handleSave}
      onBack={() => navigation.goBack()}
    />
  );
}
