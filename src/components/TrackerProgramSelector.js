import React from "react";
import { MultiSelect, MultiSelectOption } from "@dhis2/ui";

const TrackerProgramSelector = ({ programs, selectedProgramIds, setSelectedProgramIds }) => (
    <MultiSelect
        label="Select Tracker Programs"
        selected={selectedProgramIds}
        onChange={({ selected }) => setSelectedProgramIds(selected)}
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

export default TrackerProgramSelector;