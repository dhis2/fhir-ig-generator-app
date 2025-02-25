import React from "react";
import { createHashRouter } from "react-router-dom";
import IGConfigPage from "../pages/IGConfigPage";
import TrackerProgramSelectorPage from "../pages/TrackerProgramSelectorPage";
import { Navigate } from "react-router-dom";

const createAppRouter = ({ igConfig, setIgConfig }) => {
    return createHashRouter([
        {
            path: "/",
            element: <Navigate to="/ig-config" replace />,
        },
        {
            path: "/ig-config",
            element: <IGConfigPage igConfig={igConfig} setIgConfig={setIgConfig} />,
        },
        {
            path: "/program-selector",
            element: <TrackerProgramSelectorPage igConfig={igConfig} />,
        },
    ]);
};

export default createAppRouter;