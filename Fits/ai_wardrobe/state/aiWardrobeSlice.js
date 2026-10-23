import { createSlice } from '@reduxjs/toolkit';

// Dummy state for the AI Wardrobe ("Ara") flow. Front-end only — no backend.

// Step 1 — occasion tiles (3D icons supplied by design).
export const occasions = [
  { id: 'office', label: 'Office', icon: require('../assets/occasion-office.png') },
  { id: 'brunch', label: 'Brunch', icon: require('../assets/occasion-coffee.png') },
  { id: 'date', label: 'Date', icon: require('../assets/occasion-date.png') },
  { id: 'party', label: 'Party', icon: require('../assets/occasion-party.png') },
  { id: 'wedding', label: 'Wedding', icon: require('../assets/occasion-wedding.png') },
  { id: 'beach', label: 'Beach', icon: require('../assets/occasion-beach.png') },
  { id: 'event', label: 'Event', icon: require('../assets/occasion-event.png') },
  { id: 'travel', label: 'Travel', icon: require('../assets/occasion-travel.png') },
];

// Step 1 — mood tiles.
export const moods = [
  { id: 'confident', label: 'Confident', icon: require('../assets/occasion-date.png'), description: 'Bold, powerful and unstoppable' },
  { id: 'elegant', label: 'Elegant', icon: require('../assets/mood-elegant.png'), description: 'Timeless, classy and refined' },
  { id: 'playful', label: 'Playful', icon: require('../assets/mood-playful.png'), description: 'Fun, cute and lively' },
  { id: 'romantic', label: 'Romantic', icon: require('../assets/mood-romantic.png'), description: 'Dreamy, soft and charming' },
  { id: 'casual', label: 'Casual', icon: require('../assets/mood-casual.png'), description: 'Relaxed, effortless and cool' },
  { id: 'calm', label: 'Calm', icon: require('../assets/mood-calm.png'), description: 'Peaceful, minimal and serene' },
  { id: 'chic', label: 'Chic', icon: require('../assets/mood-chic.png'), description: 'Trendy, stylish and modern' },
  { id: 'surprise', label: 'Surprise Me', icon: require('../assets/mood-surprise.png'), description: 'Let AI pick the perfect vibe' },
];

// Step 1 — "Preference" card rows.
export const preferences = [
  { id: 'fit', label: 'Look and Fit', icon: require('../assets/pref-look-fit.png') },
  { id: 'color', label: 'Color Harmony & Details', icon: require('../assets/pref-color.png') },
];

// "Look & Fit" popup options. `none` is exclusive (clears the other picks).
export const fitOptions = [
  { id: 'regular', label: 'Regular', icon: require('../assets/fit-regular.png') },
  { id: 'fitted', label: 'Fitted', icon: require('../assets/fit-fitted.png') },
  { id: 'relaxed', label: 'Relaxed', icon: require('../assets/fit-relaxed.png') },
  { id: 'oversized', label: 'Oversized', icon: require('../assets/fit-oversized.png') },
  { id: 'flowy', label: 'flowy', icon: require('../assets/fit-flowy.png') },
  { id: 'none', label: 'No Preference', icon: require('../assets/fit-none.png') },
];

// "Color preference" popup options. `none` is exclusive.
export const colorOptions = [
  { id: 'pastels', label: 'Pastels', icon: require('../assets/color-pastels.png') },
  { id: 'neutral', label: 'Neutral', icon: require('../assets/color-neutral.png') },
  { id: 'bright', label: 'Bright colors', icon: require('../assets/color-bright.png') },
  { id: 'dark', label: 'Dark shades', icon: require('../assets/color-dark.png') },
  { id: 'earth', label: 'Earth tones', icon: require('../assets/color-earth.png') },
  { id: 'none', label: 'No preference', icon: require('../assets/color-none.png') },
];

// Step 2 — pieces picked from the user's wardrobe. Dummy for now: the AI will
// return these from the backend (any number of items).
export const wardrobePicks = [
  { id: 'yellow-top', name: 'Yellow puff-sleeve top', image: require('../assets/pick-top-yellow.png') },
  { id: 'wide-jeans', name: 'Light wide-leg jeans', image: require('../assets/pick-jeans-wide.png') },
  { id: 'white-sneakers', name: 'White sneakers', image: require('../assets/pick-sneakers-white.png') },
  { id: 'cream-bag', name: 'Cream handbag', image: require('../assets/pick-bag-cream.png') },
];

// Step 3 — the outfit looks the AI built (dummy; the backend sends these later).
// `image` is the flat-lay photo of the whole look; `itemCount` the pieces in it.
export const outfitSummary = 'everyday relaxed'; // "... for everyday relaxed mood."
export const outfitLooks = [
  { id: 'everyday-ease', title: 'Everyday ease', subtitle: 'A simple comfy and stylish look using your favorite pieces', itemCount: 4, image: require('../assets/outfit-look-1.png') },
  { id: 'sunny-side', title: 'Sunny side', subtitle: 'Bright and easy pieces for a laid-back day out', itemCount: 4, image: require('../assets/outfit-look-1.png') },
  { id: 'weekend-breeze', title: 'Weekend breeze', subtitle: 'Light, relaxed and effortless for slow weekends', itemCount: 4, image: require('../assets/outfit-look-1.png') },
];

const initialState = {
  occasion: 'office',
  mood: 'confident',
  fits: [], // "Look & Fit" popup selections (none by default)
  colorPrefs: [], // "Color preference" popup selections (none by default)
  picks: wardrobePicks,
  looks: outfitLooks,
  savedLooks: [], // ids saved with "Save"
};

const aiWardrobeSlice = createSlice({
  name: 'aiWardrobe',
  initialState,
  reducers: {
    setOccasion(state, action) {
      state.occasion = action.payload;
    },
    setMood(state, action) {
      state.mood = action.payload;
    },
    setFits(state, action) {
      state.fits = action.payload;
    },
    setColorPrefs(state, action) {
      state.colorPrefs = action.payload;
    },
    // replace with the looks the AI built (from the backend later)
    setLooks(state, action) {
      state.looks = action.payload;
    },
    saveLook(state, action) {
      if (!state.savedLooks.includes(action.payload)) state.savedLooks.push(action.payload);
    },
    // replace with the pieces the AI picked (from the backend later)
    setPicks(state, action) {
      state.picks = action.payload;
    },
  },
});

export const { setOccasion, setMood, setFits, setColorPrefs, setPicks, setLooks, saveLook } = aiWardrobeSlice.actions;
export default aiWardrobeSlice.reducer;
