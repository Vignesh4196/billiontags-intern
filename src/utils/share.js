import { Share, Platform } from 'react-native';
import * as Clipboard from 'expo-clipboard';

// Opens the system share sheet. On web it uses navigator.share when the
// browser has it, otherwise copies the message to the clipboard.
export async function shareMessage(message) {
  if (Platform.OS !== 'web') {
    return Share.share({ message });
  }
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({ text: message });
    } catch (e) {
      // User closed the share sheet.
    }
    return;
  }
  await Clipboard.setStringAsync(message);
  window.alert('Link copied to clipboard');
}
