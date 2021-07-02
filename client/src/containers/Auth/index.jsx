import React, { useContext, useEffect, useState } from 'react';
import Login from './Login';
import styles from '../../styles/containers/Auth/index.module.scss';

import { StateContext } from '../../components/StateContext';
import { useHistory } from 'react-router-dom';

const Auth = () => {

  const [state] = useContext(StateContext);
  const history = useHistory();

  useEffect(() => {
    if(state.isAuthorized)
      history.push('/');
  });

  return(
    <div className={styles.body}>

      <nav className={`${styles.header} level`}>
        <div className="level-left">
          <div className="level-item">
            <span className="icon-text">
              <span className="icon">
                <i className="fas fa-home"></i>
              </span>
              <p className="subtitle is-5">Private Cloud</p>
            </span>
          </div>
        </div>

        <div className="level-right buttons">
          <button className="button">Create an Account</button>
          <button className="button is-primary">Demo</button>
        </div>
      </nav>

      <Login/>

      <nav className={`${styles.header} level`}>
        
        <div className="level-left">
          <p className="level-item has-text-centered">
            <a className="link">&copy; 2021 Wayne Zhu</a>
          </p>
        </div>

        <div className={`${styles.links} level-right`}>
          <p className="level-item has-text-centered">
            <a className="link">About</a>
          </p>
          <p className="level-item has-text-centered">
            <a className="link">Source Code</a>
          </p>
        </div>
      </nav>

    </div>

  );
}

export default Auth;
