import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../../styles/containers/Auth/index.module.scss';

import PrivateCloud from '../../lib/api';
import { StateContext } from '../../components/StateContext';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [_, dispatch] = useContext(StateContext);
  const history = useHistory();

  const login = async() => {
    console.log(username, password);
    let token = await PrivateCloud.login(username, password);
    if(token){
      dispatch({ type: 'auth.set', isAuthorized: true });
      history.push('/');
    }
  }

  return(
    <div className={styles.section}>
      <div className={`container ${styles.container}`}>

        <div className="content">
          <h1 className="title">Log In</h1>
          
          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input 
                className="input is-success" 
                type="text" 
                placeholder="example@email.com"
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
              </span>
            </div>
            <p className="help is-success">This username is available</p>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control has-icons-left has-icons-right">
              <input 
                className="input is-danger" 
                type="password" 
                placeholder="Your Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle"></i>
              </span>
            </div>
            <p className="help is-danger">Your password must be between 8 and 30 characters</p>
          </div>

          <div className="field">
            <button 
              className={`${styles.button} button is-primary is-fullwidth`}
              onClick={() => login()}
            >
              Log In
            </button>
          </div>

        </div>
        
      </div>
    </div>
  );
}

export default Login;
