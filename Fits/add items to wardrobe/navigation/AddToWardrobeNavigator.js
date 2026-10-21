import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddToWardrobeScreen from '../screens/AddToWardrobeScreen';
import PhotoPreviewScreen from '../screens/PhotoPreviewScreen';
import ItemDetailsScreen from '../screens/ItemDetailsScreen';

const Stack = createNativeStackNavigator();

// Add items to wardrobe flow:
//   Category -> (Camera / Albam sheet) -> Photo preview -> Item details -> "Item Added" popup
export default function AddToWardrobeNavigator() {
  return (
    <Stack.Navigator initialRouteName="AddToWardrobeHome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AddToWardrobeHome" component={AddToWardrobeScreen} />
      <Stack.Screen name="PhotoPreview" component={PhotoPreviewScreen} />
      <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} />
    </Stack.Navigator>
  );
}
