import React, { useEffect, useState } from "react";
import { useConfig } from "@dhis2/app-runtime";
import { useOptionSets } from "./hooks/useOptionSets";
import { useTrackerPrograms } from "./hooks/useTrackerPrograms";
import WarningMessage from "./components/WarningMessage";
import ExportButton from "./components/ExportButton";
import { validateCodes } from "./utils/codeValidation";
import { handleDownload } from "./utils/igDownload";
import { convertToFhirName, registerHelpers } from "./utils/handlebarsHelpers";
import {
  MultiSelect,
  MultiSelectOption,
  CircularLoader,
  NoticeBox,
} from "@dhis2/ui";
import Handlebars from "handlebars";
import classes from "./App.module.css";
import JSZipUtils from "jszip-utils";
import JSZip from "jszip";

const MyApp = () => {
  const { baseUrl } = useConfig();
  const [template, setTemplate] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [selectedProgramIds, setSelectedProgramIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [optionSets, setOptionSets] = useState([]);
  const [error, setError] = useState(null);
  const {
    programs,
    error: programsError,
    loading: programsLoading,
  } = useTrackerPrograms();

  useEffect(() => {
    registerHelpers();
    fetch("/assets/CodeSystem.fsh.handlebars")
      .then((response) => response.text())
      .then((template) => {
        setTemplate(template);
      })
      .catch((err) => {
        console.error("Error fetching template:", err);
        setError("Error fetching template");
      });
  }, []);

  useEffect(() => {
    if (selectedProgramIds.length > 0) {
      setLoading(true);
      setError(null);
      Promise.all(
        selectedProgramIds.map((id) =>
          fetch(`${baseUrl}/api/programs/${id}/optionSets`).then((response) =>
            response.json()
          )
        )
      )
        .then((responses) => {
          const combinedOptionSets = responses.flatMap(
            (response) => response.optionSets
          );
          setOptionSets(combinedOptionSets);
        })
        .catch((err) => {
          console.error("Error fetching option sets:", err);
          setError("Error fetching option sets");
        })
        .finally(() => setLoading(false));
    } else {
      setOptionSets([]);
    }
  }, [selectedProgramIds, baseUrl]);

  const exportMetadata = () => {
    JSZipUtils.getBinaryContent("/assets/ig.zip", function (err, templateIg) {
      if (err) throw err;

      JSZip.loadAsync(templateIg).then(function () {
        const igArchive = new JSZip();
        igArchive
          .loadAsync(templateIg)
          .then(function () {
            const compiledTemplate = Handlebars.compile(template);
            optionSets.forEach((optionSet) => {
              const fhirFileName = convertToFhirName(optionSet.name);
              igArchive.file(
                `input/fsh/codesystems/${fhirFileName}.fsh`,
                compiledTemplate(optionSet)
              );
            });
          })
          .then(function () {
            handleDownload(igArchive);
          });
      });
    });
  };

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
      <ExportButton onClick={exportMetadata} />
    </div>
  );
};

export default MyApp;
