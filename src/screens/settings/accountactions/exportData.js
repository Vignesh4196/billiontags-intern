// Shared copy + helpers for the Data export flow.

export const EXPORT_CATEGORIES = [
  { key: 'profile', title: 'Profile & Account', description: 'Email, billing logs, preferences', shortDescription: 'Email, billing logs, preferences', records: 312 },
  { key: 'workspace', title: 'Workspace Activity', description: 'Session logs, workspace interaction stats', shortDescription: 'Session logs, interaction stats', records: 964 },
  { key: 'messages', title: 'Messages & Chat', description: 'Direct chats, channel notes, files', shortDescription: 'Direct chats, channel notes', records: 1847 },
  { key: 'media', title: 'Media Files', description: 'Original resolution uploads and documents', shortDescription: 'Original resolution uploads', records: 426 },
];

export function selectedCategories(categories) {
  return EXPORT_CATEGORIES.filter(({ key }) => categories[key]);
}

// Builds the file content for a download (dummy data until the backend exists).
export function buildArchiveContent(archive, profile) {
  if (archive.format === 'csv') {
    return [
      'category,field,value',
      `profile,name,${profile.displayName}`,
      `profile,email,${profile.email}`,
      `profile,phone,${profile.phone}`,
      ...archive.categoryTitles.map((title) => `export,category,${title}`),
      `export,created,${archive.created}`,
    ].join('\n');
  }
  return [
    'SuperBae data export',
    `Created: ${archive.created}`,
    `Categories: ${archive.categoryTitles.join(', ')}`,
    `Name: ${profile.displayName}`,
    `Email: ${profile.email}`,
  ].join('\n');
}
