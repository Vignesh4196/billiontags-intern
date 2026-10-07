import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainSettingsScreen from '../screens/settings/profile/MainSettingsScreen';
import MyProfileScreen from '../screens/settings/profile/MyProfileScreen';
import PartnerProfileScreen from '../screens/settings/profile/PartnerProfileScreen';
import PartnerSettingsScreen from '../screens/settings/profile/PartnerSettingsScreen';
import LogoutConfirmScreen from '../screens/settings/profile/LogoutConfirmScreen';
import LogoutSuccessScreen from '../screens/settings/profile/LogoutSuccessScreen';
import OurSpaceScreen from '../screens/settings/ourspace/OurSpaceScreen';
import InvitePartnerScreen from '../screens/settings/ourspace/InvitePartnerScreen';
import InvitationPendingScreen from '../screens/settings/ourspace/InvitationPendingScreen';
import ConnectionSuccessScreen from '../screens/settings/ourspace/ConnectionSuccessScreen';
import AppSettingsScreen from '../screens/settings/appsettings/AppSettingsScreen';
import LanguageScreen from '../screens/settings/appsettings/LanguageScreen';
import LanguageChangeConfirmScreen from '../screens/settings/appsettings/LanguageChangeConfirmScreen';
import PermissionsScreen from '../screens/settings/appsettings/PermissionsScreen';
import AppLockScreen from '../screens/settings/appsettings/AppLockScreen';
import HelpSupportScreen from '../screens/settings/support/HelpSupportScreen';
import CommonFaqsScreen from '../screens/settings/support/CommonFaqsScreen';
import FaqArticleScreen from '../screens/settings/support/FaqArticleScreen';
import MyTicketsScreen from '../screens/settings/support/MyTicketsScreen';
import NewTicketScreen from '../screens/settings/support/NewTicketScreen';
import TicketDetailScreen from '../screens/settings/support/TicketDetailScreen';
import LiveChatScreen from '../screens/settings/support/LiveChatScreen';
import AccountActionsScreen from '../screens/settings/accountactions/AccountActionsScreen';
import SystemBackupScreen from '../screens/settings/accountactions/SystemBackupScreen';
import BackupProgressScreen from '../screens/settings/accountactions/BackupProgressScreen';
import BackupCompleteScreen from '../screens/settings/accountactions/BackupCompleteScreen';
import RestoreBackupScreen from '../screens/settings/accountactions/RestoreBackupScreen';
import DataExportScreen from '../screens/settings/accountactions/DataExportScreen';
import ExportProgressScreen from '../screens/settings/accountactions/ExportProgressScreen';
import ExportReadyScreen from '../screens/settings/accountactions/ExportReadyScreen';
import DeactivateWorkspaceScreen from '../screens/settings/accountactions/DeactivateWorkspaceScreen';
import WorkspaceDeactivatedScreen from '../screens/settings/accountactions/WorkspaceDeactivatedScreen';
import WorkspaceSuspendedScreen from '../screens/settings/accountactions/WorkspaceSuspendedScreen';
import SuspensionFailedScreen from '../screens/settings/accountactions/SuspensionFailedScreen';
import DeleteAccountScreen from '../screens/settings/accountactions/DeleteAccountScreen';
import DeleteVerifyCodeScreen from '../screens/settings/accountactions/DeleteVerifyCodeScreen';
import ConfirmDeletionScreen from '../screens/settings/accountactions/ConfirmDeletionScreen';
import AccountDeletedScreen from '../screens/settings/accountactions/AccountDeletedScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SubscriptionScreen from '../screens/settings/subscription/SubscriptionScreen';
import PlanDetailsScreen from '../screens/settings/subscription/PlanDetailsScreen';
import DisconnectWarningScreen from '../screens/settings/disconnect/DisconnectWarningScreen';
import DisconnectVerifyScreen from '../screens/settings/disconnect/DisconnectVerifyScreen';
import DeleteSyncDataScreen from '../screens/settings/disconnect/DeleteSyncDataScreen';
import SpaceDisconnectedScreen from '../screens/settings/disconnect/SpaceDisconnectedScreen';
import NotificationsScreen from '../screens/settings/notifications/NotificationsScreen';
import TermsOfServiceScreen from '../screens/settings/legal/TermsOfServiceScreen';
import PrivacyPolicyScreen from '../screens/settings/legal/PrivacyPolicyScreen';
import PlaceholderScreen from '../screens/settings/PlaceholderScreen';

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
      <Stack.Screen name="PartnerProfile" component={PartnerProfileScreen} />
      <Stack.Screen name="PartnerSettings" component={PartnerSettingsScreen} />
      <Stack.Screen name="LogoutConfirm" component={LogoutConfirmScreen} />
      <Stack.Screen name="LogoutSuccess" component={LogoutSuccessScreen} />

      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen
        name="Privacy"
        component={PlaceholderScreen}
        initialParams={{ title: 'Privacy' }}
        options={{ headerShown: true, title: 'Privacy' }}
      />
      <Stack.Screen name="AppSettings" component={AppSettingsScreen} />
      <Stack.Screen name="Language" component={LanguageScreen} />
      <Stack.Screen name="LanguageChangeConfirm" component={LanguageChangeConfirmScreen} />
      <Stack.Screen name="Permissions" component={PermissionsScreen} />
      <Stack.Screen name="AppLock" component={AppLockScreen} />
      <Stack.Screen name="AccountActions" component={AccountActionsScreen} />
      <Stack.Screen name="SystemBackup" component={SystemBackupScreen} />
      <Stack.Screen name="BackupProgress" component={BackupProgressScreen} />
      <Stack.Screen name="BackupComplete" component={BackupCompleteScreen} />
      <Stack.Screen name="RestoreBackup" component={RestoreBackupScreen} />
      <Stack.Screen name="DataExport" component={DataExportScreen} />
      <Stack.Screen name="ExportProgress" component={ExportProgressScreen} />
      <Stack.Screen name="ExportReady" component={ExportReadyScreen} />
      <Stack.Screen name="DeactivateWorkspace" component={DeactivateWorkspaceScreen} />
      <Stack.Screen name="WorkspaceDeactivated" component={WorkspaceDeactivatedScreen} />
      <Stack.Screen name="WorkspaceSuspended" component={WorkspaceSuspendedScreen} />
      <Stack.Screen name="SuspensionFailed" component={SuspensionFailedScreen} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
      <Stack.Screen name="DeleteVerifyCode" component={DeleteVerifyCodeScreen} />
      <Stack.Screen name="ConfirmDeletion" component={ConfirmDeletionScreen} />
      <Stack.Screen name="AccountDeleted" component={AccountDeletedScreen} />
      <Stack.Screen name="Support" component={HelpSupportScreen} />
      <Stack.Screen name="CommonFaqs" component={CommonFaqsScreen} />
      <Stack.Screen name="FaqArticle" component={FaqArticleScreen} />
      <Stack.Screen name="MyTickets" component={MyTicketsScreen} />
      <Stack.Screen name="NewTicket" component={NewTicketScreen} />
      <Stack.Screen name="TicketDetail" component={TicketDetailScreen} />
      <Stack.Screen name="LiveChat" component={LiveChatScreen} />
      <Stack.Screen name="OurSpace" component={OurSpaceScreen} />
      <Stack.Screen name="InvitePartner" component={InvitePartnerScreen} />
      <Stack.Screen name="InvitationPending" component={InvitationPendingScreen} />
      <Stack.Screen name="ConnectionSuccess" component={ConnectionSuccessScreen} />
      <Stack.Screen name="Subscription" component={SubscriptionScreen} />
      <Stack.Screen name="PlanDetails" component={PlanDetailsScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} />
      <Stack.Screen name="DisconnectWarning" component={DisconnectWarningScreen} />
      <Stack.Screen name="DisconnectVerify" component={DisconnectVerifyScreen} />
      <Stack.Screen name="DeleteSyncData" component={DeleteSyncDataScreen} />
      <Stack.Screen name="SpaceDisconnected" component={SpaceDisconnectedScreen} />
    </Stack.Navigator>
  );
}
