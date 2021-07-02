import React, { useContext } from "react";
import { Route, Redirect } from 'react-router-dom';
import { StateContext } from './StateContext';

const PrivateRoute = ({ children }) => {
  // redirects to login if user is not authorized
  const [state] = useContext(StateContext);
  return(
    <Route>
      {state.isAuthorized ? children : <Redirect to="/login"/>}
    </Route>
  );
}

export default PrivateRoute;
