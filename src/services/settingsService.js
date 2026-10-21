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
};
