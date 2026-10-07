import { USE_MOCKS } from './config';
import { api } from './apiClient';

// Long-running server jobs (backup, restore, export) report progress 0–100.
// Mock: counts 1 → 100 over ~10 s. Backend: poll GET /jobs/:id (swap for a
// websocket/SSE subscription if the API offers one).
const MOCK_DURATION_MS = 10000;
const POLL_INTERVAL_MS = 1500;

const mockJobs = new Map();

export function startMockJob() {
  const id = `job_${Date.now()}`;
  mockJobs.set(id, { startedAt: Date.now(), cancelled: false });
  return id;
}

export function subscribeToJob(jobId, onProgress) {
  if (USE_MOCKS) {
    let percent = 1;
    onProgress(percent);
    const timer = setInterval(() => {
      const job = mockJobs.get(jobId);
      if (!job || job.cancelled) {
        clearInterval(timer);
        return;
      }
      percent = Math.min(100, percent + 1);
      onProgress(percent);
      if (percent >= 100) clearInterval(timer);
    }, MOCK_DURATION_MS / 99);
    return () => clearInterval(timer);
  }

  let stopped = false;
  const poll = async () => {
    if (stopped) return;
    try {
      const { percent } = await api.get(`/jobs/${jobId}`);
      onProgress(percent);
      if (percent < 100) setTimeout(poll, POLL_INTERVAL_MS);
    } catch (e) {
      setTimeout(poll, POLL_INTERVAL_MS);
    }
  };
  poll();
  return () => { stopped = true; };
}

export async function cancelJob(jobId) {
  if (USE_MOCKS) {
    const job = mockJobs.get(jobId);
    if (job) job.cancelled = true;
    return;
  }
  await api.post(`/jobs/${jobId}/cancel`);
}
