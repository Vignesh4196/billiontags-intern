import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileForm from '../../../components/ProfileForm';
import { setMyProfile } from '../../../state/settingsSlice';
import { settingsService } from '../../../services';

const avatarSaara = require('../../../assets/images/avatar-saara.png');

export default function EditProfileScreen({ navigation }) {
  const myProfile = useSelector((state) => state.settings.myProfile);
  const profileOptions = useSelector((state) => state.settings.profileOptions);
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
      options={profileOptions}
      onSave={handleSave}
      onBack={() => navigation.goBack()}
    />
  );
}
