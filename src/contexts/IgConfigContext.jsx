import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const IgConfigContext = createContext();

export const IgConfigProvider = ({ children }) => {
  const [igConfig, setIgConfig] = useState({
    status: "draft",
    version: "0.1.0",
    releaseLabel: "ci-build",
  });

  const value = React.useMemo(() => ({ igConfig, setIgConfig }), [igConfig, setIgConfig]);

  return (
    <IgConfigContext.Provider value={value}>
      {children}
    </IgConfigContext.Provider>
)};

IgConfigProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useIgConfig = () => {
  const context = useContext(IgConfigContext);
  if (!context) {
    throw new Error("useIgConfig must be used within an IgConfigProvider");
  }
  return context;
};