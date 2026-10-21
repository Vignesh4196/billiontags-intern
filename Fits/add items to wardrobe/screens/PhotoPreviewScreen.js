import React from 'react';
import { View, Image, Animated, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../../src/components/ScreenHeader';
import CtaButton from '../components/CtaButton';
import PhotoSourceSheet from '../components/PhotoSourceSheet';
import { pickPhoto } from '../pickPhoto';
import { colors } from '../../../src/theme';

export default function PhotoPreviewScreen({ navigation, route }) {
  const { category, uri } = route.params;
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const appear = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    appear.setValue(0);
    Animated.spring(appear, { toValue: 1, friction: 8, tension: 70, useNativeDriver: true }).start();
  }, [uri, appear]);

  const retake = async (source) => {
    setSheetOpen(false);
    const next = await pickPhoto(source);
    if (next) navigation.setParams({ uri: next });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScreenHeader title="Photo Preview" onBack={() => navigation.goBack()} large transparent />
      <View style={styles.body}>
        <Animated.View style={[styles.frame, { opacity: appear, transform: [{ scale: appear.interpolate({ inputRange: [0, 1], outputRange: [0.94, 1] }) }] }]}>
          <Image source={typeof uri === 'string' ? { uri } : uri} style={styles.image} resizeMode="cover" />
        </Animated.View>
      </View>
      <View style={styles.footer}>
        <CtaButton title="Retake" secondary onPress={() => setSheetOpen(true)} style={styles.retake} />
        <CtaButton title="Next" onPress={() => navigation.navigate('ItemDetails', { category, uri })} style={styles.next} />
      </View>
      <PhotoSourceSheet
        visible={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onCamera={() => retake('camera')}
        onAlbum={() => retake('album')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  body: { flex: 1, paddingHorizontal: 20, paddingTop: 12 },
  frame: { width: '100%', aspectRatio: 400 / 516, maxHeight: '100%', borderRadius: 24, overflow: 'hidden', backgroundColor: colors.surfaceMuted },
  image: { width: '100%', height: '100%' },
  footer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 20, gap: 10 },
  retake: { width: 91 },
  next: { flex: 1 },
});
