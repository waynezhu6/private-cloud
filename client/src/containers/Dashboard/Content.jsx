import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import { useLocation, useHistory } from "react-router-dom";
import styles from '../../styles/containers/Dashboard/Content.module.scss';

import Breadcrumbs from "../../components/Breadcrumbs";
import Folders from "./Folders";
import Files from "./Files";
import { StateContext  } from "../../components/StateContext";
import PrivateCloud from "../../lib/api";

const useStyles = makeStyles((theme) => ({
  searchbar: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 720,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const Content = () => {

  const [state] = useContext(StateContext);
  const location = useLocation();
  const history = useHistory();
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const classes = useStyles();

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

      <Paper component="form" className={classes.searchbar}>
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Search"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Paper>

      <Breadcrumbs/>

      <Folders folders={folders}/>
      <Files files={files}/>
    </div>
  );
}

export default Content;
