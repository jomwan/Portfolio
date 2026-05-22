"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AppContextType {
  ecoMode: boolean;
  setEcoMode: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [ecoMode, setEcoMode] = useState(false);

  // Load saved preference
  useEffect(() => {
    const saved = localStorage.getItem("ecoMode");
    if (saved === "true") setEcoMode(true);
  }, []);

  const handleSetEcoMode = (val: boolean) => {
    setEcoMode(val);
    localStorage.setItem("ecoMode", val.toString());
  };

  return (
    <AppContext.Provider value={{ ecoMode, setEcoMode: handleSetEcoMode }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
