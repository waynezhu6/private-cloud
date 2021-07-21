import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { IoIosFolder } from 'react-icons/io';
import styles from '../styles/components/Folder.module.scss';
import { StateContext } from './StateContext';

const Folder = ({ name, path }) => {

  const [state, dispatch] = useContext(StateContext);
  const history = useHistory();

  return(
    <div 
      className={styles.body} 
      onDoubleClick={() => {
        history.push(path);
      }}
    >
      <div className={styles.card}>

        <div className={styles.content}>
          <figure className={styles.image}>
            <IoIosFolder className={styles.icon} color="#AAAAAA"/>
          </figure>
          <figure className={styles.label}>
            {name}
          </figure>
        </div>

      </div>
    </div>
  );
}

export default Folder;
