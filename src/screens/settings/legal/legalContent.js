// Copy for the legal pages, taken from the Figma screens. No backend yet.
// NOTE: the Terms copy names "DesignCo" (it looks like template text from the design file); the Privacy copy
// names Superbae. Replace the company name here once the real legal text is supplied.

export const TERMS_OF_SERVICE = {
  title: 'Terms of Service',
  iconName: 'file-document-outline',
  cardTitle: 'Standard Agreement',
  cardSubtitle: 'Last updated: October 24, 2026',
  sections: [
    {
      heading: '1. Acceptance of Terms',
      body: 'By accessing or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.',
    },
    {
      heading: '2. User Accounts',
      body: 'To access certain features of the service, you must register for an account. You agree to provide accurate, current, and complete information during registration and to maintain the security of your account credentials at all times.',
    },
    {
      heading: '3. Acceptable Use',
      body: 'You agree not to engage in any prohibited activities, including hacking, spamming, transmitting malware, or violating any third-party intellectual property or privacy rights while utilizing our application platform.',
    },
    {
      heading: '4. Intellectual Property',
      body: 'All content, features, and functionality of the services, including text, graphics, logos, and code, are the exclusive property of DesignCo and are protected by international copyright, trademark, and patent laws.',
    },
    {
      heading: '5. Termination',
      body: 'We reserve the right to suspend or terminate your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms of Service.',
    },
    {
      heading: '6. Limitation of Liability',
      body: 'In no event shall DesignCo, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access to or use of the services.',
    },
    {
      heading: '7. Changes to Terms',
      body: 'We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.',
    },
    {
      heading: '8. Contact Us',
      body: 'If you have any questions or concerns regarding these Terms of Service, please contact our legal department at legal@designco.com or via help support channels.',
    },
  ],
  footer: {
    version: 'DesignCo Terms of Service v3.2',
    copyright: '© 2026 DesignCo Inc. All rights reserved.',
  },
};

export const PRIVACY_POLICY = {
  title: 'Privacy Policy',
  iconName: 'file-export-outline',
  cardTitle: 'Data Protection Guidelines',
  cardSubtitle: 'Effective: Immediately | Revised: Oct 2026',
  sections: [
    {
      heading: '1. Information We Collect',
      body: 'We collect personal data you provide directly, such as name, email address, password, billing credentials, and any metadata linked with system backup operations.',
    },
    {
      heading: '2. How We Use Your Information',
      body: 'Your data is utilized to personalize your product workflow experience, facilitate safe weekly cloud database backups, process subscription orders, and deliver crucial system notices.',
    },
    {
      heading: '3. Data Sharing & Disclosure',
      body: 'We do not sell your personal data. We only share information with trusted third-party cloud database providers and legal authorities when strictly required by security compliance laws.',
    },
    {
      heading: '4. Data Retention',
      body: 'We retain collected system information for only as long as your registered account remains active, or as necessary to comply with security regulations and verify active subscription states.',
    },
    {
      heading: '5. Your Rights & Choices',
      body: 'You have the absolute right to request access to, correction of, or permanent deletion of your personal data. You can exercise these data management choices directly inside our security settings panel.',
    },
    {
      heading: '6. Security Measures',
      body: 'We implement robust technical and organizational security controls, including AES-256 database backup encryption, to protect user logs against unauthorized system access or accidental leakage.',
    },
    {
      heading: "7. Children's Privacy",
      body: 'Our application services are not designed for or intentionally directed to children under the age of 13. We do not knowingly collect or request personal logs from minors.',
    },
    {
      heading: '8. Updates to This Policy',
      body: 'We may update this Privacy Policy periodically to match changes in international data safety regulations. Significant modifications will be communicated via active email notifications.',
    },
    {
      heading: '9. Contact Us',
      body: 'For any specific inquiries concerning your data footprint, legal rights, or our security frameworks, contact our Data Protection Officer at privacy@superbae.com.',
    },
  ],
  footer: {
    version: 'Superbae privacy policy v4.1',
    copyright: '© 2026 Superbae Pvt Ltd. All rights reserved.',
  },
};
