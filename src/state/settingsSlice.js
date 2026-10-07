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
    fullName: 'Divya',
    dateOfBirth: '29/05/2002',
    birthTime: '07:43 AM',
    phone: '+91 9876543210',
    email: 'Saara@Superbae.com',
    nationality: 'Indian',
    state: 'Tamil Nadu',
    district: 'Madurai',
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
    phone: '+91 | 9876543210',
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
  notifications: {
    pushAlerts: true,
    smsAlerts: false,
    marketingUpdates: false,
    appUpdates: true,
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
  shareApp: {
    message: 'Join me on SuperBae, a private space for couples. https://superbae.app',
  },
  ourSpace: {
    sharedMemories: true,
    bucketList: true,
    sharedCalendar: true,
    sharedNotes: true,
    themePersonalization: true,
  },
  language: {
    current: 'English (US)',
    region: 'United States (US)',
  },
  permissions: {
    notifications: true,
    location: true,
    camera: true,
    microphone: false,
    contacts: false,
  },
  appLock: {
    enabled: true,
    authMethod: 'Face ID + Passcode',
    timing: 'Immediately',
    requireAuth: 'Every time the app opens',
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setProfile(state, action) {
      state.profile = { ...state.profile, ...action.payload };
    },
    setMyProfile(state, action) {
      state.myProfile = { ...state.myProfile, ...action.payload };
    },
    setPartnerProfile(state, action) {
      state.partnerProfile = { ...state.partnerProfile, ...action.payload };
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
    toggleNotification(state, action) {
      const key = action.payload;
      state.notifications[key] = !state.notifications[key];
    },
    togglePartnerFeature(state, action) {
      const key = action.payload;
      state.partnerFeatures[key] = !state.partnerFeatures[key];
    },
    toggleOurSpaceSetting(state, action) {
      const key = action.payload;
      state.ourSpace[key] = !state.ourSpace[key];
    },
    setLanguage(state, action) {
      state.language.current = action.payload;
    },
    setInviteCode(state, action) {
      state.invite = { ...state.invite, ...action.payload };
    },
    setPermissions(state, action) {
      state.permissions = { ...state.permissions, ...action.payload };
    },
    togglePermission(state, action) {
      const key = action.payload;
      state.permissions[key] = !state.permissions[key];
    },
    setAppLockEnabled(state, action) {
      state.appLock.enabled = action.payload;
    },
    setAppLockAuthMethod(state, action) {
      state.appLock.authMethod = action.payload;
    },
    setAppLockTiming(state, action) {
      state.appLock.timing = action.payload;
    },
    setAppLockRequireAuth(state, action) {
      state.appLock.requireAuth = action.payload;
    },
  },
});

export const {
  setProfile,
  setMyProfile,
  setPartnerProfile,
  setPartnerConnected,
  toggleNotification,
  togglePartnerFeature,
  toggleOurSpaceSetting,
  setLanguage,
  togglePermission,
  setPermissions,
  setInviteCode,
  setAppLockEnabled,
  setAppLockAuthMethod,
  setAppLockTiming,
  setAppLockRequireAuth,
} = settingsSlice.actions;
export default settingsSlice.reducer;
