import React from 'react';
import { FileIcon, defaultStyles } from 'react-file-icon';
import { useHistory } from 'react-router-dom';
import styles from '../styles/components/Folder.module.scss';

const File = ({ name, path }) => {

  const history = useHistory();

  return(
    <div 
      className={styles.body} 
      onDoubleClick={() => {
        //history.push(path);
      }}
    >
      <div className={styles.card}>

        <div className={styles.content}>
          <figure>
            <FileIcon extension="png" {...defaultStyles.png} fold={false} radius={2}/>
          </figure>
          {name}
        </div>

      </div>
    </div>
  );
}

export default File;




