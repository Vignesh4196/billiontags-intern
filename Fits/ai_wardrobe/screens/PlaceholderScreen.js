import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StepHeader from '../components/StepHeader';
import Button from '../../../src/components/Button';
import { colors, fontFamily, spacing } from '../theme';

// Stand-in for AI Wardrobe steps not built yet.
export default function PlaceholderScreen({ navigation, route }) {
  const title = route?.params?.title || 'Coming soon';
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StepHeader onBack={() => navigation.goBack()} />
      <View style={styles.body}>
        <Text style={styles.emoji}>🚧</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>This AI Wardrobe screen hasn't been built yet.</Text>
      </View>
      <View style={styles.footer}>
        <Button title="Back" variant="outline" pill onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl },
  emoji: { fontSize: 48, marginBottom: spacing.lg },
  title: { fontFamily: fontFamily.bold, fontSize: 20, color: colors.textHeading, textAlign: 'center' },
  subtitle: { fontFamily: fontFamily.regular, fontSize: 14, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.sm },
  footer: { paddingHorizontal: spacing.xl, paddingBottom: spacing.sm },
});
