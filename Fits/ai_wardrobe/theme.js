// AI Wardrobe module theme.
// Re-exports the shared SuperBae tokens and adds the AI-Wardrobe-only accents
// (purple / lavender) so screens never hardcode these values.
// NOTE: purple values are read from the Figma screenshots, not exact hex from
// the Figma file (MCP was rate-limited) — verify against the design.
import {
  colors as base,
  typography,
  fontFamily,
  fontSize,
  spacing,
  radius,
  shadow as baseShadow,
} from '../../src/theme';

export const colors = {
  ...base,
  accent: '#9333EA', // purple – step badge text, AI sparkle, selected state
  accentSoft: '#F6ECFF', // pale lavender – badge + selected tile background
  accentBorder: '#A855F7', // selected tile border
  mascotCard: '#FFFFFF',
  sparkleGold: '#FBBF24', // wardrobe magic sparkles
  smokeLight: '#F4F1EE', // wardrobe door dust
  smokeDust: '#E8E2DB',
  doorShade: '#000000', // darkens a wardrobe door as it swings
  chipMuted: '#F3F4F6', // "4 Items from your wardrobe" pill
  tileBorder: '#EDEDED',
  tileShadow: '#000000',
  mascotInk: '#0B0B0B', // Ara's eyes / smile / brows
  mascotBlush: '#FF7A96', // Ara's cheeks
};

export const shadow = {
  ...baseShadow,
  // soft lift under option tiles
  tile: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
};

export { typography, fontFamily, fontSize, spacing, radius };
