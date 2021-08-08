import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import CreateNewFolderOutlinedIcon from '@material-ui/icons/CreateNewFolderOutlined';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import PrivateCloud from '../lib/api';

const useStyles = makeStyles((theme) => ({
  icon: {
    minWidth: '0px',
    paddingRight: theme.spacing(2)
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  input: {
    display: 'none',
  }
}));

const UploadMenu = ({ mouseX, mouseY }) => {

  const classes = useStyles();
  const location = useLocation();
  const [first, setFirst] = useState({ open: false, x: null, y: null });
  const [second, setSecond] = useState({ open: false, x: null, y: null });

  useEffect(() => {
    if(mouseX && mouseY){
      if(!first.open && !second.open){
        setFirst({ open: true, x: mouseX, y: mouseY });
      }
      else if(first.open){
        setFirst({ ...first, open: false });
        setSecond({ open: true, x: mouseX, y: mouseY });
      }
      else if(second.open){
        setFirst({ open: true, x: mouseX, y: mouseY });
        setSecond({ ...second, open: false });
      }
    }
    else if(first.open || second.open){
      setFirst({ open: true, x: mouseX, y: mouseY });
      setSecond({ open: true, x: mouseX, y: mouseY });
    }
  }, [mouseX, mouseY]);

  const handleClose = () => {
    if(first.open){
      setFirst({ ...first, open: false });
    }
    else if(second.open){
      setSecond({ ...second, open: false });
    }
  }

  const onFileChange = (e) => {
    let path = location.pathname
    const files = new FormData();
    for(let file of e.target.files){
      files.append('files', file);
    }
    PrivateCloud.uploadFile(path, files);
  }

  return(
    <>
      <input
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={onFileChange}
      />

      <Menu
        keepMounted
        open={first.open}
        onClose={() => setFirst({ ...first, open: false })}
        anchorReference="anchorPosition"
        anchorPosition={
          first.open ? { top: first.y, left: first.x } : undefined
        }
      >
        <label htmlFor="contained-button-file">
          <MenuItem onClick={handleClose}>
            <ListItemIcon className={classes.icon}>
              <CreateNewFolderOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">New Folder</Typography>
          </MenuItem>
        </label>
        <Divider className={classes.divider}/>
        <label htmlFor="contained-button-file">
          <MenuItem onClick={handleClose}>
            <ListItemIcon className={classes.icon}>
              <CloudUploadOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Upload File</Typography>
          </MenuItem>
        </label>
        <label htmlFor="contained-button-file">
          <MenuItem onClick={handleClose}>
            <ListItemIcon className={classes.icon}>
              <CloudUploadOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Upload Folder</Typography>
          </MenuItem>
        </label>
      </Menu>

      <Menu
        keepMounted
        open={second.open}
        onClose={() => setSecond({ ...second, open: false })}
        anchorReference="anchorPosition"
        anchorPosition={
          second.open ? { top: second.y, left: second.x } : undefined
        }
      >
        <label htmlFor="contained-button-file">
          <MenuItem onClick={handleClose}>
            <ListItemIcon className={classes.icon}>
              <CreateNewFolderOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">New Folder</Typography>
          </MenuItem>
        </label>
        <Divider className={classes.divider}/>
        <label htmlFor="contained-button-file">
          <MenuItem onClick={handleClose}>
            <ListItemIcon className={classes.icon}>
              <CloudUploadOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Upload File</Typography>
          </MenuItem>
        </label>
        <label htmlFor="contained-button-file">
          <MenuItem onClick={handleClose}>
            <ListItemIcon className={classes.icon}>
              <CloudUploadOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Upload Folder</Typography>
          </MenuItem>
        </label>
      </Menu>
    </>

  );
}

export default UploadMenu;
