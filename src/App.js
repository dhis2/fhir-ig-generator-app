import React, { useEffect, useState } from "react";
import { fetchTemplate } from "./utils/fetchData";
import { exportMetadata } from "./utils/exportMetadata";
import TrackerProgramSelector from "./components/TrackerProgramSelector";
import IGConfigForm from "./components/IGConfigForm";
import { useTrackerPrograms } from "./hooks/useTrackerPrograms";
import { NoticeBox, CircularLoader, Button } from "@dhis2/ui";
import classes from "./App.module.css";

const MyApp = () => {
  const [templates, setTemplates] = useState({});
  const [selectedProgramIds, setSelectedProgramIds] = useState([]);
  const [igConfig, setIgConfig] = useState(null);
  const [error, setError] = useState(null);
  const { programs, error: programsError, loading } = useTrackerPrograms();

  useEffect(() => {
    const templateFiles = {
      programLogicalModelTemplate: "ProgramLogicalModel.fsh.handlebars",
      programStageLogicalModelTemplate:
        "ProgramStageLogicalModel.fsh.handlebars",
      codeSystemTemplate: "CodeSystem.fsh.handlebars",
      valueSetTemplate: "ValueSet.fsh.handlebars",
    };

    Object.entries(templateFiles).forEach(([key, templateName]) => {
      fetchTemplate(templateName)
        .then((templateContent) => {
          setTemplates((prevTemplates) => ({
            ...prevTemplates,
            [key]: templateContent,
          }));
        })
        .catch(setError);
    });
  }, []);

  if (programsError || error) {
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
  }

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
        disabled={selectedPrograms.length == 0 || !igConfig}
      >
        Download FHIR IG
      </Button>
    </div>
  );
};

export default MyApp;
