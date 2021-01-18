import React, { useEffect, useRef, useState } from 'react';
import API from "../lib/api";
import styles from '../styles/Header.module.scss';

const Header = (props) => {

  const [token, setToken] = useState(props.token);
  const input = useRef();
  const form = useRef(null);
  
  const onFileSubmit = async(e) => {
    const body = new FormData(form.current);
    // files.map(file => data.append('file', file));
    console.log(token);
    await API.uploadImage(body, token);
    props.onFileSubmit();
  }

  useEffect(() => {
    setToken(props.token);
  }, [props.token])

  return(
    <div className={styles.body}>
      <div className={styles.item}>Lorem</div>
      <div className={styles.item}>Ipsum</div>
      <div className={styles.item}>Dolor</div>
      <div className={styles.spacer}></div>
      <div className={styles.item}>
        <form action="" ref={form}>
          <input onChange={onFileSubmit} name="image" type="file" hidden ref={input}/>
        </form>
        <button onClick={() => input.current.click()}>Upload</button>
      </div>
    </div>
  )
}

export default Header;