import React from 'react';
import { useState, createContext } from 'react';

// create a context tracking user authorization
const StateContext = createContext();

const DEFAULT_STATE = {
  auth: false, // true if user is authorized
  path: ['dir', 'subdir', 'filename'] // path relative to the root
}

const StateProvider = ({ children }) => {
  const [state, setState] = useState(DEFAULT_STATE);
  return(
    <StateContext.Provider value={[state, setState]}>
      {children}
    </StateContext.Provider>
  );
}

export { StateContext, StateProvider };
