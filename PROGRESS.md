# Settings module — build progress

## Group 1: Profile

| Screen | Figma node | Status | Approved |
|---|---|---|---|
| Edit profile (Main-settings) | `6339:15563` | Built | yes |
| Me profile | `6367:17018` | Built | yes |
| Me - partner profile | `6371:17507` | Built | yes |

Shared theme tokens and components (Header, SettingsCard, SettingsRow, Toggle,
Button, BottomSheet, Popup, ScreenHeader, Input, Chip, PickerField, ProfileForm)
built as part of Group 1.

Profile photo upload, camera capture, and photo preview interactions are
implemented on the two profile forms and main profile card (front-end only,
no backend).

Main-settings also includes an Elite Superbae membership promo + Membership
Benefits row, added per updated Figma design (not in the original Group 1 map).

## Group 8: Account actions (requested logout flow)

| Screen | Figma node | Status | Approved |
|---|---|---|---|
| Logout | `6610:14491` | Built | yes |
| Logout success | `6740:21631` | Built | yes |

## Group 1: APPROVED — 2026-09-25

## Group 2: Relationship — SKIPPED (2026-09-25)
Not being built for now; can implement later if needed. The "Relationship
settings" placeholder route has been removed from SettingsNavigator.js since
nothing links to it anymore.

## Group 6: App settings

| Screen | Status | Approved |
|---|---|---|
| Language | Built | yes |
| Language change confirm | Built | yes |
| Permissions | Built | yes |
| App lock (+ Authentication method / Security preference / Require authentication sheets) | Built | yes |

## Group 6: APPROVED — 2026-09-28

## Groups 4 (Privacy) & 5 (Notifications) — SKIPPED FOR NOW (2026-09-28)
User chose to skip these and build Group 7 (Support) next; routes remain on
`PlaceholderScreen` until revisited.

## Group 7: Support

| Screen | File path | Status |
|---|---|---|
| Help & support | src/screens/settings/support/HelpSupportScreen.js | Built |
| Common faqs | src/screens/settings/support/CommonFaqsScreen.js | Built |
| FAQ Article | src/screens/settings/support/FaqArticleScreen.js | Built |
| My tickets | src/screens/settings/support/MyTicketsScreen.js | Built |
| New ticket | src/screens/settings/support/NewTicketScreen.js | Built |
| Ticket detail | src/screens/settings/support/TicketDetailScreen.js | Built |
| Live chat | src/screens/settings/support/LiveChatScreen.js | Built |

Built from user-supplied screenshots (no Figma frames referenced this time).
New `support` Redux slice (`src/state/supportSlice.js`) holds dummy faqs/
tickets/live-chat data. New shared components: `StatusBadge`, `ChatBubble`.
Awaiting approval.

---

# Re-check pass (2026-10) — new Figma section `7320:20093`

The Figma designs changed; every group is re-checked against `SETTINGS_FIGMA_MAP.md`
(new numbering). All approvals reset to "no" for this pass.

## Group 1: Main settings & profile

| Screen | Figma node | File | Status | Approved |
|---|---|---|---|---|
| Main settings | `7326:18134` | src/screens/settings/profile/MainSettingsScreen.js | Updated | no |
| Partner settings | `7320:22364` | src/screens/settings/profile/PartnerSettingsScreen.js | New | no |
| Main settings – Profile / Invite partner (My profile) | `7409:22793` | src/screens/settings/profile/MyProfileScreen.js | Updated | no |
| Me-partner profile | `7320:22578` | src/screens/settings/profile/PartnerProfileScreen.js | Updated (subtitle + header ✓ save) | no |

Built from user screenshots + saved Figma layer metadata (Figma MCP is
rate-limited on the View seat). New shared components: `CoupleCard`,
`SectionLabel`. `Toggle` updated to the new 48×24 / #22C55E spec app-wide.
Logout is intentionally unreachable until Group 7 (Account actions).

