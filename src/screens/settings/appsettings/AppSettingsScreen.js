import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import SettingsCard from '../../../components/SettingsCard';
import SettingsRow from '../../../components/SettingsRow';
import AppSettingsIcon from '../../../components/icons/AppSettingsIcon';
import PrivacyShieldIcon from '../../../components/icons/PrivacyShieldIcon';
import { colors, spacing, radius } from '../../../theme';

const rowProps = { chevronColor: colors.textPrimary, style: { paddingRight: 18, gap: 18 } };

export default function AppSettingsScreen({ navigation }) {
  const language = useSelector((state) => state.settings.language);
  const languageDisplay = language.current === 'English (US)' ? 'English' : language.current;
  const goTo = (screen) => () => navigation.navigate(screen);

  return (
    <View style={styles.container}>
      <ScreenHeader large title="App settings" onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <SettingsCard noPadding radiusSize={radius.xl} style={styles.card}>
          <SettingsRow iconName="globe-outline" title="Language" subtitle={languageDisplay} onPress={goTo('Language')} {...rowProps} />
          <SettingsRow IconComponent={PrivacyShieldIcon} title="Permissions" subtitle="Manage app permissions" onPress={goTo('Permissions')} {...rowProps} />
          <SettingsRow IconComponent={AppSettingsIcon} title="Account actions" subtitle="Logout, delete account and more" onPress={goTo('AccountActions')} {...rowProps} />
          <SettingsRow
            IconComponent={AppSettingsIcon}
            title="Support options"
            subtitle="Access help, manage your account, and more"
            onPress={goTo('Support')}
            showBorder={false}
            {...rowProps}
          />
        </SettingsCard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: 22,
  },
  card: {
    overflow: 'hidden',
  },
});
