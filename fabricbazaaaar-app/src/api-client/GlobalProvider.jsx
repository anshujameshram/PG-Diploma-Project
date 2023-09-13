import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const [globalValue, setGlobalValue] = useState(null);

  return (
    <GlobalContext.Provider value={{ globalValue, setGlobalValue }}>
      {children}
    </GlobalContext.Provider>
  );
}

function useGlobalValue() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalValue must be used within a GlobalProvider');
  }
  return context;
}

export { GlobalProvider, useGlobalValue };
