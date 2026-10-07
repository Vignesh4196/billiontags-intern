import { USE_MOCKS } from './config';
import { api, mockResponse } from './apiClient';

export const settingsService = {
  async updateMyProfile(fields) {
    if (USE_MOCKS) return mockResponse(fields, 300);
    return api.patch('/me/profile', fields);
  },
  async updatePartnerProfile(fields) {
    if (USE_MOCKS) return mockResponse(fields, 300);
    return api.patch('/partner/profile', fields);
  },
  async savePermissions(permissions) {
    if (USE_MOCKS) return mockResponse(permissions, 300);
    return api.put('/me/permissions', permissions);
  },
  async setLanguage(language) {
    if (USE_MOCKS) return mockResponse({ language }, 0);
    return api.put('/me/language', { language });
  },
};
