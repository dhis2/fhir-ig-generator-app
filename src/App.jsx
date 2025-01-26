import React, { useState } from "react";
import { RouterProvider } from "react-router-dom";
import createAppRouter from "./routes/AppRouter";

const App = () => {
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

  const router = createAppRouter({ igConfig, setIgConfig });

  return <RouterProvider router={router} />;

};

export default App;
