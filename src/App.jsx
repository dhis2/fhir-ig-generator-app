import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { exportMetadata } from "./utils/exportMetadata";
import TrackerProgramSelector from "./components/TrackerProgramSelector.jsx";
import IGConfigForm from "./components/IGConfigForm.jsx";
import { useTrackerPrograms } from "./hooks/useTrackerPrograms";
import { useTemplates } from "./hooks/useTemplates";
import { NoticeBox, CircularLoader, Button } from "@dhis2/ui";
import classes from "./App.module.css";

const MyApp = () => {
  const navigate = useNavigate();
  const [selectedProgramIds, setSelectedProgramIds] = useState([]);
  const [igConfig, setIgConfig] = useState({
    id: "fhir.example",
    name: "Example IG",
    canonical: "http://example.org",
    status: "draft",
    version: "0.1.0",
    releaseLabel: "ci-build",
    publisher: {
      name: "DHIS2",
      url: "https://dhis2.org",
    },
  });
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

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <IGConfigForm igConfig={igConfig} setIgConfig={setIgConfig} />
          }
        />
        <Route
          path="/program-selector"
          element={
            <div className={classes.container}>
              <TrackerProgramSelector
                programs={programs}
                selectedProgramIds={selectedProgramIds}
                setSelectedProgramIds={setSelectedProgramIds}
              />
              <div className={classes.buttonRow}>
                <Button
                  onClick={() => navigate("/")}
                  secondary
                >
                  IG Configuration
                </Button>
                <Button
                  primary
                  onClick={() => exportMetadata(selectedPrograms, templates, igConfig)}
                  disabled={selectedPrograms.length === 0 || !igConfig || !templates}
                >
                  Download FHIR IG
                </Button>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default MyApp;
