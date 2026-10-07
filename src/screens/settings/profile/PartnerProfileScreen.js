import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileForm from '../../../components/ProfileForm';
import { setPartnerProfile } from '../../../state/settingsSlice';
import { settingsService } from '../../../services';

const avatarArjun = require('../../../assets/images/avatar-arjun.png');

export default function PartnerProfileScreen({ navigation }) {
  const partnerProfile = useSelector((state) => state.settings.partnerProfile);
  const dispatch = useDispatch();

  const handleSave = async (fields) => {
    const saved = await settingsService.updatePartnerProfile(fields);
    dispatch(setPartnerProfile(saved));
    navigation.goBack();
  };

  return (
    <ProfileForm
      headerTitle="Partner profile"
      avatarSource={avatarArjun}
      profile={partnerProfile}
      subtitle="Edit your profile information."
      showHeaderSave
      onSave={handleSave}
      onBack={() => navigation.goBack()}
    />
  );
}
