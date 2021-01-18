import React from 'react';
import styles from '../styles/Image.module.scss';

const Image = (props) => {
  return(
    <div className={styles.body}>
      <img src={props.src} className={styles.image}></img>
      <div className={styles.container}>
        <div className={styles.name}>{props.filename}</div>
        <div className={styles.trash}>&#128465;</div>
      </div>
    </div>
  )
}

export default Image;