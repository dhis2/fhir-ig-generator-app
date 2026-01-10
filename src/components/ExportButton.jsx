import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@dhis2/ui';

const ExportButton = ({ onClick }) => (
    <Button primary onClick={onClick} disabled={programMetadata.length == 0}>Download FHIR IG</Button>
);

ExportButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default ExportButton;