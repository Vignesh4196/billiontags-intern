import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ListCheckIcon from '../../../components/icons/ListCheckIcon';
import BinHalfIcon from '../../../components/icons/BinHalfIcon';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import Button from '../../../components/Button';
import { useDispatch } from 'react-redux';
import { partnerService } from '../../../services';
import { setPartnerConnected } from '../../../state/settingsSlice';
import { finishFlow } from '../../../navigation/helpers';
import { colors, spacing, radius, fontFamily, typography } from '../../../theme';

const SYNC_ITEMS = [
  { key: 'location', icon: 'format-list-bulleted', title: 'Shared Map coordinates & logs', description: 'All recorded realtime location history.' },
  { key: 'profile', icon: 'checks', title: 'Profile Bio and Pictures sync', description: 'Nicknames, status presets, and avatar files.' },
  { key: 'calendar', icon: 'format-list-bulleted', title: 'Co-space shared calendar items', description: 'Shared timelines, reminder schedules, and milestones.' },
];

export default function DeleteSyncDataScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const [deleting, setDeleting] = React.useState(false);
  const confirmCode = route?.params?.confirmCode;

  // Back aborts the disconnect: nothing was disconnected yet, so return to the screen that started it.
  const abort = () => {
    const { routes } = navigation.getState();
    const start = routes.findIndex((r) => r.name === 'DisconnectWarning');
    if (start > 0) navigation.pop(routes.length - start);
    else navigation.goBack();
  };

  // The partner is only disconnected here, with or without wiping the shared data.
  const complete = async (dataDeleted) => {
    setDeleting(true);
    try {
      if (dataDeleted) await partnerService.deleteSyncData(SYNC_ITEMS.map((item) => item.key));
      await partnerService.disconnect(confirmCode);
      dispatch(setPartnerConnected(false));
      finishFlow(navigation, 'DisconnectWarning', 'SpaceDisconnected', { dataDeleted });
    } finally {
      setDeleting(false);
    }
  };
  const keepData = () => complete(false);
  const deleteData = () => complete(true);

  return (
    <View style={styles.container}>
      <ScreenHeader large transparent titleStyle={typography.headerMedium} title="Delete sync data" onBack={abort} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SettingsCard radiusSize={radius.xl} style={styles.warningCard}>
          <View style={styles.warningHeader}>
            <View style={styles.warningIcon}>
              <BinHalfIcon size={24} color={colors.dangerStrong} />
            </View>
            <View style={styles.flex}>
              <Text style={styles.warningTitle}>Irreversible Action</Text>
              <Text style={styles.warningSubtitle}>This will wipe shared databases on both paired devices.</Text>
            </View>
          </View>
          <Text style={styles.warningBody}>
            Confirming this will disconnect your synced active tracking, nickname configurations, and shared media assets instantly. You cannot undo this deletion.
          </Text>
        </SettingsCard>

        <Text style={styles.sectionLabel}>Items to be deleted from both devices:</Text>
        <SettingsCard noPadding radiusSize={radius.xl} style={styles.listCard}>
          {SYNC_ITEMS.map((item, index) => (
            <View key={item.key} style={[styles.itemRow, index < SYNC_ITEMS.length - 1 && styles.rowBorder]}>
              {item.icon === 'checks' ? (
                <ListCheckIcon size={22} color={colors.textMuted} />
              ) : (
                <MaterialCommunityIcons name={item.icon} size={22} color={colors.textMuted} />
              )}
              <View style={styles.flex}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
              </View>
            </View>
          ))}
        </SettingsCard>

        <TouchableOpacity style={styles.deleteButton} onPress={deleteData} disabled={deleting} activeOpacity={0.8} accessibilityRole="button">
          {deleting && <ActivityIndicator color={colors.white} />}
          <Text style={styles.deleteText}>{deleting ? 'Deleting…' : 'Delete sync data'}</Text>
        </TouchableOpacity>
        <Button
          title="Cancel, keep my data"
          variant="outline"
          pill
          disabled={deleting}
          onPress={keepData}
          style={styles.cancelButton}
          textStyle={styles.cancelText}
        />
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
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 32,
  },
  flex: {
    flex: 1,
  },
  warningCard: {
    paddingHorizontal: 22,
    paddingVertical: 22,
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  warningIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.deleteSoft,
    borderWidth: 1,
    borderColor: colors.dangerBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
    lineHeight: 23,
    color: colors.dangerStrong,
  },
  warningSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 17,
    color: colors.textMuted,
    marginTop: 2,
  },
  warningBody: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textMuted,
    marginTop: 12,
  },
  sectionLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.textPrimary,
    marginTop: 22,
    marginBottom: 14,
  },
  listCard: {
    overflow: 'hidden',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderRow,
  },
  itemTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  itemDescription: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textMuted,
    marginTop: 2,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    height: 64,
    borderRadius: radius.pill,
    backgroundColor: colors.errorText,
    marginTop: 22,
  },
  deleteText: {
    fontFamily: fontFamily.medium,
    fontSize: 18,
    color: colors.white,
  },
  cancelButton: {
    height: 64,
    borderRadius: radius.pill,
    marginTop: 12,
    shadowOpacity: 0,
    elevation: 0,
  },
  cancelText: {
    fontSize: 18,
  },
});
