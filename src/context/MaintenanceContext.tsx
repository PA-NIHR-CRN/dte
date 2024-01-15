import React, { createContext, useState, useContext, ReactNode } from "react";

interface MaintenanceContextType {
  inMaintenanceMode: boolean;
  setInMaintenanceMode: (inMaintenanceMode: boolean) => void;
}

const MaintenanceContext = createContext<MaintenanceContextType | undefined>(
  undefined
);

interface MaintenanceProviderProps {
  children: ReactNode;
}

export const MaintenanceProvider: React.FC<MaintenanceProviderProps> = ({
  children,
}) => {
  const [inMaintenanceMode, setInMaintenanceMode] = useState<boolean>(false);

  return (
    <MaintenanceContext.Provider
      value={{ inMaintenanceMode, setInMaintenanceMode }}
    >
      {children}
    </MaintenanceContext.Provider>
  );
};

export const useMaintenance = (): MaintenanceContextType => {
  const context = useContext(MaintenanceContext);
  if (!context) {
    throw new Error("useMaintenance must be used within a MaintenanceProvider");
  }
  return context;
};
