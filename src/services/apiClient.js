import { API_BASE_URL, MOCK_DELAY_MS } from './config';

let authToken = null;

export function setAuthToken(token) {
  authToken = token;
}

export class ApiError extends Error {
  constructor(message, status, code) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

// Thin fetch wrapper used by every service once the backend is connected.
export async function request(method, path, body) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new ApiError(data?.message || 'Something went wrong', response.status, data?.code);
  }
  return data;
}

export const api = {
  get: (path) => request('GET', path),
  post: (path, body) => request('POST', path, body),
  put: (path, body) => request('PUT', path, body),
  patch: (path, body) => request('PATCH', path, body),
  delete: (path) => request('DELETE', path),
};

export function mockResponse(data, delay = MOCK_DELAY_MS) {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
}

export function mockError(message, code, delay = MOCK_DELAY_MS) {
  return new Promise((_, reject) => setTimeout(() => reject(new ApiError(message, 400, code)), delay));
}
