import React, { useMemo, useState } from "react";
import { RouterProvider } from "react-router-dom";
import createAppRouter from "./routes/AppRouter";
import { IgConfigProvider } from "./contexts/IgConfigContext";

const App = () => {
  const [igConfig, setIgConfig] = useState({
    status: "draft",
    version: "0.1.0",
    releaseLabel: "ci-build",
  });

  const router = createAppRouter({ igConfig, setIgConfig });

  return (
  <IgConfigProvider>
    <RouterProvider router={router} />
  </IgConfigProvider>
  );
};

export default App;
