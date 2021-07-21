import React, { useContext, useEffect } from "react";
import { HashRouter, Redirect, Switch } from 'react-router-dom';

import PrivateCloud from "./lib/api";
import PrivateRoute from "./components/PrivateRoute";
import RedirectRoute from "./components/RedirectRoute";

import './App.css';
import 'bulma/css/bulma.min.css';

import Auth from './containers/Auth/index';
import Dashboard from './containers/Dashboard/index';
import { StateContext } from "./components/StateContext";

const App = () => {

  const [state, dispatch] = useContext(StateContext);

  useEffect(() => {

    const isAuthorized = async() => {
      if(await PrivateCloud.isAuthorized()){
        dispatch({ type: 'auth.set', isAuthorized: true });
      }
    }
    isAuthorized();
  }, []);
  
  return(
    <div className="body">

      <HashRouter>
        <Switch>
          <RedirectRoute exact path="/login"><Auth/></RedirectRoute>
          <RedirectRoute exact path="/signup"><Auth/></RedirectRoute>
          <PrivateRoute path="/"><Dashboard/></PrivateRoute>
        </Switch>
      </HashRouter>

    </div>
  );
};

export default App;
