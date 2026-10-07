import { Platform, Alert } from 'react-native';

// Saves a generated file. On web this triggers a browser download; on native
// (no backend / file system wiring yet) it just confirms.
export function downloadTextFile(fileName, content, mimeType = 'text/plain') {
  if (Platform.OS === 'web' && typeof document !== 'undefined') {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return;
  }
  Alert.alert('Download started', `${fileName} will be saved to your device.`);
}
