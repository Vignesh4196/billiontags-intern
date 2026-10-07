import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import StatusBadge from '../../../components/StatusBadge';
import { colors, spacing, typography, fontFamily } from '../../../theme';

export default function MyTicketsScreen({ navigation }) {
  const tickets = useSelector((state) => state.support.tickets);
  const [query, setQuery] = React.useState('');

  const filtered = tickets.filter((t) => t.title.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <View style={styles.container}>
      <ScreenHeader title="My tickets" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Input
          iconName="search"
          placeholder="Search active tickets..."
          value={query}
          onChangeText={setQuery}
          style={styles.search}
        />

        {filtered.map((ticket) => (
          <TouchableOpacity
            key={ticket.id}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('TicketDetail', { ticketId: ticket.id })}
          >
            <SettingsCard style={styles.ticketCard}>
              <View style={styles.ticketHeader}>
                <Text style={styles.ticketId}>ID #{ticket.id}</Text>
                <StatusBadge status={ticket.status} />
              </View>
              <Text style={styles.ticketTitle}>{ticket.title}</Text>
              <Text style={styles.ticketDescription} numberOfLines={1}>
                {ticket.description}
              </Text>
              <Text style={styles.ticketMeta}>{ticket.lastUpdatedLabel}</Text>
            </SettingsCard>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.bottomBar}>
        <Button title="Submit new ticket" variant="primary" pill onPress={() => navigation.navigate('NewTicket')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceMuted,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  search: {
    marginBottom: spacing.lg,
  },
  ticketCard: {
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  ticketId: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 12,
  },
  ticketTitle: {
    ...typography.heading3,
    fontFamily: fontFamily.bold,
    fontSize: 15,
  },
  ticketDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 13,
  },
  ticketMeta: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 11,
    marginTop: spacing.xs,
  },
  bottomBar: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: 34,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
