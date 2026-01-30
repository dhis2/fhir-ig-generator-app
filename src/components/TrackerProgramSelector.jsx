import React from "react";
import { Transfer } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";

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
        label={i18n.t("Select Tracker Programs")}
        selected={selectedProgramIds}
        onChange={handleSelectionChange}
        options={options}
        leftHeader={i18n.t("Available Tracker Programs")}
        rightHeader={i18n.t("Selected Tracker Programs")}
        filterable
      />
    </div>
  );
}

export default TrackerProgramSelector;
