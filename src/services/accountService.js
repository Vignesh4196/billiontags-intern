import { USE_MOCKS } from './config';
import { api, mockResponse, mockError } from './apiClient';

export const accountService = {
  // Deactivate workspace (Account actions → Deactivate workspace)
  async deactivateWorkspace(confirmPhrase) {
    if (USE_MOCKS) return mockResponse({ status: 'offline' });
    return api.post('/workspace/deactivate', { confirmPhrase });
  },
  async saveArchivePreference(option) {
    if (USE_MOCKS) return mockResponse({ option });
    return api.put('/workspace/archive-preference', { option });
  },

  // Delete account: phone check → OTP → final delete
  async requestDeleteOtp(phone) {
    if (USE_MOCKS) return mockResponse({ sent: true, resendInSeconds: 24 });
    return api.post('/account/delete/request-otp', { phone });
  },
  async verifyDeleteOtp(code) {
    if (USE_MOCKS) {
      return code.length === 4 ? mockResponse({ verified: true }) : mockError('Invalid code', 'INVALID_OTP');
    }
    return api.post('/account/delete/verify-otp', { code });
  },
  async deleteAccount({ confirmPhrase, requestExport }) {
    if (USE_MOCKS) return mockResponse({ deleted: true });
    return api.delete(`/account?confirm=${encodeURIComponent(confirmPhrase)}&export=${requestExport ? 1 : 0}`);
  },

  async logout() {
    if (USE_MOCKS) return mockResponse({ ok: true }, 300);
    return api.post('/auth/logout');
  },
};
