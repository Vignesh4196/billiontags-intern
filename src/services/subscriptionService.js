import { USE_MOCKS } from './config';
import { api, mockResponse } from './apiClient';

export const subscriptionService = {
  async getSubscription() {
    if (USE_MOCKS) return mockResponse(null, 0); // slice holds the mock data
    return api.get('/subscription');
  },
  async getInvoices() {
    if (USE_MOCKS) return mockResponse(null, 0);
    return api.get('/subscription/invoices');
  },
  async renewPlan(planId) {
    if (USE_MOCKS) return mockResponse({ renewed: true, planId }, 900);
    return api.post('/subscription/renew', { planId });
  },
  async getInvoiceUrl(invoiceId) {
    if (USE_MOCKS) return mockResponse({ url: null }, 0);
    return api.get(`/subscription/invoices/${invoiceId}/pdf`);
  },
};
