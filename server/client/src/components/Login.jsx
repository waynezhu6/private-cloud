import React, { useState } from 'react';
import styles from '../styles/Login.module.scss';

const Login = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return(
    <div className={styles.body}>
      <div className={styles.wrapper}>

        <form className={styles.form}>
          <input 
            type="text" 
            placeholder='Username' 
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder='Password'
            onChange={e => setPassword(e.target.value)}
            required
          />
        </form>

        <div className={styles.buttons}>
          <button onClick={() => props.signup(username, password)}>Sign Up</button>
          <div/>
          <button onClick={() => props.login(username, password)}>Log In</button>
        </div>

      </div>
    </div>
  );
}

export default Login;