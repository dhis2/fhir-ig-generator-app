import React, { useState } from "react";
import IGConfigPage from "./pages/IGConfigPage"
import TrackerProgramSelectorPage from "./pages/TrackerProgramSelectorPage"

const MyApp = () => {
  const [currentPage, setCurrentPage] = useState("config");
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

  const handleFormSubmit = (values) => {
    setIgConfig(values);
    setCurrentPage("program-selector");
  }

  return (
    <div>
    {currentPage === "config" && (
      <IGConfigPage igConfig={igConfig} setIgConfig={handleFormSubmit} />
    )}
    {currentPage === "program-selector" && (
      <TrackerProgramSelectorPage
        igConfig={igConfig}
        onBack={() => setCurrentPage("config")}
      />
    )}
  </div>
);
};

export default MyApp;
