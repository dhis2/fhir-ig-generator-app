import React, { useState } from "react";
import { exportMetadata } from "./utils/exportMetadata";
import TrackerProgramSelector from "./components/TrackerProgramSelector";
import IGConfigForm from "./components/IGConfigForm";
import { useTrackerPrograms } from "./hooks/useTrackerPrograms";
import { useTemplates } from "./hooks/useTemplates";
import { NoticeBox, CircularLoader, Button } from "@dhis2/ui";
import classes from "./App.module.css";

const MyApp = () => {
  const [selectedProgramIds, setSelectedProgramIds] = useState([]);
  const [igConfig, setIgConfig] = useState(null);
  const { programs, error: programsError, loading } = useTrackerPrograms();
  const { templates, error: templatesError } = useTemplates();
  
  if (programsError || templatesError) {
    console.error("Error: ", programsError || templatesError);
    return (
      <NoticeBox title="Error" error>
        There was an error loading data.
      </NoticeBox>
    );
  }
  
  if (loading || !templates) return <CircularLoader />;

  const selectedPrograms = programs.filter((program) =>
    selectedProgramIds.includes(program.id)
  );

  const handleIGConfigSubmit = (values) => {
    setIgConfig(values);
  };

  if (!igConfig) {
    return (
        <div className={classes.container}>
            <IGConfigForm onSubmit={handleIGConfigSubmit} />
        </div>
    );
}

  return (
    <div className={classes.container}>
      <TrackerProgramSelector
        programs={programs}
        selectedProgramIds={selectedProgramIds}
        setSelectedProgramIds={setSelectedProgramIds}
      />
      <Button
        primary
        onClick={() => exportMetadata(selectedPrograms, templates, igConfig)}
        disabled={selectedPrograms.length === 0 || !igConfig || !templates}
      >
        Download FHIR IG
      </Button>
    </div>
  );
};

export default MyApp;
