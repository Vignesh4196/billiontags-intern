import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  faqs: [
    {
      id: 'faq-1',
      category: 'Account',
      categoryLabel: 'Account & Login',
      question: 'How do i reset my password?',
      publishedLabel: 'Published oct 4, 2026',
      readTime: '2 min read',
      body: [
        "If you've forgotten your password or want to update your credentials for safety reasons, follow these simple steps to perform a reset:",
        '1. Tap on the login page\'s **forgot password** link.',
        '2. Enter your registered email address and hit send.',
        '3. Check your inbox for our validation verification link.',
        '4. Click the link and enter your new password securely.',
      ],
      note: 'Make sure your password has at least 8 characters, including letters, numbers and special symbols for proper shield coverage.',
    },
    {
      id: 'faq-2',
      category: 'Billing',
      categoryLabel: 'Billing & Payment',
      question: 'Can i upgrade to premium anytime?',
      publishedLabel: 'Published sep 28, 2026',
      readTime: '1 min read',
      body: [
        'Yes, you can upgrade to premium at any time from your account settings:',
        '1. Open **Settings** and tap on Membership benefits.',
        '2. Choose the premium plan that suits you.',
        '3. Confirm your payment method and complete checkout.',
      ],
      note: 'Upgrades take effect immediately, and any remaining balance from your current plan is prorated.',
    },
    {
      id: 'faq-3',
      category: 'Billing',
      categoryLabel: 'Billing & Payment',
      question: "Where is my transaction history?",
      publishedLabel: 'Published sep 20, 2026',
      readTime: '1 min read',
      body: [
        'Your full transaction history is available inside the app:',
        '1. Go to **Settings** and open Subscription.',
        '2. Tap on Transaction history.',
        '3. Scroll to see every past payment with its date and amount.',
      ],
      note: 'Transaction records are kept for up to 2 years for your reference.',
    },
    {
      id: 'faq-4',
      category: 'Billing',
      categoryLabel: 'Billing & Payment',
      question: "What's the refund policy?",
      publishedLabel: 'Published sep 12, 2026',
      readTime: '2 min read',
      body: [
        'We offer refunds under the following conditions:',
        '1. Requests must be made within **7 days** of purchase.',
        '2. The subscription must not have been used extensively.',
        '3. Contact support with your order ID to start the process.',
      ],
      note: 'Refunds are processed back to your original payment method within 5-7 business days.',
    },
    {
      id: 'faq-5',
      category: 'Security',
      categoryLabel: 'Account & Login',
      question: 'How do i enable two-factor authentication?',
      publishedLabel: 'Published sep 5, 2026',
      readTime: '2 min read',
      body: [
        'Two-factor authentication adds an extra layer of security to your account:',
        '1. Go to **Settings** and open App lock.',
        '2. Turn on Authentication and choose your preferred method.',
        '3. Confirm using your device passcode or biometrics.',
      ],
      note: "We recommend enabling this for every account that stores shared memories.",
    },
  ],
};

const supportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {
    markFaqHelpful(state, action) {
      const { faqId, helpful } = action.payload;
      const faq = state.faqs.find((f) => f.id === faqId);
      if (faq) faq.helpful = helpful;
    },
  },
});

export const { markFaqHelpful } = supportSlice.actions;
export default supportSlice.reducer;
