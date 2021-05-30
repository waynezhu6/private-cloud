import React, { useEffect, useRef, useState } from 'react';
import API from "../lib/api";
import styles from '../styles/Header.module.scss';

const Header = (props) => {

  const [token, setToken] = useState(props.token);
  const input = useRef();
  const form = useRef(null);
  
  const onFileSubmit = async(e) => {
    const body = new FormData(form.current);
    console.log(token);
    await API.uploadImage(body, token);
    props.onFileSubmit();
  }

  useEffect(() => {
    setToken(props.token);
  }, [props.token])

  return(
    <div className={styles.body}>
      <div className={styles.item}></div>
      <div className={styles.spacer}></div>
      <div className={styles.item}>
        <form action="" ref={form}>
          <input 
            onChange={onFileSubmit} 
            name="image" 
            type="file" 
            hidden 
            multiple 
            ref={input}
            accept="image/*"
          />
        </form>
        <button onClick={() => input.current.click()}>Upload</button>
      </div>
      <div className={styles.item}>
        <button className={styles.logout}>Logout</button>
      </div>
    </div>
  )
}

export default Header;