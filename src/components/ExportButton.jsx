import React from 'react';
import { Button } from '@dhis2/ui';

const ExportButton = ({ onClick }) => (
    <Button primary onClick={onClick} disabled={programMetadata.length == 0}>Download FHIR IG</Button>
);

export default ExportButton;