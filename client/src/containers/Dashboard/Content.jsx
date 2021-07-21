import React, { useContext, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import styles from '../../styles/containers/Dashboard/Content.module.scss';

import Breadcrumbs from "../../components/Breadcrumbs";
import Folders from "./Folders";
import Files from "./Files";
import { StateContext  } from "../../components/StateContext";
import PrivateCloud from "../../lib/api";

const Content = () => {

  const [state] = useContext(StateContext);
  const location = useLocation();
  const history = useHistory();
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const getFiles = async() => {
      let res = await PrivateCloud.getMetadata(location.pathname);
      console.log(res);
      if(res.error || !res.isDir){
        history.push('/');
      }
      else{
        reduceMetadata(res);
      }
    }
    getFiles();
  }, [location.pathname]);

  const reduceMetadata = (metadata) => {
    let tempFiles = [];
    let tempFolders = [];

    for(let file of metadata.files){
      if(file.isDir)
        tempFolders.push(file);
      else
        tempFiles.push(file);
    }

    setFiles(tempFiles);
    setFolders(tempFolders);
  }

  return(
    <div className={styles.body}>

      <div className="field">
        <div className="control has-icons-left">
          <input 
            className={`input ${styles.search}`} 
            type="text" 
            placeholder="Search"
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faSearch}/>
          </span>
        </div>
      </div>

      <Breadcrumbs/>

      <Folders folders={folders}/>
      <Files files={files}/>
    </div>
  );
}

export default Content;
