// Backend configuration.
// Set EXPO_PUBLIC_API_URL (e.g. in a .env file) to switch every service from the
// built-in mocks to real HTTP calls. Nothing else in the screens needs to change.
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || '';
export const USE_MOCKS = !API_BASE_URL;

// Fake network latency for mocks, so loading states are visible.
export const MOCK_DELAY_MS = 600;
