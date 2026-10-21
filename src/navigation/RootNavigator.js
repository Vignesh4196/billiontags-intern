import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsNavigator from './SettingsNavigator';
import AIWardrobeNavigator from '../../Fits/ai_wardrobe/navigation/AIWardrobeNavigator';

import AddToWardrobeNavigator from '../../Fits/add items to wardrobe/navigation/AddToWardrobeNavigator';

const Stack = createNativeStackNavigator();

// Root switch between the app's modules. Change `initialRouteName` to pick
// which module opens first while developing:
//   'Settings'   — the Settings module
//   'AIWardrobe' — the Fits > AI Wardrobe ("Ara") flow
//   'AddToWardrobe' — the Fits > Add items to wardrobe flow
const INITIAL_MODULE = 'Settings'; // 'Settings' | 'AIWardrobe' | 'AddToWardrobe'
export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName={INITIAL_MODULE} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={SettingsNavigator} />
      <Stack.Screen name="AIWardrobe" component={AIWardrobeNavigator} />
      <Stack.Screen name="AddToWardrobe" component={AddToWardrobeNavigator} />
    </Stack.Navigator>
  );
}
