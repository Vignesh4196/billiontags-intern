import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {
    user: {
      name: 'Saara',
      avatar: 'saara',
    },
    partner: {
      name: 'Arjun',
      avatar: 'arjun',
    },
    // When the couple connected (ISO). The "Together since" text is worked out from this.
    connectedAt: '2022-05-12',
  },
  myProfile: {
    avatar: 'saara',
    displayName: 'Saara',
    handle: '@saara070102158',
    signedUpAt: '2023-08-12',
    fullName: 'Divya',
    dateOfBirth: '29/05/2002',
    birthTime: '07:43 AM',
    phone: '+91 9876543210',
    email: 'Saara@Superbae.com',
    nationality: 'Indian',
    state: 'Tamil Nadu',
    district: 'Madurai',
    birthPlace: 'Madurai',
    currentCity: 'Chennai, TN',
    zodiacSign: 'Aquarius',
    languages: ['Tamil', 'English'],
    bio: 'I’m a simple, easy-going, and family-oriented person who enjoys spending time with my loved ones. I’m friendly, caring, and believe in keeping things positive and genuine. I enjoy trying new things, making good memories, and growing both personally and professionally.',
    interests: ['Music', 'Travel', 'Coffee', 'Photography', 'Books', 'Food'],
  },
  partnerProfile: {
    avatar: 'arjun',
    displayName: 'Arjun',
    fullName: 'Arjun',
    dateOfBirth: '29/05/2002',
    birthTime: '07:43 AM',
    phoneCode: '+91',
    phoneNumber: '9876543210',
    email: 'Arjun@Superbae.com',
    bio: 'I’m a simple, easy-going, and family-oriented person who enjoys spending time with my loved ones. I’m friendly, caring, and believe in keeping things positive and genuine. I enjoy trying new things, making good memories, and growing both personally and professionally.',
    interests: ['Music', 'Travel', 'Coffee', 'Photography', 'Books', 'Food'],
  },
  profileOptions: {
    nationalities: ['Indian', 'American', 'Australian', 'British', 'Canadian', 'Malaysian', 'Singaporean', 'Sri Lankan'],
    districtsByState: {
      'Tamil Nadu': ['Madurai', 'Chennai', 'Coimbatore', 'Salem', 'Tiruchirappalli', 'Tirunelveli'],
      Kerala: ['Kochi', 'Kozhikode', 'Thiruvananthapuram', 'Thrissur'],
      Karnataka: ['Bengaluru', 'Hubballi', 'Mangaluru', 'Mysuru'],
      Maharashtra: ['Mumbai', 'Nagpur', 'Nashik', 'Pune'],
      Delhi: ['New Delhi', 'North Delhi', 'South Delhi'],
    },
    zodiacSigns: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'],
    languages: ['Tamil', 'English', 'Hindi', 'Malayalam', 'Telugu', 'Kannada', 'Bengali', 'Marathi'],
    interests: ['Music', 'Travel', 'Coffee', 'Photography', 'Books', 'Food', 'Movies', 'Fitness', 'Art', 'Gaming'],
  },
  partnerConnection: {
    connected: true,
  },
  invite: {
    code: 'LOVE-987-SR',
    link: 'LOVE-987-SR.superbae.elite',
    sentTo: '+91 9876543210',
  },
  referral: {
    code: '318348',
    link: '318348410.superbae.elite',
  },
  partnerFeatures: {
    intimacy: true,
    heartCheck: true,
    cycle: true,
    theme: true,
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setMyProfile(state, action) {
      state.myProfile = { ...state.myProfile, ...action.payload };
    },
    // Edit partner profile: name, phone and the "Together since" date (connectedAt, ISO) are saved together.
    updatePartnerDetails(state, action) {
      const { name, phoneCode, phoneNumber, connectedAt, avatarUri } = action.payload;
      state.profile.partner.name = name;
      state.profile.connectedAt = connectedAt;
      state.partnerProfile = {
        ...state.partnerProfile,
        displayName: name,
        fullName: name,
        phoneCode,
        phoneNumber,
        ...(avatarUri !== undefined && { avatarUri }),
      };
    },
    setPartnerConnected: {
      reducer(state, action) {
        const { connected, at } = action.payload;
        // Only a real disconnected -> connected change starts the clock; repeating it must not reset it.
        if (connected && !state.partnerConnection.connected) state.profile.connectedAt = at;
        if (!connected) state.profile.connectedAt = null;
        state.partnerConnection.connected = connected;
      },
      prepare(connected) {
        return { payload: { connected, at: new Date().toISOString() } };
      },
    },
    togglePartnerFeature(state, action) {
      const key = action.payload;
      state.partnerFeatures[key] = !state.partnerFeatures[key];
    },
    setInviteCode(state, action) {
      state.invite = { ...state.invite, ...action.payload };
    },
  },
});

export const {
  setMyProfile,
  updatePartnerDetails,
  setPartnerConnected,
  togglePartnerFeature,
  setInviteCode,
} = settingsSlice.actions;
export default settingsSlice.reducer;
