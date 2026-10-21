import React from 'react';
import { View, Text, Image, ScrollView, Pressable, Animated, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../../src/components/ScreenHeader';
import OptionSheet from '../../../src/components/OptionSheet';
import Pill from '../components/Pill';
import RatingSlider from '../components/RatingSlider';
import CtaButton from '../components/CtaButton';
import ItemAddedPopup from '../components/ItemAddedPopup';
import { colorOptions, seasonOptions, occasionOptions } from '../data';
import { colors, fontFamily } from '../../../src/theme';

export default function ItemDetailsScreen({ navigation, route }) {
  const { uri } = route.params;
  const [name, setName] = React.useState('');
  const [color, setColor] = React.useState(colorOptions[0]);
  const [season, setSeason] = React.useState(seasonOptions[0]);
  const [occasion, setOccasion] = React.useState(occasionOptions[0]);
  const [rating, setRating] = React.useState(4);
  const [moreOpen, setMoreOpen] = React.useState(true);
  const [brand, setBrand] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [size, setSize] = React.useState('');
  const [material, setMaterial] = React.useState('');
  const [sheet, setSheet] = React.useState(null); // 'color' | 'season' | 'occasion'
  const [done, setDone] = React.useState(false);

  const chevron = React.useRef(new Animated.Value(1)).current;
  const reveal = React.useRef(new Animated.Value(1)).current;
  const toggleMore = () => {
    const open = !moreOpen;
    setMoreOpen(open);
    Animated.parallel([
      Animated.timing(chevron, { toValue: open ? 1 : 0, duration: 200, useNativeDriver: true }),
      Animated.timing(reveal, { toValue: open ? 1 : 0, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  const finish = (resetFlow) => {
    setDone(false);
    if (resetFlow) navigation.popToTop();
    else navigation.getParent()?.goBack();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScreenHeader title="" onBack={() => navigation.goBack()} large transparent />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.summary}>
          <Image source={typeof uri === 'string' ? { uri } : uri} style={styles.thumb} resizeMode="cover" />
          <View style={styles.summaryText}>
            <Text style={styles.summaryTitle}>Item details</Text>
            <Text style={styles.summarySub}>Add Some details about your item.</Text>
          </View>
        </View>
        <View style={styles.divider} />

        <Pill label="Name" value={name} onChangeText={setName} placeholder="eg. Riding jacket" style={styles.field} />

        <View style={[styles.row, styles.field]}>
          <Pill
            label="Color"
            value={color.name}
            onPress={() => setSheet('color')}
            leading={<View style={[styles.swatch, { backgroundColor: color.hex }]} />}
            style={styles.half}
          />
          <Pill label="Seasons" value={season} onPress={() => setSheet('season')} style={styles.half} />
        </View>

        <Pill label="Occasions" value={occasion} onPress={() => setSheet('occasion')} style={styles.field} />

        <View style={styles.field}>
          <RatingSlider value={rating} onChange={setRating} />
        </View>

        <Pressable onPress={toggleMore} style={styles.moreHead} accessibilityRole="button">
          <Text style={styles.moreTitle}>Add more details</Text>
          <Animated.View style={{ transform: [{ rotate: chevron.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '0deg'] }) }] }}>
            <Ionicons name="chevron-up" size={24} color={colors.textPrimary} />
          </Animated.View>
        </Pressable>
        {moreOpen && (
          <Animated.View style={[styles.more, { opacity: reveal, transform: [{ translateY: reveal.interpolate({ inputRange: [0, 1], outputRange: [-8, 0] }) }] }]}>
            <Pill value={brand} onChangeText={setBrand} placeholder="Enter brand name" />
            <Pill value={price} onChangeText={setPrice} placeholder="Enter the price" keyboardType="numeric" />
            <Pill value={size} onChangeText={setSize} placeholder="Enter the size" />
            <Pill value={material} onChangeText={setMaterial} placeholder="Material type" />
          </Animated.View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <CtaButton title="Upload item" onPress={() => setDone(true)} />
      </View>

      <OptionSheet
        visible={sheet === 'color'}
        title="Color"
        options={colorOptions.map((c) => c.name)}
        selected={color.name}
        onSelect={(n) => { setColor(colorOptions.find((c) => c.name === n)); setSheet(null); }}
        onClose={() => setSheet(null)}
      />
      <OptionSheet
        visible={sheet === 'season'}
        title="Seasons"
        options={seasonOptions}
        selected={season}
        onSelect={(v) => { setSeason(v); setSheet(null); }}
        onClose={() => setSheet(null)}
      />
      <OptionSheet
        visible={sheet === 'occasion'}
        title="Occasions"
        options={occasionOptions}
        selected={occasion}
        onSelect={(v) => { setOccasion(v); setSheet(null); }}
        onClose={() => setSheet(null)}
      />

      <ItemAddedPopup visible={done} onView={() => finish(false)} onAddAnother={() => finish(true)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  content: { paddingHorizontal: 20, paddingBottom: 16 },
  summary: { flexDirection: 'row', alignItems: 'flex-start', padding: 12 },
  thumb: { width: 100, height: 100, borderRadius: 16, backgroundColor: colors.surfaceMuted },
  summaryText: { marginLeft: 16, flex: 1, paddingTop: 0 },
  summaryTitle: { fontFamily: fontFamily.semiBold, fontSize: 18, lineHeight: 24, color: colors.textPrimary },
  summarySub: { marginTop: 8, fontFamily: fontFamily.regular, fontSize: 14, lineHeight: 24, color: colors.textSecondary },
  divider: { height: 1, backgroundColor: colors.borderDivider, marginBottom: 16 },
  field: { marginBottom: 16 },
  row: { flexDirection: 'row', gap: 16 },
  half: { flex: 1 },
  swatch: { width: 24, height: 24, borderRadius: 12, marginRight: 8 },
  moreHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 40, marginTop: 4, marginBottom: 12 },
  moreTitle: { fontFamily: fontFamily.semiBold, fontSize: 18, color: colors.textPrimary },
  more: { gap: 16 },
  footer: { paddingHorizontal: 10, paddingVertical: 10 },
});
