import { USE_MOCKS } from './config';
import { api, mockResponse } from './apiClient';
import { startMockJob } from './jobs';

export const backupService = {
  async getBackups() {
    if (USE_MOCKS) return mockResponse(null, 0); // slice holds the mock list
    return api.get('/backups');
  },
  async updateSettings(settings) {
    if (USE_MOCKS) return mockResponse(settings, 0);
    return api.patch('/backups/settings', settings);
  },
  // Returns { jobId } — progress comes from jobs.subscribeToJob
  async startBackup() {
    if (USE_MOCKS) return mockResponse({ jobId: startMockJob() }, 0);
    return api.post('/backups');
  },
  async startRestore(backupId, options) {
    if (USE_MOCKS) return mockResponse({ jobId: startMockJob() }, 0);
    return api.post(`/backups/${backupId}/restore`, { options });
  },
};
