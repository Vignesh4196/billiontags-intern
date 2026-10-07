import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import ProgressRing from '../../../components/ProgressRing';
import Button from '../../../components/Button';
import PermissionsIcon from '../../../components/icons/PermissionsIcon';
import { useJobProgress } from '../../../hooks/useJobProgress';
import { exportService } from '../../../services';
import { completeExport } from '../../../state/accountSlice';
import { formatShortDate } from '../../../utils/dateFormat';
import { selectedCategories } from './exportData';
import { colors, spacing, radius, fontFamily, typography } from '../../../theme';

const TOTAL_MINUTES = 18;
const EXPIRY_DAYS = 6;

export default function ExportProgressScreen({ navigation }) {
  const dataExport = useSelector((state) => state.account.dataExport);
  const dispatch = useDispatch();
  const categories = React.useMemo(() => selectedCategories(dataExport.categories), [dataExport.categories]);

  const { percent, cancel } = useJobProgress({
    start: () => exportService.createExport({ format: dataExport.format, categories: categories.map((category) => category.key) }),
    onComplete: (jobId) => {
      const now = new Date();
      const expires = new Date(now.getTime() + EXPIRY_DAYS * 24 * 60 * 60 * 1000);
      const stamp = `${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, '0')}_${String(now.getDate()).padStart(2, '0')}`;
      dispatch(completeExport({
        id: jobId,
        format: dataExport.format,
        fileName: `archive_${stamp}.${dataExport.format}`,
        size: `${(categories.length * 7.1).toFixed(1)} MB`,
        categoryTitles: categories.map((category) => category.title),
        created: formatShortDate(now),
        expires: formatShortDate(expires),
        expiresShort: formatShortDate(expires).slice(0, 6),
      }));
      navigation.replace('ExportReady');
    },
  });

  const minutesLeft = Math.max(1, Math.ceil(((100 - percent) / 100) * TOTAL_MINUTES));

  return (
    <View style={styles.container}>
      <ScreenHeader large titleStyle={typography.headerMedium} transparent title="Generating Export" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.ringWrap}>
          <ProgressRing percent={percent} />
        </View>
        <Text style={styles.status}>Preparing your data archive...</Text>
        <Text style={styles.remaining}>~{minutesLeft} {minutesLeft === 1 ? 'minute' : 'minutes'} remaining</Text>

        <SettingsCard noPadding radiusSize={radius.lg} style={styles.card}>
          {categories.map((category, index) => {
            const start = (index / categories.length) * 100;
            const end = ((index + 1) / categories.length) * 100;
            const done = percent >= end;
            const active = !done && percent >= start;
            const processed = Math.round(((percent - start) / (end - start)) * category.records);
            return (
              <View key={category.key} style={[styles.row, index < categories.length - 1 && styles.rowBorder]}>
                <View style={styles.flex}>
                  <Text style={styles.rowTitle}>{category.title}</Text>
                  <Text style={styles.rowDescription}>
                    {active ? `Processing ${processed.toLocaleString('en-US')} records` : category.shortDescription}
                  </Text>
                </View>
                {done ? (
                  <Feather name="check-circle" size={20} color={colors.toggleOn} />
                ) : active ? (
                  <PermissionsIcon size={22} color={colors.progressBlue} dots />
                ) : (
                  <Feather name="circle" size={18} color={colors.textSlate} />
                )}
              </View>
            );
          })}
        </SettingsCard>

        <Button
          title="Cancel Export"
          variant="dangerSoft"
          pill
          onPress={() => { cancel(); navigation.goBack(); }}
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
    paddingHorizontal: spacing.xl,
    paddingBottom: 40,
  },
  flex: {
    flex: 1,
  },
  ringWrap: {
    alignItems: 'center',
    marginTop: 35,
  },
  status: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    lineHeight: 21,
    color: colors.textStrong,
    textAlign: 'center',
    marginTop: 22,
  },
  remaining: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 17,
    color: colors.textSlate,
    textAlign: 'center',
    marginTop: 6,
  },
  card: {
    marginTop: 34,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
    paddingLeft: 14,
    paddingRight: 16,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderRow,
  },
  rowTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    lineHeight: 19,
    color: colors.textStrong,
  },
  rowDescription: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textSlate,
    marginTop: 3,
  },
  cancelButton: {
    height: 64,
    borderRadius: radius.pill,
    marginTop: 24,
    borderColor: colors.dangerBorder,
  },
  cancelText: {
    fontSize: 16,
    color: colors.errorText,
  },
});
