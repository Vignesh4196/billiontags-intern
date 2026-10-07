import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import SettingsRow from '../../../components/SettingsRow';
import Input from '../../../components/Input';
import Chip from '../../../components/Chip';
import { colors, spacing } from '../../../theme';

const CATEGORIES = ['All', 'Account', 'Billing', 'Security'];

export default function CommonFaqsScreen({ navigation }) {
  const faqs = useSelector((state) => state.support.faqs);
  const [query, setQuery] = React.useState('');
  const [category, setCategory] = React.useState('All');

  const filtered = faqs.filter((faq) => {
    const matchesCategory = category === 'All' || faq.category === category;
    const matchesQuery = faq.question.toLowerCase().includes(query.trim().toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <View style={styles.container}>
      <ScreenHeader title="Common faqs" onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <Input
          iconName="search"
          placeholder="Search questions or keywords..."
          value={query}
          onChangeText={setQuery}
          style={styles.search}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}
        >
          {CATEGORIES.map((c) => (
            <Chip
              key={c}
              label={c}
              variant={category === c ? 'filled' : 'outline'}
              onPress={() => setCategory(c)}
            />
          ))}
        </ScrollView>

        <SettingsCard noPadding style={styles.card}>
          {filtered.length === 0 ? (
            <SettingsRow title="No matching questions" showChevron={false} noIcon showBorder={false} />
          ) : (
            filtered.map((faq, i) => (
              <SettingsRow
                key={faq.id}
                title={faq.question}
                noIcon
                showChevron={false}
                showBorder={i < filtered.length - 1}
                onPress={() => navigation.navigate('FaqArticle', { faqId: faq.id })}
              />
            ))
          )}
        </SettingsCard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceMuted,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  search: {
    marginBottom: spacing.lg,
  },
  chipRow: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  card: {
    overflow: 'hidden',
  },
});
