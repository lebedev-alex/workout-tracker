import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const StorageDataContext = createContext();

export function StorageDataProvider({ children }) {
  const state = useState(() => {
    const storageData = localStorage.getItem('workouts');
    return storageData ? JSON.parse(storageData) : {};
  });

  const [data] = state;

  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(data));
  }, [data]);

  return (
    <StorageDataContext.Provider value={state}>
      {children}
    </StorageDataContext.Provider>
  );
}

StorageDataProvider.propTypes = {
  children: PropTypes.object
};