Main settings uses user-supplied icons for Privacy policy, Service terms, Rate app,
Share app and Refer to people (`src/assets/icons/*-icon.png`); Membership uses the
existing `membership-benefits-icon.png` (confirmed by user 2026-10-04).

My profile: new `PartnerBanner`, `SelectField`, `OptionSheet` components; `Input`,
`Chip`, `PickerField(.web)` and `ProfileForm` restyled to the new field spec
(56px fields with soft shadow, 12px labels, DD/MM/YYYY on web, sticky Save).
New profile data + option lists in `settingsSlice` (`profileOptions`).
My profile shows "Connected with <partner>" when `partnerConnection.connected` is true,
otherwise "Invite Your Partner". ConnectionSuccess sets it to true; the Disconnect
flow (Group 4) should set it to false.

## Group 2: My partner (Our space) — re-check

| Screen | Figma node | File | Status | Approved |
|---|---|---|---|---|
| Our space | `7320:20180` | src/screens/settings/ourspace/OurSpaceScreen.js | Updated (separate from Partner settings) | no |
| Invite partner | `7320:20277` | src/screens/settings/ourspace/InvitePartnerScreen.js | Updated | no |
| Bottom sheet (Invite Partner QR) | `7395:16577` | src/components/InviteQrSheet.js | New | no |
| Invitation pending | `7320:20322` | src/screens/settings/ourspace/InvitationPendingScreen.js | Updated | no |
| Connection success | `7320:20426` | src/screens/settings/ourspace/ConnectionSuccessScreen.js | Updated | no |

Built from user screenshots. Our space is reached from Main settings → "My Partner" while disconnected
(the old temporary entry was removed). The invite flow returns to whichever
hub started it (Our space or Partner settings) via `src/navigation/helpers.js`.
QR code is generated with `toqr` (scannable, links to the invitation link) with the
SuperBae logo in the middle. New shared pieces: `QrCode`, `InviteQrSheet`,
`DisconnectPartnerCard`, `utils/share.js`.

Our space + Partner settings row icons (Our Intimacy, Heart Check, My Cycle, Theme,
Invite your partner) now use the exact Figma SVGs (`src/components/icons/*Icon.js`,
source files in `src/assets/icons/*-icon.svg`). Disconnect card matched to Figma
(medium body text, 16px gap, `rgba(247,37,37,0.2)` button border). Toggle knob
corrected app-wide to 16px with 4px padding.

## Group 6: App settings — re-check

| Screen | File | Status | Approved |
|---|---|---|---|
| App settings (menu) | src/screens/settings/appsettings/AppSettingsScreen.js | Updated (Language, Permissions, Account actions, Support options; App lock + Storage rows removed per Figma) | no |

## Group 7: Account actions

| Screen | File | Status | Approved |
|---|---|---|---|
| Account actions (menu) | accountactions/AccountActionsScreen.js | New | no |
| System backup | accountactions/SystemBackupScreen.js | New | no |
| Backing up / Restoring (progress) | accountactions/BackupProgressScreen.js | New | no |
| Backup / Restore complete | accountactions/BackupCompleteScreen.js | New | no |
| Restore backup | accountactions/RestoreBackupScreen.js | New | no |
| Data export | accountactions/DataExportScreen.js | New | no |
| Generating export (progress) | accountactions/ExportProgressScreen.js | New | no |
| Export ready | accountactions/ExportReadyScreen.js | New | no |
| Deactivate workspace | accountactions/DeactivateWorkspaceScreen.js | New | no |
| Workspace deactivated | accountactions/WorkspaceDeactivatedScreen.js | New | no |
| Workspace suspended | accountactions/WorkspaceSuspendedScreen.js | New | no |
| Suspension failed | accountactions/SuspensionFailedScreen.js | New | no |
| Delete account – ID verify | accountactions/DeleteAccountScreen.js | New | no |
| Delete account – OTP verify | accountactions/DeleteVerifyCodeScreen.js | New | no |
| Confirm deletion | accountactions/ConfirmDeletionScreen.js | New | no |
| Account deleted | accountactions/AccountDeletedScreen.js | New | no |
| Logout / Logout success | profile/Logout*Screen.js | Now reachable via Account actions → Logout | yes (earlier) |

