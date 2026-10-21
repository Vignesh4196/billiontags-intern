import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroScreen from '../screens/IntroScreen';
import StyleSetupScreen from '../screens/StyleSetupScreen';
import WardrobePicksScreen from '../screens/WardrobePicksScreen';
import OutfitReadyScreen from '../screens/OutfitReadyScreen';
import PlaceholderScreen from '../screens/PlaceholderScreen';

const Stack = createNativeStackNavigator();

// AI Wardrobe ("Ara") flow: Intro -> StyleSetup (Step 1 of 3) -> WardrobePicks
// (Step 2 of 3) -> OutfitReady (Step 3 of 3).
export default function AIWardrobeNavigator() {
  return (
    <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="StyleSetup" component={StyleSetupScreen} />
      <Stack.Screen name="WardrobePicks" component={WardrobePicksScreen} />
      <Stack.Screen name="OutfitReady" component={OutfitReadyScreen} />
      <Stack.Screen name="Placeholder" component={PlaceholderScreen} />
    </Stack.Navigator>
  );
}
