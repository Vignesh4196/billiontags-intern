import React from 'react';
import { View, Text, ScrollView, Animated, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../../src/components/ScreenHeader';
import CategoryCard from '../components/CategoryCard';
import CtaButton from '../components/CtaButton';
import PhotoSourceSheet from '../components/PhotoSourceSheet';
import { pickPhoto } from '../pickPhoto';
import { categories } from '../data';
import { colors, fontFamily } from '../../../src/theme';
import { wardrobeColors } from '../theme';

// Cards fade + rise in one after another when the screen opens.
function StaggerIn({ index, children, style }) {
  const v = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(v, { toValue: 1, duration: 320, delay: 60 * index, useNativeDriver: true }).start();
  }, [v, index]);
  return (
    <Animated.View style={[style, { opacity: v, transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }] }]}>
      {children}
    </Animated.View>
  );
}

// Three cards per row at any screen width (flex cells, not percentage widths).
const rows = [0, 3, 6].map((i) => categories.slice(i, i + 3));

export default function AddToWardrobeScreen({ navigation, route }) {
  const { width: windowWidth } = useWindowDimensions();
  const gap = windowWidth < 360 ? 12 : 16;
  const [selected, setSelected] = React.useState(null);
  const [sheetOpen, setSheetOpen] = React.useState(false);

  const goBack = () => (navigation.canGoBack() ? navigation.goBack() : navigation.getParent()?.goBack());

  const choose = async (source) => {
    setSheetOpen(false);
    const uri = await pickPhoto(source);
    if (uri) navigation.navigate('PhotoPreview', { category: selected, uri });
  };

  // "Add another item" from the success popup comes back here with a reset flag.
  React.useEffect(() => {
    if (route?.params?.reset) {
      setSelected(null);
      navigation.setParams({ reset: false });
    }
  }, [route?.params?.reset, navigation]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScreenHeader title="Add to wardrobe" onBack={goBack} large transparent />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.column}>
          <View style={styles.intro}>
            <Text style={styles.title}>Select Category</Text>
            <Text style={styles.subtitle}>What type of items are you adding?</Text>
          </View>
          <View style={[styles.grid, { gap }]}>
            {rows.map((row, r) => (
              <View key={r} style={[styles.row, { gap }]}>
                {row.map((item, c) => (
                  <StaggerIn key={item.id} index={r * 3 + c} style={styles.cell}>
                    <CategoryCard item={item} selected={selected === item.id} onPress={() => setSelected(item.id)} />
                  </StaggerIn>
                ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={[styles.column, styles.footer]}>
        <CtaButton title="Next" disabled={!selected} onPress={() => setSheetOpen(true)} />
      </View>
      <PhotoSourceSheet
        visible={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onCamera={() => choose('camera')}
        onAlbum={() => choose('album')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  scroll: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  // Content is full width on phones and capped + centred on tablets / wide browsers.
  column: { width: '100%', maxWidth: 600, alignSelf: 'center', paddingHorizontal: 20 },
  intro: { paddingVertical: 12, gap: 8 },
  title: { fontFamily: fontFamily.semiBold, fontSize: 20, color: colors.textPrimary },
  subtitle: { fontFamily: fontFamily.regular, fontSize: 14, color: wardrobeColors.hint },
  grid: { paddingTop: 4 },
  row: { flexDirection: 'row' },
  cell: { flex: 1, aspectRatio: 122.67 / 147 },
  footer: { paddingTop: 12, paddingBottom: 20 },
});
