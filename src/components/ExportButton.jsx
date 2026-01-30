import React from 'react';
import { Button } from '@dhis2/ui';
import i18n from '@dhis2/d2-i18n';

const ExportButton = ({ onClick }) => (
    <Button primary onClick={onClick} disabled={programMetadata.length == 0}>{i18n.t('Download FHIR IG')}</Button>
);

export default ExportButton;