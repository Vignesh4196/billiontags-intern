import React from 'react';
import LegalDocument from '../../../components/LegalDocument';
import { PRIVACY_POLICY } from './legalContent';

export default function PrivacyPolicyScreen({ navigation }) {
  return <LegalDocument {...PRIVACY_POLICY} onBack={() => navigation.goBack()} />;
}
