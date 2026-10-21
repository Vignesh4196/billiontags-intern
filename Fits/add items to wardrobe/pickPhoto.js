import { Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// Returns the picked image uri, or null if cancelled / denied. On web both options open the file chooser.
export async function pickPhoto(source) {
  const options = { mediaTypes: ['images'], allowsEditing: false, quality: 0.85 };
  if (source === 'camera' && Platform.OS !== 'web') {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Camera access needed', 'Allow camera access to take a photo of your item.');
      return null;
    }
    const result = await ImagePicker.launchCameraAsync(options);
    return result.canceled ? null : result.assets[0].uri;
  }
  if (Platform.OS !== 'web') {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Photo access needed', 'Allow photo library access to choose a photo of your item.');
      return null;
    }
  }
  const result = await ImagePicker.launchImageLibraryAsync(options);
  return result.canceled ? null : result.assets[0].uri;
}
