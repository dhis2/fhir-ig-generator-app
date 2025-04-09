import React, { createContext, useContext, useState } from "react";

const IgConfigContext = createContext();

export const IgConfigProvider = ({ children }) => {
  const [igConfig, setIgConfig] = useState({
    status: "draft",
    version: "0.1.0",
    releaseLabel: "ci-build",
  });

  return (
    <IgConfigContext.Provider value={{ igConfig, setIgConfig }}>
      {children}
    </IgConfigContext.Provider>
  );
}
export const useIgConfig = () => {
  const context = useContext(IgConfigContext);
  if (!context) {
    throw new Error("useIgConfig must be used within an IgConfigProvider");
  }
  return context;
};