Progress rings use `useSimulatedProgress` (1 → 100% over ~10 s) — swap for backend
progress events later. New state in `src/state/accountSlice.js`. Account deleted
illustration is a 1x crop from the user's screenshot (needs a proper Figma export).

## Round: subscription, disconnect, app-settings re-check (2026-10-04)

| Screen | File | Status | Approved |
|---|---|---|---|
| Subscription overview | subscription/SubscriptionScreen.js | New | no |
| Plan details (Pro yearly) | subscription/PlanDetailsScreen.js | New | no |
| Disconnect warning ("Account settings") | disconnect/DisconnectWarningScreen.js | New | no |
| Secure verification | disconnect/DisconnectVerifyScreen.js | New | no |
| Delete sync data | disconnect/DeleteSyncDataScreen.js | New | no |
| Space disconnected | disconnect/SpaceDisconnectedScreen.js | New (Invite new partner → new code → Invite; Export memories → Data export; Continue alone → Main) | no |
| Language | appsettings/LanguageScreen.js | Updated | no |
| Permissions | appsettings/PermissionsScreen.js | Updated (draft + Save, system-settings link) | no |
| Help & support | support/HelpSupportScreen.js | Updated | no |
| Login | src/screens/auth/LoginScreen.js | Placeholder (auth not designed) | — |

Fixes: account deletion, workspace deactivation and logout now reset to Login;
toggle "off" state is visible (#999999 track).

Backend readiness: all server actions go through `src/services/` (mock mode until
`EXPO_PUBLIC_API_URL` is set). See BACKEND.md for the endpoint map.

## Fixes: flow wiring / back navigation (2026-10-05, re-applied after a revert)

Audit: 7 read-only agents replayed every flow through the real React Navigation 7 stack router
(31 confirmed findings). Root cause of the loops: `navigate()` to a screen that is already in the
stack pushes a duplicate instead of going back to it.

- Loops fixed with popTo/pop: Backup/Restore complete -> System backup, Export ready -> Data export,
  Plan details -> Subscription, invite flow exits (Continue alone / Enter shared space / back from
  Connection success) via exitInviteFlow in navigation/helpers.js (returns to whichever screen opened
  Invite partner: Our space, Partner settings, My profile).
- Finished flows can't be re-entered with back / hardware back: disconnect (finishFlow drops the
  warning + verify steps; back from Delete sync data = keep data), restore (Restore form removed),
  deactivate (only Workspace deactivated left; back -> Login), logout (Logout success alone; back -> Login).
  Space disconnected -> Invite new partner replaces itself, so its exits land on the space hub.
- Leaving a backup/restore/export progress screen any way cancels the job (useJobProgress).
- "deactivate" confirm phrase is case-insensitive (same as "delete"); keyboard Done no longer bypasses
  the disabled Confirm button; Suspension failed copy updated.
- Help & support: Contact us and Feedback & Suggestions no longer navigate (My tickets / New ticket /
  Ticket detail unreachable for now, routes kept).
- Our space / Partner settings hide the Disconnect card when partnerConnection.connected is false.
- Resend invitation re-shares the invite and calls partnerService.sendInvite.
- Export shared memories selects only Messages + Media. LiveChat attach icon no longer sends.

Not changed (needs your decision): Rate app row has no action (no store URL); Rate/Share/Refer rows
reuse the subtitle "Manage your shared space"; AppLock, LiveChat and Privacy routes have no entry
point; Notifications is still a PlaceholderScreen.

| Approved |
|---|
| no |

## Notifications screen + hover + partner-only couple card (2026-10-05)

