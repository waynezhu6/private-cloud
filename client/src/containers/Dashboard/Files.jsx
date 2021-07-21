import React from "react";
import styles from "../../styles/containers/Dashboard/Folders.module.scss"
import File from "../../components/File";

const Files = ({ files }) => {

  return(
    <div>
      <div className={styles.folders}>
        {files.map((file, index) => <File {...file} key={index}/>)}
      </div>
    </div>
  );
}

export default Files;
