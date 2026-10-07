import { USE_MOCKS } from './config';
import { api, mockResponse } from './apiClient';
import { startMockJob } from './jobs';

export const exportService = {
  // Returns { jobId }
  async createExport({ format, categories }) {
    if (USE_MOCKS) return mockResponse({ jobId: startMockJob() }, 0);
    return api.post('/exports', { format, categories });
  },
  // Backend should return a signed download URL for the archive.
  async getDownloadUrl(exportId) {
    if (USE_MOCKS) return mockResponse({ url: null }, 0);
    return api.get(`/exports/${exportId}/download`);
  },
};
