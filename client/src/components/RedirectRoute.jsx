import React, { useContext } from "react";
import { Route, Redirect } from 'react-router-dom';
import { StateContext } from './StateContext';

const RedirectRoute = ({ children }) => {
  // redirects to dashboard if user is authorized
  const [state] = useContext(StateContext);
  return(
    <Route>
      {state.isAuthorized ? <Redirect to="/"/> : children}
    </Route>
  );
}

export default RedirectRoute;
