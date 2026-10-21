import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  backup: {
    lastBackupLabel: 'October 28, 2024 at 03:14 AM',
    storageUsedGb: 4.2,
    storageTotalGb: 15,
    overCellular: true,
    frequency: 'weekly',
    backups: [
      { id: 'b1', dateLabel: 'Oct 28, 2024 at 03:14 AM', size: '4.2 GB', files: '1,247 files', latest: true },
      { id: 'b2', dateLabel: 'Oct 21, 2024 at 11:45 PM', size: '4.0 GB', files: '1,192 files' },
      { id: 'b3', dateLabel: 'Oct 14, 2024 at 09:12 AM', size: '3.8 GB', files: '1,024 files' },
      { id: 'b4', dateLabel: 'Sep 30, 2024 at 05:30 PM', size: '3.6 GB', files: '980 files' },
    ],
    selectedBackupId: 'b1',
    restoreOptions: {
      appSettings: true,
      messages: true,
      media: true,
      activity: true,
    },
    lastResult: {
      dateLabel: 'Oct 29, 2024 at 03:22 AM',
      size: '4.2 GB',
      duration: '8 minutes',
      items: '1,247 files',
    },
  },
  dataExport: {
    format: 'csv',
    categories: {
      profile: true,
      workspace: true,
      messages: false,
      media: false,
    },
    recent: [
      { id: 'e1', name: 'archive_2024_10_24.pdf', size: '14.2 MB', expires: 'Nov 04', type: 'JSON', expired: false },
      { id: 'e2', name: 'archive_2024_10_17.csv', size: '11.8 MB', expires: 'Oct 28', type: 'CSV', expired: false },
      { id: 'e3', name: 'archive_2024_09_30.pdf', size: '8.4 MB', type: 'PDF', expired: true },
      { id: 'e4', name: 'archive_2024_09_15.pdf', size: '22.1 MB', type: 'JSON', expired: true },
    ],
    lastExport: null,
  },
  subscription: {
    planName: 'Premium Pro',
    price: '₹2,499',
    period: 'year',
    renewsOn: 'Dec 12, 2026',
    invoices: [
      { id: 'INV-2025-541', title: 'Pro Yearly', date: 'Oct 12, 2025', amount: '₹2,499', status: 'Paid' },
      { id: 'INV-2024-231', title: 'Pro Yearly', date: 'Oct 12, 2024', amount: '₹2,499', status: 'Paid' },
      { id: 'INV-2023-121', title: 'Pro Yearly (Promo)', date: 'Oct 12, 2023', amount: '₹1,999', status: 'Paid' },
    ],
    offer: {
      id: 'pro_yearly',
      name: 'Pro yearly',
      price: '₹2,499',
      period: 'year',
      badge: 'Best value',
      perMonth: '₹208',
      savePercent: 30,
      benefits: [
        { title: 'Mood & wellness', description: 'Track your wellbeing without limits' },
        { title: 'Personal insights', description: 'Discover more about yourself daily' },
        { title: 'Exclusive events', description: 'Enjoy special SuperBae community events' },
        { title: 'Priority support', description: 'Extra care whenever you need' },
        { title: 'Ad-free experience', description: 'No ads, just your space' },
        { title: 'Privacy & security', description: 'Your data stays safely protected' },
      ],
    },
  },
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setBackupOverCellular(state, action) {
      state.backup.overCellular = action.payload;
    },
    setBackupFrequency(state, action) {
      state.backup.frequency = action.payload;
    },
    completeBackup(state, action) {
      const { dateLabel, shortDateLabel } = action.payload;
      state.backup.lastBackupLabel = dateLabel;
      state.backup.backups.forEach((backup) => { backup.latest = false; });
      const id = `b${Date.now()}`;
      state.backup.backups.unshift({ id, dateLabel: shortDateLabel, size: '4.2 GB', files: '1,247 files', latest: true });
      state.backup.selectedBackupId = id;
      state.backup.lastResult = { dateLabel: shortDateLabel, size: '4.2 GB', duration: '8 minutes', items: '1,247 files' };
    },
    selectBackup(state, action) {
      state.backup.selectedBackupId = action.payload;
    },
    toggleRestoreOption(state, action) {
      const key = action.payload;
      state.backup.restoreOptions[key] = !state.backup.restoreOptions[key];
    },
    setExportFormat(state, action) {
      state.dataExport.format = action.payload;
    },
    toggleExportCategory(state, action) {
      const key = action.payload;
      state.dataExport.categories[key] = !state.dataExport.categories[key];
    },
    completeExport(state, action) {
      const archive = action.payload;
      state.dataExport.lastExport = archive;
      state.dataExport.recent.unshift({
        id: `e${Date.now()}`,
        name: archive.fileName,
        size: archive.size,
        expires: archive.expiresShort,
        type: archive.format.toUpperCase(),
        expired: false,
      });
    },
  },
});

export const {
  setBackupOverCellular,
  setBackupFrequency,
  completeBackup,
  selectBackup,
  toggleRestoreOption,
  setExportFormat,
  toggleExportCategory,
  completeExport,
} = accountSlice.actions;
export default accountSlice.reducer;
