import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext({
  refreshData: false, 
  setRefreshData: (refresh: boolean) => {},
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [refreshData, setRefreshData] = useState(false);

  return (
    <DataContext.Provider value={{ refreshData, setRefreshData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
