import React, { useState } from 'react';
import styles from '../../styles/containers/login/index.module.scss';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return(
    <div className={styles.body}>
      <div className={styles.card}>

        <div className={styles.title}>
          Sign in to Private Cloud
        </div>

        <div className={styles.subtitle}>
          Private Cloud is a self-hosted remote storage solution, 
          sort of like a private Google Drive.
        </div>

        <div className={styles.label}>Username</div>
        <input 
          type="text" 
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
        />

        <div className={styles.label}>Password</div>
        <input 
          type="password" 
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button onClick={() => {}}>Continue</button>

      </div>
    </div>
  )
}

export default Login;