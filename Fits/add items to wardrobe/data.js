// Dummy data for the Add-to-wardrobe flow (no backend yet).
// `slot` + `crop` mirror the Figma placement/crop of each artwork inside its card's image area.
export const categories = [
  {
    id: 'tops', label: 'Tops',
    image: require('./assets/cat-tops-raw.png'),
    slot: { w: 98, h: 93, x: 2.5, y: 3.5 },
    crop: { w: 414.89, h: 289.27, x: -78.6, y: -84.46 },
  },
  { id: 'pants', label: 'Pants', image: require('./assets/cat-pants.png'), slot: { w: 52, h: 100, x: 26.5, y: 0 } },
  { id: 'dresses', label: 'Dresses', image: require('./assets/cat-dresses.png'), slot: { w: 81, h: 98, x: 12, y: 3 } },
  { id: 'skirts', label: 'Skirts', image: require('./assets/cat-skirts.png'), slot: { w: 83, h: 100, x: 10, y: 0 } },
  {
    id: 'jackets', label: 'Jackets',
    image: require('./assets/cat-jackets-raw.png'),
    slot: { w: 84, h: 98, x: 11, y: 3.5 },
    crop: { w: 100.99, h: 108.16, x: -1.08, y: -0.51 },
  },
  { id: 'shoes', label: 'Shoes', image: require('./assets/cat-shoes.png'), slot: { w: 106, h: 100, x: -1, y: 0 } },
  { id: 'bags', label: 'bags', image: require('./assets/cat-bags.png'), slot: { w: 98, h: 101, x: 4, y: 0 } },
  { id: 'accessories', label: 'Accessories', image: require('./assets/cat-accessories.png'), slot: { w: 104, h: 101, x: 1, y: 0 } },
  { id: 'others', label: 'Others', image: require('./assets/cat-others.png'), slot: { w: 90, h: 101, x: 7, y: 0 } },
];

export const colorOptions = [
  { name: 'Lavender', hex: '#C9A7E8' },
  { name: 'Black', hex: '#141414' },
  { name: 'White', hex: '#F3F3F3' },
  { name: 'Red', hex: '#E5484D' },
  { name: 'Blue', hex: '#3B82F6' },
  { name: 'Green', hex: '#22C55E' },
  { name: 'Beige', hex: '#E8D5B7' },
];
export const seasonOptions = ['All Seasons', 'Spring', 'Summer', 'Autumn', 'Winter'];
export const occasionOptions = ['Casual', 'Office', 'Party', 'Wedding', 'Travel', 'Date'];

// Shown when no photo was picked (design preview image).
export const sampleImage = require('./assets/sample-jacket.png');
