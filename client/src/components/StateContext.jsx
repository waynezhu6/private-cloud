import React, { useReducer, createContext } from 'react';

// create a context tracking user authorization
const StateContext = createContext();

const DEFAULT_STATE = {
  isAuthorized: false, // true if user is authorized
  path: '', // current path
  subpaths: []
}

const reducer = (state, action) => {
  switch(action.type){
    case 'path.push': {
      let subpaths = state.subpaths;
      subpaths.push(action.path);
      let path = subpaths.join('/');
      return { ...state, path, subpaths };
    }
    case 'path.pop': {
      let subpaths = state.subpaths;
      subpaths.pop();
      let path = subpaths.join('/');
      return { ...state, path, subpaths };
    }
    case 'path.set': {
      let subpaths = action.path.split('/');
      let path = action.path;
      return { ...state, path, subpaths };
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