| Screen | File | Status | Approved |
|---|---|---|---|
| Notifications | src/screens/settings/notifications/NotificationsScreen.js | Built from screenshot (Figma unreachable), state in settingsSlice.notifications | no |

- Hover highlight is now on the shared Button (dark border on mouse-over, web only). The invite
  screen's local HoverButton was removed.
- (Superseded) The couple card no longer takes a connected prop - see "My partner / Our space when disconnected" below.

## My partner / Our space when disconnected (2026-10-06)

- Both screens are titled "My partner" (Our space keeps its "Manage your shared space" subtitle).
- My partner (PartnerSettingsScreen) is connected-only: the couple card is back to the full design
  (both avatars, heart, calculated "Together since"). Main settings decides where "My Partner" goes:
  connected -> My partner, disconnected -> Our space (where "Invite your partner" is). The Login redirect is no longer on My partner.
  If My partner is reached anyway while disconnected (back after the disconnect flow) it swaps itself for Our space (focus-based).
- Our space hides the couple card entirely while disconnected; the settings list and "Invite your partner" remain.
- The strip behind the avatars drifts slowly (useDrift hook, 16 s each way).
- "Together since" is calculated from profile.connectedAt: connecting stamps now, disconnecting clears it
  (formatTogetherSince in src/utils/dateFormat.js). Dummy seed date stays 2022-05-12.

## Notifications screen — re-checked against the screenshot (2026-10-06)

Rebuilt to match `images/6.png` (Figma still unreachable, so the screenshot is the source). Measured from the image
and checked against the real DM Sans font files: one white card (radius 24) containing both section labels;
header = large header, SemiBold 22 (`typography.headerMedium`); labels Medium 13 `#6B7280` (uppercase text);
row titles Regular 15 `#1F2937`; subtitles Regular 12 `#6B7280`; 20px side padding; 1px `#F3F4F6` dividers under every
row except the last (new token `colors.borderDivider`); toggle 48x24, on `#22C55E`, off `#999999`.
Verified by rendering the web build in headless Chrome at 440px and diffing against the screenshot: every text edge
within 3px, toggle colours identical, dividers in the same rows; tapping a toggle flips it.
Still dummy state in `settingsSlice.notifications` (no backend). Approved: no.

## Terms of Service, Privacy Policy, Referral sheet, pull-up QR sheet (2026-10-06)

| Screen | File | Status | Approved |
|---|---|---|---|
| Terms of Service | src/screens/settings/legal/TermsOfServiceScreen.js | Built from screenshot (images/7.png) | no |
| Privacy Policy | src/screens/settings/legal/PrivacyPolicyScreen.js | Built from screenshot (images/8.png) | no |
| Referral — Invite Friends sheet | opened from Main settings "Refer to people" (src/components/InviteQrSheet.js) | Built from screenshot (images/9.png). It is the sheet itself, no separate screen; the Referral placeholder route was removed | no |

- Both legal screens use `components/LegalDocument.js`; the copy lives in `screens/settings/legal/legalContent.js`. Routes
  `TermsOfService` / `PrivacyPolicy` are reached from Main settings and from Help & support. The Terms copy names
  "DesignCo" (looks like template text from the design file) - replace once the real text is supplied.
- `BottomSheet` has an `expandable` mode: opens at 3/4 of the screen, pull up (or tap the handle) to show everything with no
  scroll, pull down to go back, pull far down or tap the backdrop to close. A scroll only appears on a screen too short for the
  whole sheet. The Invite Partner QR sheet and the referral sheet both use it (`InviteQrSheet` takes title/labels).
- Measured against the screenshots in headless Chrome: Terms and Privacy text lines within 1px (mean 0.25 / 0.30 px);
  the sheet's labels within 0.1px of the design and its height ~716px vs 717px. New tokens: `colors.textLight`.
- Referral code/link are dummy data in `settingsSlice.referral`.

## Honeycomb polygon on subscription cards (2026-10-07)

