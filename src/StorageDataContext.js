import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const StorageDataCtx = createContext();

export function StorageDataContext({ children }) {
  const state = useState(() => {
    const storageData = localStorage.getItem('workouts');
    return storageData ? JSON.parse(storageData) : {};
  });

  const [data] = state;

  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(data));
  }, [data]);

  return (
    <StorageDataCtx.Provider value={state}>{children}</StorageDataCtx.Provider>
  );
}

StorageDataContext.propTypes = {
  children: PropTypes.object
};
