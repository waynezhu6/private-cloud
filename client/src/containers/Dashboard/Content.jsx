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
import { StateContext } from "../../components/StateContext";
import PrivateCloud from "../../lib/api";
import UploadMenu from "../../components/UploadMenu";

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

  const [state, dispatch] = useContext(StateContext);
  const location = useLocation();
  const history = useHistory();
  const [contextMenu, setContextMenu] = useState({ mouseX: null, mouseY: null });
  const classes = useStyles(); 

  useEffect(() => {
    const getFiles = async() => {
      let res = await PrivateCloud.getMetadata(location.pathname);
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
    let files = {};

    for(let file of metadata.files){
      files[file.path] = file;
    }

    dispatch({ type: 'metadata.set', files });
  }

  const onContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ mouseX: e.clientX - 2, mouseY: e.clientY - 4 });
  }

  return(
    <div className={styles.body} onContextMenu={onContextMenu} onClick={(e) => console.log(e.target == e.currentTarget)}>

      <Paper 
        component="form" 
        variant="outlined"
        className={classes.searchbar} 
        onContextMenu={(e) => {e.stopPropagation()}}
      >
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon/>
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Search"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Paper>

      <Breadcrumbs/>

      <Folders/>
      <Files/>

      <UploadMenu {...contextMenu}/>
    </div>
  );
}

export default Content;
