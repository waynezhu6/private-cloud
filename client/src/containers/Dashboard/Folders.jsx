import React from "react";
import styles from "../../styles/containers/Dashboard/Folders.module.scss"
import Folder from "../../components/Folder";

const Folders = ({ folders }) => {

  return(
    <div>
      <div className={styles.folders}>
        {folders.map((folder, index) => <Folder {...folder} key={index}/>)}
      </div>
    </div>
  );
}

export default Folders;
