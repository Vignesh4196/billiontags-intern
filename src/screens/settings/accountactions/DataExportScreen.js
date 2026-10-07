import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import Button from '../../../components/Button';
import FileTypeIcon from '../../../components/icons/FileTypeIcon';
import { CheckBox } from '../../../components/FormControls';
import { setExportFormat, toggleExportCategory } from '../../../state/accountSlice';
import { downloadTextFile } from '../../../utils/download';
import { EXPORT_CATEGORIES } from './exportData';
import { colors, spacing, radius, fontFamily, shadow } from '../../../theme';

const FORMATS = ['csv', 'pdf'];

function RecentExport({ item, onDownload }) {
  return (
    <View style={[styles.recentCard, item.expired && styles.recentCardExpired]}>
      <View style={styles.flex}>
        <Text style={[styles.recentName, item.expired && styles.expiredText]}>{item.name}</Text>
        <View style={styles.recentMetaRow}>
          <Text style={[styles.recentMeta, item.expired && styles.expiredMeta]}>
            {item.size} • {item.expired ? 'Expired' : `Expires ${item.expires}`}
          </Text>
          <View style={styles.typeChip}>
            <Text style={[styles.typeChipText, item.expired && styles.expiredMeta]}>{item.type}</Text>
          </View>
        </View>
      </View>
      {item.expired ? (
        <Text style={styles.expiredAction}>Expired</Text>
      ) : (
        <TouchableOpacity onPress={onDownload} activeOpacity={0.6} accessibilityRole="button" accessibilityLabel={`Download ${item.name}`}>
          <Text style={styles.downloadAction}>Download</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default function DataExportScreen({ navigation }) {
  const dataExport = useSelector((state) => state.account.dataExport);
  const dispatch = useDispatch();
  const hasCategory = Object.values(dataExport.categories).some(Boolean);

  return (
    <View style={styles.container}>
      <ScreenHeader large transparent title="Data Export" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionLabel}>Export Format</Text>
        <View style={styles.segments}>
          {FORMATS.map((format) => {
            const selected = dataExport.format === format;
            const color = selected ? colors.white : colors.textPrimary;
            return (
              <TouchableOpacity
                key={format}
                style={[styles.segment, selected && styles.segmentSelected]}
                onPress={() => dispatch(setExportFormat(format))}
                activeOpacity={0.7}
                accessibilityRole="radio"
                accessibilityState={{ checked: selected }}
              >
                <FileTypeIcon label={format.toUpperCase()} color={color} />
                <Text style={[styles.segmentText, { color }]}>{format.toUpperCase()}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={[styles.sectionLabel, styles.sectionSpaced]}>Select Data Categories</Text>
        <SettingsCard noPadding radiusSize={radius.lg} style={styles.listCard}>
          {EXPORT_CATEGORIES.map(({ key, title, description }, index) => (
            <TouchableOpacity
              key={key}
              style={[styles.categoryRow, index < EXPORT_CATEGORIES.length - 1 && styles.rowBorder]}
              onPress={() => dispatch(toggleExportCategory(key))}
              activeOpacity={0.6}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: dataExport.categories[key] }}
            >
              <View style={styles.flex}>
                <Text style={styles.categoryTitle}>{title}</Text>
                <Text style={styles.categoryDescription}>{description}</Text>
              </View>
              <CheckBox checked={dataExport.categories[key]} size={20} />
            </TouchableOpacity>
          ))}
        </SettingsCard>

        <Button
          title="Generate Export Archive"
          pill
          disabled={!hasCategory}
          onPress={() => navigation.navigate('ExportProgress')}
          style={styles.generateButton}
          textStyle={styles.generateText}
        />

        <Text style={[styles.sectionLabel, styles.sectionSpaced]}>Recent Exports</Text>
        <View style={styles.recentList}>
          {dataExport.recent.map((item) => (
            <RecentExport
              key={item.id}
              item={item}
              onDownload={() => downloadTextFile(item.name, `SuperBae export ${item.name}`)}
            />
          ))}
        </View>
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
    paddingTop: 18,
    paddingBottom: 40,
  },
  flex: {
    flex: 1,
  },
  sectionLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textStrong,
    marginBottom: 10,
  },
  sectionSpaced: {
    marginTop: 24,
  },
  segments: {
    flexDirection: 'row',
    gap: 10,
  },
  segment: {
    flex: 1,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: colors.progressTrack,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  segmentSelected: {
    backgroundColor: colors.textPrimary,
    borderColor: colors.textPrimary,
  },
  segmentText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
  },
  listCard: {
    overflow: 'hidden',
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderRow,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
    paddingLeft: 14,
    paddingRight: 19,
  },
  categoryTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    lineHeight: 19,
    color: colors.textStrong,
  },
  categoryDescription: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textSlate,
    marginTop: 3,
  },
  generateButton: {
    height: 62,
    borderRadius: radius.pill,
    marginTop: 22,
  },
  generateText: {
    fontSize: 18,
  },
  recentList: {
    gap: 16,
  },
  recentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 67,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    paddingLeft: 16,
    paddingRight: 18,
    ...shadow.cardSoft,
  },
  recentCardExpired: {
    opacity: 0.55,
  },
  recentName: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    lineHeight: 19,
    color: colors.textStrong,
  },
  recentMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  recentMeta: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textSlate,
  },
  typeChip: {
    borderRadius: 4,
    backgroundColor: colors.progressTrack,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  typeChipText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 9,
    lineHeight: 13,
    color: colors.textBody,
  },
  downloadAction: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.toggleOn,
  },
  expiredText: {
    color: colors.textFaint,
  },
  expiredMeta: {
    color: colors.textFaint,
  },
  expiredAction: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.textFaint,
  },
});
