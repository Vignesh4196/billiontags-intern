import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import StatusBadge from '../../../components/StatusBadge';
import ChatBubble from '../../../components/ChatBubble';
import { appendTicketMessage } from '../../../state/supportSlice';
import { colors, spacing, typography, fontFamily } from '../../../theme';

export default function TicketDetailScreen({ navigation, route }) {
  const tickets = useSelector((state) => state.support.tickets);
  const dispatch = useDispatch();
  const ticketId = route?.params?.ticketId;
  const ticket = tickets.find((t) => t.id === ticketId) || tickets[0];
  const [draft, setDraft] = React.useState('');

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;
    dispatch(appendTicketMessage({ ticketId: ticket.id, text }));
    setDraft('');
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Ticket detail" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <SettingsCard style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Text style={styles.infoId}>ID #{ticket.id}</Text>
            <StatusBadge status={ticket.status} />
          </View>
          <Text style={styles.infoTitle}>{ticket.title}</Text>
          <Text style={styles.infoMeta}>
            Submitted on {ticket.submittedLabel} • category: {ticket.category}
          </Text>
        </SettingsCard>

        <View style={styles.thread}>
          {ticket.thread.map((message) =>
            message.sender === 'user' ? (
              <ChatBubble
                key={message.id}
                text={message.text}
                time={message.time}
                side="left"
                variant="light"
                avatarLabel="ME"
              />
            ) : (
              <ChatBubble
                key={message.id}
                text={message.text}
                time={message.time}
                side="right"
                variant="dark"
                avatarLabel="A"
              />
            )
          )}
        </View>
      </ScrollView>

      <View style={styles.replyBar}>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder="Type a reply..."
          placeholderTextColor={colors.tabInactive}
          style={styles.replyInput}
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
        <Ionicons name="mic-outline" size={20} color={colors.tabInactive} />
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
  infoCard: {
    marginBottom: spacing.xl,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  infoId: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 12,
  },
  infoTitle: {
    ...typography.heading3,
    fontFamily: fontFamily.bold,
    fontSize: 16,
  },
  infoMeta: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 12,
    marginTop: spacing.xs,
  },
  thread: {
    paddingTop: spacing.md,
  },
  replyBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: 34,
  },
  replyInput: {
    flex: 1,
    ...typography.body,
    fontSize: 14,
    color: colors.textPrimary,
    backgroundColor: colors.surfaceMuted,
    borderRadius: 30,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
});
