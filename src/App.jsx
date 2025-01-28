import React, { useState } from "react";
import { RouterProvider } from "react-router-dom";
import createAppRouter from "./routes/AppRouter";

const App = () => {
  const [igConfig, setIgConfig] = useState({
    status: "draft",
    version: "0.1.0",
    releaseLabel: "ci-build",
  });

  const router = createAppRouter({ igConfig, setIgConfig });

  return <RouterProvider router={router} />;

};

export default App;
