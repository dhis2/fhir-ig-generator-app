import React, { useState } from "react";
import TrackerProgramSelector from "../components/TrackerProgramSelector";
import { exportMetadata } from "../utils/exportMetadata";
import { useTrackerPrograms } from "../hooks/useTrackerPrograms";
import { useTemplates } from "../hooks/useTemplates";
import { NoticeBox, CircularLoader, Button } from "@dhis2/ui";
import classes from "./TrackerProgramSelectorPage.module.css";
import { useNavigate } from "react-router-dom";
import { useIgConfig } from "../contexts/IgConfigContext";
const TrackerProgramSelectorPage = () => {
    const { igConfig } = useIgConfig();
    const navigate = useNavigate();
    const [selectedProgramIds, setSelectedProgramIds] = useState([]);
    const { programs, error: programsError, loading } = useTrackerPrograms();
    const { templates, error: templatesError } = useTemplates();

    if (programsError || templatesError) {
        return (
            <NoticeBox title="Error" error>
                There was an error loading data.
            </NoticeBox>
        );
    }

    if (loading || !templates) {
        return (
            <div className={classes.centerWrapper}>
                <CircularLoader />
            </div>);
    }

    const selectedPrograms = programs.filter((program) =>
        selectedProgramIds.includes(program.id)
    );

    const handleDownloadClick = () => {
        exportMetadata(selectedPrograms, templates, igConfig);
    };

    return (
        <div className={classes.centerWrapper}>
            <div className={classes.container}>
                <h2 className={classes.title}>Tracker Program Selector</h2>
                <TrackerProgramSelector
                    programs={programs}
                    selectedProgramIds={selectedProgramIds}
                    setSelectedProgramIds={setSelectedProgramIds}
                />
                <div className={classes.buttonRow}>
                    <Button onClick={() => navigate("/")} secondary>
                        Previous
                    </Button>
                    <Button
                        primary
                        onClick={handleDownloadClick}
                        disabled={selectedPrograms.length === 0 || !templates}
                    >
                        Download FHIR IG
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TrackerProgramSelectorPage;