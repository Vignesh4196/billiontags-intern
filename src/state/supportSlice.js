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
  tickets: [
    {
      id: '491028',
      title: 'Billing address validation error',
      description: "Keeps saying invalid country code when i put US.",
      status: 'in_progress',
      category: 'billing & payment',
      submittedLabel: 'oct 12, 2026',
      lastUpdatedLabel: 'Last updated: 5 mins ago',
      thread: [
        {
          id: 't1-1',
          sender: 'user',
          text: "I'm trying to check out but the address validation fails. It says invalid country code when i submit.",
          time: '10:24 AM',
        },
        {
          id: 't1-2',
          sender: 'agent',
          text: "I see the issue. Our system needs the ISO two-letter country code (like 'US' or 'GB') instead of writing the full name.",
          time: '10:31 AM',
        },
      ],
    },
    {
      id: '489311',
      title: 'Premium plan subscription missing',
      description: 'Please upload your payment receipt to complete valid...',
      status: 'needs_reply',
      category: 'billing & payment',
      submittedLabel: 'oct 6, 2026',
      lastUpdatedLabel: 'Last updated: yesterday',
      thread: [
        {
          id: 't2-1',
          sender: 'user',
          text: "I upgraded to premium yesterday but my account still shows the free plan.",
          time: '9:02 AM',
        },
        {
          id: 't2-2',
          sender: 'agent',
          text: 'Please upload your payment receipt so we can complete validation on our end.',
          time: '9:40 AM',
        },
      ],
    },
    {
      id: '473918',
      title: 'Cannot login via Google SSO',
      description: 'Your login authentication issue is solved.',
      status: 'resolved',
      category: 'account & login',
      submittedLabel: 'sep 20, 2026',
      lastUpdatedLabel: 'Resolved 4 days ago',
      thread: [
        {
          id: 't3-1',
          sender: 'user',
          text: "Google sign-in keeps failing with an unknown error.",
          time: '2:10 PM',
        },
        {
          id: 't3-2',
          sender: 'agent',
          text: 'This has been fixed on our end. Please try signing in again — let us know if it still fails.',
          time: '3:45 PM',
        },
      ],
    },
  ],
  liveChat: {
    agent: {
      name: 'Sarah',
      role: 'from support',
      status: 'Active • typically responds in under 1 min',
      online: true,
    },
    todayLabel: 'Today at 10:24 AM',
    messages: [
      {
        id: 'c1',
        sender: 'agent',
        text: 'Hello! Thanks for reaching out to US today. How can i help you with your account settings or payments?',
        time: '10:31 AM',
      },
      {
        id: 'c2',
        sender: 'user',
        text: "Hi sarah, i'm trying to update my billing address but it keeps saying 'invalid country code'. Could you assist?",
        time: '10:31 AM',
      },
      {
        id: 'c3',
        sender: 'agent',
        text: 'I can definitely look into that for you. Let me check your account profile. One moment please!',
        time: '10:31 AM',
      },
    ],
  },
};

const supportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {
    addTicket(state, action) {
      const { category, subject, description } = action.payload;
      const id = String(Math.floor(100000 + Math.random() * 900000));
      state.tickets.unshift({
        id,
        title: subject,
        description,
        status: 'in_progress',
        category,
        submittedLabel: 'just now',
        lastUpdatedLabel: 'Last updated: just now',
        thread: [],
      });
    },
    appendTicketMessage(state, action) {
      const { ticketId, text } = action.payload;
      const ticket = state.tickets.find((t) => t.id === ticketId);
      if (ticket) {
        ticket.thread.push({ id: `m${Date.now()}`, sender: 'user', text, time: 'Just now' });
        ticket.lastUpdatedLabel = 'Last updated: just now';
      }
    },
    appendChatMessage(state, action) {
      const { text } = action.payload;
      state.liveChat.messages.push({ id: `c${Date.now()}`, sender: 'user', text, time: 'Just now' });
    },
    markFaqHelpful(state, action) {
      const { faqId, helpful } = action.payload;
      const faq = state.faqs.find((f) => f.id === faqId);
      if (faq) faq.helpful = helpful;
    },
  },
});

export const { addTicket, appendTicketMessage, appendChatMessage, markFaqHelpful } = supportSlice.actions;
export default supportSlice.reducer;
