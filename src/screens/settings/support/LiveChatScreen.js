import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import ChatBubble from '../../../components/ChatBubble';
import { appendChatMessage } from '../../../state/supportSlice';
import { colors, spacing, radius, typography, fontFamily } from '../../../theme';

export default function LiveChatScreen({ navigation }) {
  const liveChat = useSelector((state) => state.support.liveChat);
  const dispatch = useDispatch();
  const [draft, setDraft] = React.useState('');
  const scrollRef = React.useRef(null);

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;
    dispatch(appendChatMessage({ text }));
    setDraft('');
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Live chat" onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <SettingsCard style={styles.agentCard}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatarFallback}>
              <Text style={styles.avatarFallbackText}>S</Text>
            </View>
            {liveChat.agent.online && <View style={styles.onlineDot} />}
          </View>
          <View style={styles.agentTextCol}>
            <Text style={styles.agentName}>
              {liveChat.agent.name} {liveChat.agent.role}
            </Text>
            <Text style={styles.agentStatus}>{liveChat.agent.status}</Text>
          </View>
        </SettingsCard>

        <ScrollView
          ref={scrollRef}
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          <Text style={styles.dayLabel}>{liveChat.todayLabel}</Text>

          {liveChat.messages.map((message) =>
            message.sender === 'agent' ? (
              <ChatBubble
                key={message.id}
                text={message.text}
                time={message.time}
                side="left"
                variant="light"
                avatarLabel="S"
              />
            ) : (
              <ChatBubble
                key={message.id}
                text={message.text}
                time={message.time}
                side="right"
                variant="dark"
                avatarLabel="Me"
              />
            )
          )}
        </ScrollView>

        <View style={styles.composerBar}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Type your message here..."
            placeholderTextColor={colors.tabInactive}
            style={styles.composerInput}
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />
          <Ionicons name="attach-outline" size={20} color={colors.tabInactive} />
        </View>
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
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  agentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  avatarWrap: {
    width: 44,
    height: 44,
  },
  avatarFallback: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.iconBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarFallbackText: {
    ...typography.heading3,
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.textSecondary,
  },
  onlineDot: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: colors.white,
  },
  agentTextCol: {
    flex: 1,
  },
  agentName: {
    ...typography.heading3,
    fontFamily: fontFamily.bold,
    fontSize: 15,
  },
  agentStatus: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.lg,
  },
  dayLabel: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  composerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: spacing.md,
  },
  composerInput: {
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
