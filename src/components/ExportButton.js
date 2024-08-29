import React from 'react';
import { Button } from '@dhis2/ui';

const ExportButton = ({ onClick }) => (
    <Button primary onClick={onClick}>Export FHIR IG</Button>
);

export default ExportButton;