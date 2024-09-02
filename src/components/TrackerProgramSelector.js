import React from "react";
import { MultiSelect, MultiSelectOption } from "@dhis2/ui";

function TrackerProgramSelector({
  programs,
  selectedProgramIds,
  setSelectedProgramIds,
}) {
  const handleSelectionChange = ({ selected }) => {
    if (JSON.stringify(selected) !== JSON.stringify(selectedProgramIds)) {
      setSelectedProgramIds(selected);
    }
  };

  return (
    <MultiSelect
      label="Select Tracker Programs"
      selected={selectedProgramIds}
      onChange={handleSelectionChange}
      placeholder="Select one or more programs"
    >
      {programs.length > 0 ? (
        programs.map((program) => (
          <MultiSelectOption
            key={program.id}
            value={program.id}
            label={program.displayName}
          />
        ))
      ) : (
        <MultiSelectOption disabled label="No programs available" />
      )}
    </MultiSelect>
  );
}

export default TrackerProgramSelector;
