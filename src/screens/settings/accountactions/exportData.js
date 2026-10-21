// Shared copy + helpers for the Data export flow.

export const EXPORT_CATEGORIES = [
  { key: 'profile', title: 'My personal details', description: 'Your profile and preferences', shortDescription: 'Your profile and preferences', records: 312 },
  { key: 'workspace', title: 'My journey & progress', description: 'Goals, habits, and tracker history', shortDescription: 'Goals, habits, and tracker history', records: 964 },
  { key: 'messages', title: 'My journals & memories', description: 'Personal entries and saved moments', shortDescription: 'Personal entries and saved moments', records: 1847 },
  { key: 'media', title: 'My photos & creations', description: 'Photos, outfits, mood boards, and ect', shortDescription: 'Photos, outfits, mood boards, and ect', records: 426 },
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
