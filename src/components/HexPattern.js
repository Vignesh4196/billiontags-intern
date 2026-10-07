import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

// Decorative honeycomb (Figma "Group 425") in the top-right corner of plan cards.
// Five hexagons, each filled with a vertical gradient from `topColor` to `bottomColor`
// at a low opacity, so they read as a faint tint over the card.
const HEXES = [
  { id: 0, d: 'M49.7014 -30.5363C50.9141 -31.2141 52.3915 -31.2141 53.6042 -30.5363L94.3368 -7.77185C95.6017 -7.06493 96.3854 -5.7292 96.3854 -4.28016V41.0262C96.3854 42.4753 95.6017 43.811 94.3368 44.5179L53.6042 67.2824C52.3915 67.9602 50.9141 67.9602 49.7014 67.2824L8.96874 44.5179C7.70383 43.811 6.92016 42.4753 6.92016 41.0263V-4.28015C6.92016 -5.72919 7.70383 -7.06493 8.96874 -7.77185L49.7014 -30.5363Z', y0: -31.627, y1: 68.373 },
  { id: 1, d: 'M99.2893 51.4637C100.502 50.7859 101.979 50.7859 103.192 51.4637L143.925 74.2281C145.19 74.9351 145.973 76.2708 145.973 77.7198V123.026C145.973 124.475 145.19 125.811 143.925 126.518L103.192 149.282C101.979 149.96 100.502 149.96 99.2893 149.282L58.5566 126.518C57.2917 125.811 56.5081 124.475 56.5081 123.026V77.7198C56.5081 76.2708 57.2917 74.9351 58.5566 74.2281L99.2893 51.4637Z', y0: 50.373, y1: 150.373 },
  { id: 2, d: 'M196.397 51.4637C197.609 50.7859 199.087 50.7859 200.3 51.4637L241.032 74.2281C242.297 74.9351 243.081 76.2708 243.081 77.7198V123.026C243.081 124.475 242.297 125.811 241.032 126.518L200.3 149.282C199.087 149.96 197.609 149.96 196.397 149.282L155.664 126.518C154.399 125.811 153.615 124.475 153.615 123.026V77.7198C153.615 76.2708 154.399 74.9351 155.664 74.2281L196.397 51.4637Z', y0: 50.373, y1: 150.373 },
  { id: 3, d: 'M147.842 131.464C149.055 130.786 150.532 130.786 151.745 131.464L192.477 154.228C193.742 154.935 194.526 156.271 194.526 157.72V203.026C194.526 204.475 193.742 205.811 192.477 206.518L151.745 229.282C150.532 229.96 149.055 229.96 147.842 229.282L107.109 206.518C105.844 205.811 105.061 204.475 105.061 203.026V157.72C105.061 156.271 105.844 154.935 107.109 154.228L147.842 131.464Z', y0: 130.373, y1: 230.373 },
  { id: 4, d: 'M147.842 -30.5363C149.055 -31.2141 150.532 -31.2141 151.745 -30.5363L192.477 -7.77185C193.742 -7.06493 194.526 -5.7292 194.526 -4.28016V41.0262C194.526 42.4753 193.742 43.811 192.477 44.5179L151.745 67.2824C150.532 67.9602 149.055 67.9602 147.842 67.2824L107.109 44.5179C105.844 43.811 105.061 42.4753 105.061 41.0263V-4.28015C105.061 -5.72919 105.844 -7.06493 107.109 -7.77185L147.842 -30.5363Z', y0: -31.627, y1: 68.373 },
];

export default function HexPattern({
  topColor = '#FFD600',
  bottomColor = '#000000',
  hexOpacity = 0.1,
  opacity = 1,
  width = 210,
  height = 257,
  top = 0,
  right = 0,
  clip = false,
}) {
  // Unique gradient ids per colour pair so two instances can't collide.
  const key = `${topColor}-${bottomColor}`.replace(/[^a-zA-Z0-9]/g, '');

  return (
    <View style={[styles.wrap, { width, height, top, right, opacity }, clip && styles.clip]} pointerEvents="none">
      <Svg width={width} height={height} viewBox="0 0 170 208">
        <Defs>
          {HEXES.map((hexagon) => (
            <LinearGradient key={hexagon.id} id={`hex-${key}-${hexagon.id}`} x1="0" y1={hexagon.y0} x2="0" y2={hexagon.y1} gradientUnits="userSpaceOnUse">
              <Stop offset="0" stopColor={topColor} />
              <Stop offset="1" stopColor={bottomColor} />
            </LinearGradient>
          ))}
        </Defs>
        {HEXES.map((hexagon) => (
          <Path key={hexagon.id} d={hexagon.d} fill={`url(#hex-${key}-${hexagon.id})`} fillOpacity={hexOpacity} />
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
  },
  clip: {
    overflow: 'hidden',
  },
});
