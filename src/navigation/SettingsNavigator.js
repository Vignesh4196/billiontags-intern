import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainSettingsScreen from '../screens/settings/profile/MainSettingsScreen';
import MyProfileScreen from '../screens/settings/profile/MyProfileScreen';
import EditProfileScreen from '../screens/settings/profile/EditProfileScreen';
import PartnerProfileScreen from '../screens/settings/profile/PartnerProfileScreen';
import EditPartnerProfileScreen from '../screens/settings/profile/EditPartnerProfileScreen';
import PartnerSettingsScreen from '../screens/settings/profile/PartnerSettingsScreen';
import InvitePartnerScreen from '../screens/settings/ourspace/InvitePartnerScreen';
import InvitationPendingScreen from '../screens/settings/ourspace/InvitationPendingScreen';
import ConnectionSuccessScreen from '../screens/settings/ourspace/ConnectionSuccessScreen';
import HelpSupportScreen from '../screens/settings/support/HelpSupportScreen';
import FaqArticleScreen from '../screens/settings/support/FaqArticleScreen';
import SystemBackupScreen from '../screens/settings/accountactions/SystemBackupScreen';
import BackupProgressScreen from '../screens/settings/accountactions/BackupProgressScreen';
import BackupCompleteScreen from '../screens/settings/accountactions/BackupCompleteScreen';
import RestoreBackupScreen from '../screens/settings/accountactions/RestoreBackupScreen';
import DataExportScreen from '../screens/settings/accountactions/DataExportScreen';
import ExportProgressScreen from '../screens/settings/accountactions/ExportProgressScreen';
import ExportReadyScreen from '../screens/settings/accountactions/ExportReadyScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SubscriptionScreen from '../screens/settings/subscription/SubscriptionScreen';
import PlanDetailsScreen from '../screens/settings/subscription/PlanDetailsScreen';
import DisconnectWarningScreen from '../screens/settings/disconnect/DisconnectWarningScreen';
import AddPartnerScreen from '../screens/settings/disconnect/AddPartnerScreen';
import TermsOfServiceScreen from '../screens/settings/legal/TermsOfServiceScreen';
import PrivacyPolicyScreen from '../screens/settings/legal/PrivacyPolicyScreen';

const Stack = createNativeStackNavigator();

export default function SettingsNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MainSettings"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MainSettings" component={MainSettingsScreen} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="MyProfile" component={MyProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ animation: 'slide_from_bottom' }} />
      <Stack.Screen name="PartnerProfile" component={PartnerProfileScreen} />
      <Stack.Screen name="EditPartnerProfile" component={EditPartnerProfileScreen} options={{ animation: 'slide_from_bottom' }} />
      <Stack.Screen name="PartnerSettings" component={PartnerSettingsScreen} />

      <Stack.Screen name="SystemBackup" component={SystemBackupScreen} />
      <Stack.Screen name="BackupProgress" component={BackupProgressScreen} />
      <Stack.Screen name="BackupComplete" component={BackupCompleteScreen} />
      <Stack.Screen name="RestoreBackup" component={RestoreBackupScreen} />
      <Stack.Screen name="DataExport" component={DataExportScreen} />
      <Stack.Screen name="ExportProgress" component={ExportProgressScreen} />
      <Stack.Screen name="ExportReady" component={ExportReadyScreen} />
      <Stack.Screen name="Support" component={HelpSupportScreen} />
      <Stack.Screen name="FaqArticle" component={FaqArticleScreen} />
      <Stack.Screen name="InvitePartner" component={InvitePartnerScreen} />
      <Stack.Screen name="InvitationPending" component={InvitationPendingScreen} />
      <Stack.Screen name="ConnectionSuccess" component={ConnectionSuccessScreen} />
      <Stack.Screen name="Subscription" component={SubscriptionScreen} />
      <Stack.Screen name="PlanDetails" component={PlanDetailsScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} />
      <Stack.Screen name="DisconnectWarning" component={DisconnectWarningScreen} />
      <Stack.Screen name="AddPartner" component={AddPartnerScreen} />
    </Stack.Navigator>
  );
}
