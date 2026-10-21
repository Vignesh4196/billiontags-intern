import { USE_MOCKS } from './config';
import { api, mockResponse } from './apiClient';

export const accountService = {
  async logout() {
    if (USE_MOCKS) return mockResponse({ ok: true }, 300);
    return api.post('/auth/logout');
  },
};
