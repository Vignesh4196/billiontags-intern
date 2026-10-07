import { USE_MOCKS } from './config';
import { api, mockResponse } from './apiClient';

export const partnerService = {
  async sendInvite(channel) {
    if (USE_MOCKS) return mockResponse({ sent: true }, 0);
    return api.post('/partner/invites', { channel });
  },
  // New connection code after a disconnect → { code, link }
  async createInviteCode() {
    if (USE_MOCKS) {
      const code = `LOVE-${Math.floor(100 + Math.random() * 900)}-SR`;
      return mockResponse({ code, link: `${code}.superbae.elite` });
    }
    return api.post('/partner/invite-code');
  },
  async disconnect(confirmPhrase) {
    if (USE_MOCKS) return mockResponse({ disconnected: true });
    return api.post('/partner/disconnect', { confirmPhrase });
  },
  async deleteSyncData(items) {
    if (USE_MOCKS) return mockResponse({ deleted: items }, 1200);
    return api.post('/partner/sync-data/delete', { items });
  },
  async updateFeature(key, enabled) {
    if (USE_MOCKS) return mockResponse({ key, enabled }, 0);
    return api.patch('/partner/features', { [key]: enabled });
  },
};
