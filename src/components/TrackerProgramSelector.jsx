import React from "react";
import PropTypes from "prop-types";
import { Transfer } from "@dhis2/ui";

function TrackerProgramSelector({
  programs,
  selectedProgramIds,
  setSelectedProgramIds,
}) {
  const handleSelectionChange = ({selected}) => {
      setSelectedProgramIds(Array.isArray(selected) ? selected : []);
  };

  const options = programs.map((program) => ({
    value: program.id,
    label: program.displayName,
  }));

  return (
    <div>
      <Transfer
      label="Select Tracker Programs"
      selected={selectedProgramIds}
      onChange={handleSelectionChange}
      options={options}
      leftHeader="Available Tracker Programs"
      rightHeader="Selected Tracker Programs"
      filterable
      />
    </div>
  );
}

TrackerProgramSelector.propTypes = {
  programs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired
    })
  ).isRequired,
  selectedProgramIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedProgramIds: PropTypes.func.isRequired
};

export default TrackerProgramSelector;
