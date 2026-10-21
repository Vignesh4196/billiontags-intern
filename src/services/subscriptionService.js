import { USE_MOCKS, PAYMENT_URL } from './config';
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
  // Hosted checkout for renewing a plan -> { url }. The app only opens it; the backend confirms payment.
  async getCheckoutUrl(planId) {
    if (USE_MOCKS) return mockResponse({ url: `${PAYMENT_URL}?plan=${encodeURIComponent(planId)}` }, 400);
    return api.get(`/subscription/checkout?plan=${encodeURIComponent(planId)}`);
  },
  async getInvoiceUrl(invoiceId) {
    if (USE_MOCKS) return mockResponse({ url: null }, 0);
    return api.get(`/subscription/invoices/${invoiceId}/pdf`);
  },
};
