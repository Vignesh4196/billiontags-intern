# Project: SuperBae – Settings module

## Source of truth
- **Always read `SETTINGS_FIGMA_MAP.md` first** at the start of every task. It lists every Settings screen, grouped 1–9, with its Figma link.
- Use the Figma MCP (claude.ai Figma) to read each screen: `get_screenshot` to see it, `get_design_context` for exact layout, colors, fonts and spacing.
- Only use frames listed in the map. Ignore the `old` section in Figma.

## Tech stack
- Expo (React Native), JavaScript
- React Navigation (native stack)
- Redux Toolkit for settings state
- Icons: @expo/vector-icons unless the design needs custom SVGs

## Folder structure
```
src/
  theme/          colors, typography, spacing (tokens pulled from Figma)
  components/     shared UI: Header, SettingsCard, SettingsRow, Toggle, Button, BottomSheet, Popup
  navigation/     SettingsNavigator.js
  screens/settings/<group>/   one folder per group from the map
  state/          store.js, settingsSlice.js
```

## Build rules
- Build **one group at a time**, in map order unless told otherwise. Never start the next group without my approval.
- Within a group, build screens one by one: screenshot the Figma frame → build → compare.
- Reuse shared components and theme tokens; never hardcode colors or font sizes in screens.
- Match Figma exactly: spacing, radius, shadows, font weights, icon sizes, text content.
- Use placeholder navigation for screens in groups not built yet.
- Keep dummy data in the Redux slice (no backend yet). 

## After finishing each group — STOP and report
1. A table: Screen name | Figma link | File path | Status
2. Anything that differs from Figma or needed a guess (missing icons, fonts, unclear states)
3. How to reach each screen in the app
4. Then wait for me to say "approved" or give fixes. Fix issues before moving on.

## Progress
Keep a checklist in `PROGRESS.md` (group, screens done, approved yes/no). Update it after every group.
- I test in the browser (Expo web, 440px wide). Make sure every screen works with react-native-web; use Platform checks for native-only features.