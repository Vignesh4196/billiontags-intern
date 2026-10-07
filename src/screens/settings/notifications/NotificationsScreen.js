import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import Toggle from '../../../components/Toggle';
import { toggleNotification } from '../../../state/settingsSlice';
import { colors, spacing, radius, fontFamily, typography } from '../../../theme';

const SECTIONS = [
  {
    title: 'DIRECT ALERTS',
    rows: [
      { key: 'pushAlerts', title: 'Push Notifications', subtitle: 'Receive instant device system alerts' },
      { key: 'smsAlerts', title: 'SMS Alerts', subtitle: 'Security warnings and verification codes' },
    ],
  },
  {
    title: 'CONTENT & MARKETING',
    rows: [
      { key: 'marketingUpdates', title: 'Marketing Updates', subtitle: 'Special offers, products, and new services' },
      { key: 'appUpdates', title: 'App Updates', subtitle: 'Release notes and feature announcements' },
    ],
  },
];

function NotificationRow({ title, subtitle, value, onChange, showDivider }) {
  return (
    <View style={[styles.row, showDivider && styles.divider]}>
      <View style={styles.rowText}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowSubtitle}>{subtitle}</Text>
      </View>
      <Toggle value={value} onValueChange={onChange} />
    </View>
  );
}

export default function NotificationsScreen({ navigation }) {
  const notifications = useSelector((state) => state.settings.notifications);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <ScreenHeader large titleStyle={typography.headerMedium} title="Notifications" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* One card: both section labels sit inside it. Every row has a divider under it except the last. */}
        <SettingsCard noPadding radiusSize={radius.xl} style={styles.card}>
          {SECTIONS.map((section, sectionIndex) => (
            <View key={section.title}>
              <Text style={styles.sectionLabel}>{section.title}</Text>
              {section.rows.map((row, rowIndex) => {
                const isLastRow = sectionIndex === SECTIONS.length - 1 && rowIndex === section.rows.length - 1;
                return (
                  <NotificationRow
                    key={row.key}
                    title={row.title}
                    subtitle={row.subtitle}
                    value={notifications[row.key]}
                    onChange={() => dispatch(toggleNotification(row.key))}
                    showDivider={!isLastRow}
                  />
                );
              })}
            </View>
          ))}
        </SettingsCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenMuted,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: 2,
    paddingBottom: 40,
  },
  card: {
    overflow: 'hidden',
  },
  sectionLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    lineHeight: 16,
    color: colors.textSlate,
    paddingHorizontal: spacing.xl,
    paddingTop: 12,
    paddingBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    paddingHorizontal: spacing.xl,
    paddingTop: 12,
    paddingBottom: 11,
  },
  rowText: {
    flex: 1,
  },
  rowTitle: {
    fontFamily: fontFamily.medium,
    fontSize: 15,
    lineHeight: 21,
    color: colors.textStrong,
  },
  rowSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textSlate,
    marginTop: 1,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderDivider,
  },
});
