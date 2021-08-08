import React, { useReducer, createContext } from 'react';

// create a context tracking user authorization
const StateContext = createContext();

const DEFAULT_STATE = {
  isAuthorized: false, // true if user is authorized
  selected: null, // path name of the current selected file
  metadata: {}, // local cache of files, using path as key
}

const reducer = (state, action) => {
  switch(action.type){
    case 'selected.set': {
      return {...state, selected: action.path}
    }
    case 'metadata.set': {
      return {...state, metadata: action.files}
    }
    case 'metadata.push': {
      for(let file of action.files){
        state.metadata[file.path] = file;
      }
      return {...state, metadata: { ...state.metadata } };
    }
    case 'metadata.pull': {
      for(let path of action.paths){
        delete state.metadata[path];
      }
      return {...state, metadata: { ...state.metadata } };
    }
    case 'auth.set': {
      return {...state, isAuthorized: action.isAuthorized }
    }
    default:
      throw new Error();
  }
}

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);
  return(
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
}

export { StateContext, StateProvider };
