import React, { useEffect, useState } from "react";
import { fetchCodeSystemTemplate, fetchOptionSets } from "./utils/fetchData";
import { exportMetadata } from "./utils/exportMetadata";
import  TrackerProgramSelector  from "./components/TrackerProgramSelector";
import { useTrackerPrograms } from "./hooks/useTrackerPrograms";
import ExportButton from "./components/ExportButton";
import { NoticeBox, CircularLoader } from "@dhis2/ui";
import { useConfig } from "@dhis2/app-runtime";
import classes from "./App.module.css";

const MyApp = () => {
  const [template, setTemplate] = useState("");
  const [selectedProgramIds, setSelectedProgramIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [optionSets, setOptionSets] = useState([]);
  const [error, setError] = useState(null);
  const {
    programs,
    error: programsError,
    loading: programsLoading,
  } = useTrackerPrograms();
  const {baseUrl} = useConfig();

  useEffect(() => {
    fetchCodeSystemTemplate().then(setTemplate).catch(setError);
  }, []);

  useEffect(() => {
    if (selectedProgramIds.length > 0) {
      setLoading(true);
      setError(null);

      fetchOptionSets(selectedProgramIds, baseUrl)
        .then((optionSets) => {
          setOptionSets(optionSets);
        })
        .catch((err) => {
          console.error(err);
          setError(err.message);
        })
        .finally(() => setLoading(false));
    } else {
      setOptionSets([]);
    }
  }, [selectedProgramIds]);

  if (programsError) {
    console.error("Error fetching programs:", programsError);
    return (
      <NoticeBox title="Error" error>
        There was an error fetching the tracker programs.
      </NoticeBox>
    );
  }
  if (programsLoading || loading) return <CircularLoader />;

  return (
    <div className={classes.container}>
            <TrackerProgramSelector
                programs={programs}
                selectedProgramIds={selectedProgramIds}
                setSelectedProgramIds={setSelectedProgramIds}
            />
            <ExportButton onClick={() => exportMetadata(template, optionSets)} />
        </div>
      
  );
};

export default MyApp;
