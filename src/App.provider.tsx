import React, { createContext, useContext, PropsWithChildren } from 'react';

type AppContextType = {
  greeting: string;
};

const AppContext = createContext<AppContextType>({
  greeting: 'Hello',
});

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <AppContext.Provider value={{ greeting: 'Hello' }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
