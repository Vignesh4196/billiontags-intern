# Connecting the Settings module to the backend

Every screen talks to the server only through `src/services/`. Today those
services return mock data, so the whole app works offline. To go live:

1. Set the API base URL (e.g. in `.env`):
   ```
   EXPO_PUBLIC_API_URL=https://api.superbae.app/v1
   ```
   `USE_MOCKS` in `src/services/config.js` turns off automatically once this is set.
2. Implement the endpoints below (or adjust the paths in the service files).
3. Call `setAuthToken(token)` from `src/services/apiClient.js` after login.

Screens never call `fetch` directly, so no screen code changes are needed.
Errors thrown by the API (`ApiError` with `message`, `status`, `code`) are shown
inline by the screens that handle them (OTP, phone check, disconnect).

## Long-running jobs (backup, restore, export)

`POST` endpoints return `{ jobId }`. `src/services/jobs.js` then polls
`GET /jobs/:id` → `{ percent: 0-100 }` every 1.5 s (swap in a websocket/SSE
subscription if available). `POST /jobs/:id/cancel` is called from the Cancel
buttons. The progress rings and stage rows animate from whatever `percent` the
server reports; screens use the `useJobProgress` hook.

## Endpoint map

| Screen / action | Service function | Endpoint |
|---|---|---|
| Edit my profile → Save | `settingsService.updateMyProfile` | `PATCH /me/profile` |
| Partner profile → Save | `settingsService.updatePartnerProfile` | `PATCH /partner/profile` |
| Permissions → Save | `settingsService.savePermissions` | `PUT /me/permissions` |
| Language change → Confirm | `settingsService.setLanguage` | `PUT /me/language` |
| Partner feature toggles | `partnerService.updateFeature` | `PATCH /partner/features` |
| Invite partner / share | `partnerService.sendInvite` | `POST /partner/invites` |
| Space disconnected → Invite new partner | `partnerService.createInviteCode` | `POST /partner/invite-code` → `{ code, link }` |
| Disconnect → Verify & disconnect | `partnerService.disconnect` | `POST /partner/disconnect` |
| Delete sync data | `partnerService.deleteSyncData` | `POST /partner/sync-data/delete` |
| System backup settings | `backupService.updateSettings` | `PATCH /backups/settings` |
| Back Up Now | `backupService.startBackup` | `POST /backups` → job |
| Restore Selected Backup | `backupService.startRestore` | `POST /backups/:id/restore` → job |
| Generate Export Archive | `exportService.createExport` | `POST /exports` → job |
| Download Archive | `exportService.getDownloadUrl` | `GET /exports/:id/download` → `{ url }` |
| Deactivate workspace | `accountService.deactivateWorkspace` | `POST /workspace/deactivate` |
| Archive preference → Save | `accountService.saveArchivePreference` | `PUT /workspace/archive-preference` |
| Delete account → phone check | `accountService.requestDeleteOtp` | `POST /account/delete/request-otp` → `{ resendInSeconds }` |
| Verify code | `accountService.verifyDeleteOtp` | `POST /account/delete/verify-otp` |
| Permanently delete account | `accountService.deleteAccount` | `DELETE /account` |
| Logout | `accountService.logout` | `POST /auth/logout` |
| Subscription → invoices download | `subscriptionService.getInvoiceUrl` | `GET /subscription/invoices/:id/pdf` → `{ url }` |
| Plan details → Renew Plan | `subscriptionService.renewPlan` | `POST /subscription/renew` |

Read endpoints (`GET /subscription`, `/subscription/invoices`, `/backups`) are
stubbed in the services; when connected, load them on screen focus and store the
result in the Redux slices (`settingsSlice`, `accountSlice`, `supportSlice`),
which currently hold the dummy data.

## After-session flows

Account deletion, workspace deactivation and logout reset the navigation stack to
`Login` (`resetToLogin` in `src/navigation/helpers.js`). `LoginScreen` is a
placeholder until the auth module is designed.
