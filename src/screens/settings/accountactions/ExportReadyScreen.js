import React from 'react';
import { View, Text, ScrollView, StyleSheet, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import DetailRow from '../../../components/DetailRow';
import Button from '../../../components/Button';
import { CheckBadge } from '../../../components/FormControls';
import { downloadTextFile } from '../../../utils/download';
import { exportService } from '../../../services';
import { buildArchiveContent } from './exportData';
import { colors, spacing, radius, fontFamily, typography } from '../../../theme';

function DownloadIcon({ size, color }) {
  return <Feather name="download" size={size} color={color} />;
}

export default function ExportReadyScreen({ navigation }) {
  const archive = useSelector((state) => state.account.dataExport.lastExport);
  const myProfile = useSelector((state) => state.settings.myProfile);

  if (!archive) return null;

  const download = async () => {
    const { url } = await exportService.getDownloadUrl(archive.id);
    if (url) {
      Linking.openURL(url);
      return;
    }
    downloadTextFile(archive.fileName, buildArchiveContent(archive, myProfile), archive.format === 'csv' ? 'text/csv' : 'text/plain');
  };

  return (
    <View style={styles.container}>
      <ScreenHeader large titleStyle={typography.headerMedium} transparent title="Export Ready" onBack={() => navigation.popTo('DataExport')} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.center}>
          <CheckBadge size={72} iconSize={32} />
          <Text style={styles.title}>Your data export is ready</Text>
          <Text style={styles.subtitle}>Securely generate the archive onto your local system</Text>
        </View>

        <SettingsCard radiusSize={radius.md} style={styles.card}>
          <DetailRow label="Format" value={archive.format.toUpperCase()} />
          <DetailRow label="Size" value={archive.size} />
          <DetailRow label="Categories" value={archive.categoryTitles.join(',\n')} />
          <DetailRow label="Created" value={archive.created} />
        </SettingsCard>

        <Button
          title="Download Archive"
          variant="navy"
          pill
          IconComponent={DownloadIcon}
          onPress={download}
          style={styles.downloadButton}
          textStyle={styles.downloadText}
        />

        <View style={styles.note}>
          <Feather name="info" size={18} color={colors.errorText} />
          <Text style={styles.noteText}>
            This download link will expire on {archive.expires}. After expiration, you will need to generate a new export.
          </Text>
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
    paddingBottom: 40,
  },
  center: {
    alignItems: 'center',
    marginTop: 31,
  },
  title: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
    lineHeight: 23,
    color: colors.textStrong,
    marginTop: 20,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textBody,
    textAlign: 'center',
    marginTop: 8,
  },
  card: {
    marginTop: 34,
    paddingHorizontal: 18,
    paddingVertical: 17,
    gap: 12,
  },
  downloadButton: {
    height: 64,
    borderRadius: radius.pill,
    marginTop: 24,
  },
  downloadText: {
    fontSize: 18,
  },
  note: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 42,
    paddingHorizontal: 15,
  },
  noteText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 17,
    color: colors.textPrimary,
  },
});