- Replaced the old flat-hex `components/HexPattern.js` with the Figma "Group 425" honeycomb (5 gradient hexagons,
  faint top-right tint). New props: `topColor`, `bottomColor`, `hexOpacity`.
- Subscription "Current plan" card: gold (`topColor="#FFD600"` → black), matching images/11.png.
- Plan details "Pro yearly" card: light green (`topColor="#22C55E"` → `#86EFAC`), matching images/10.png.
- Verified in headless Chrome against both reference screenshots: tint sits in the top-right, green within a few
  RGB of the design (#EEFBF3 vs #F3FAF6). Tokens `colors.hexDark`/`hexGreen` are now unused (left in place).

## Honeycomb polygon — match reference exactly (2026-10-07)

- Gold (Subscription) was spreading across the card: react-native-web does not clip SVG content to the viewBox,
  so the whole honeycomb showed. Added a `clip` prop (overflow:hidden on the wrap). Subscription now uses
  `width=170 height=208 clip` so the gold cluster sits tight in the top-right and bleeds off the right edge (images/11.png).
- Plan details green: `width=230 height=300 top={-6}` so it spans the card as in images/10.png.
- QR code: generated live by `components/QrCode.js` via the `toqr` library from `https://<link>` (invite or referral),
  with the SuperBae logo centred and high error-correction; it regenerates automatically whenever the code/link changes.

## My partner couple card — clouds + together-since (2026-10-07)

- Clouds: the strip (`us-card-bg.png`) is now tiled (TILE_RATIO 0.55 → ~3 denser tiles) and scrolls continuously in
  ONE direction (left), looping seamlessly by snapping one tile width. `useDrift` rewritten to a linear one-way loop
  (was back-and-forth). Verified in headless Chrome: strip translateX advances -26 → -58px over 2s.
- "Together since" is now one line: `numberOfLines={1}`, font 13px, pill hugs its text (`alignSelf: center`).
  Longest labels (~338px at 14px) were wrapping; 13px fits (~291px) with room to spare.

## My partner clouds — follow-up (2026-10-07)

- Clouds are no longer horizontally squished: tile height is derived from the image aspect (52/347) so they
  keep their normal shape, just scaled down (TILE_RATIO 0.7 → ~279×42, 3 tiles, centred in the band) = more clouds.
- Drift is now 1.5s per tile (SLIDE_MS 1500) and genuinely continuous: `useDrift` switched to the JS driver
  (`useNativeDriver: false`) because Animated.loop with the native driver does not restart on react-native-web,
  which had parked the strip at the end of the first cycle. Verified the transform cycles 0 → -tileWidth repeatedly.

## My partner clouds - original size + slower drift (2026-10-07)

- Clouds are back at their ORIGINAL size: each tile renders at the full 59px band height (was about 42px
  at TILE_RATIO 0.7); the width follows the image aspect (59 / (52/347) = about 397px per tile), so the
  clouds keep their true shape and fill the band top to bottom. The stale TILE_RATIO reference in the
  component (undefined anywhere -> would throw a ReferenceError) was replaced by the TILE_WIDTH /
  CLOUD_HEIGHT constants.
- Drift is much slower: SLIDE_MS 6000 -> 20000 (about 20px per second), so the strip crawls across the card.

## UI polish round (2026-10-07)

- Account actions: all danger-row titles 16px.
- App settings: Permissions row uses the privacy shield icon; Support/Account actions gear icon no longer clipped (square viewBox).
- FAQ article: "Was this article helpful?" pinned to the bottom, article scrolls above it.
- Logout: no scroll (flex layout, illustration shrinks on short screens).
- Delete sync data: new `BinHalfIcon` (from `iconoir_bin-half.svg`) on the warning tile, the button and the item rows.
- Invitation pending: DottedSpinner uses the JS driver on web so it rotates continuously.
- Removed `success-tick.svg` (raster inside SVG). Success-screen pop animation waits for the PNG.
- Notifications font weights waiting for the screenshot.

| Approved |
|---|
| no |
