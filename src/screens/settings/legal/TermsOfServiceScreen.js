import React from 'react';
import LegalDocument from '../../../components/LegalDocument';
import { TERMS_OF_SERVICE } from './legalContent';

export default function TermsOfServiceScreen({ navigation }) {
  return <LegalDocument {...TERMS_OF_SERVICE} onBack={() => navigation.goBack()} />;
}
