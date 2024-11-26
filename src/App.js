import React, { useEffect, useState } from "react";
import { exportMetadata } from "./utils/exportMetadata";
import TrackerProgramSelector from "./components/TrackerProgramSelector";
import IGConfigForm from "./components/IGConfigForm";
import { useTrackerPrograms } from "./hooks/useTrackerPrograms";
import { NoticeBox, CircularLoader, Button } from "@dhis2/ui";
import classes from "./App.module.css";

const MyApp = () => {
  const [selectedProgramIds, setSelectedProgramIds] = useState([]);
  const [igConfig, setIgConfig] = useState(null);
  const [templates, setTemplates] = useState(null);
  const [error, setError] = useState(null);
  const { programs, error: programsError, loading } = useTrackerPrograms();
  
  const fetchTemplate = async (templateName) => {
    const response = await fetch(`${process.env.PUBLIC_URL}/assets/${templateName}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch template: ${templateName}`);
    }
    return await response.text();
};

useEffect(() => {
    const loadTemplates = async () => {
        try {
            const templates = {
                programLogicalModelTemplate: await fetchTemplate('ProgramLogicalModel.fsh.handlebars'),
                programStageLogicalModelTemplate: await fetchTemplate('ProgramStageLogicalModel.fsh.handlebars'),
                codeSystemTemplate: await fetchTemplate('CodeSystem.fsh.handlebars'),
                valueSetTemplate: await fetchTemplate('ValueSet.fsh.handlebars'),
            };
            setTemplates(templates);
        } catch (error) {
            console.error(error);
            setError(error);
        }
    };

    loadTemplates();
}, []);

  if (programsError) {
    console.error("Error fetching programs:", programsError || error);
    return (
      <NoticeBox title="Error" error>
        There was an error fetching the tracker programs.
      </NoticeBox>
    );
  }
  if (loading) return <CircularLoader />;

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
