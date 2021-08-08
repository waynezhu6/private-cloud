import React, { useContext, useEffect, useState } from 'react';
import PrivateCloud from '../lib/api';

import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import CreateNewFolderOutlinedIcon from '@material-ui/icons/CreateNewFolderOutlined';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import { StateContext } from './StateContext';

const useStyles = makeStyles((theme) => ({
  icon: {
    minWidth: '0px',
    paddingRight: theme.spacing(2)
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

const FileMenu = ({ mouseX, mouseY, path }) => {

  const classes = useStyles();
  const [state, dispatch] = useContext(StateContext);
  const [first, setFirst] = useState({ open: false, x: null, y: null });
  const [second, setSecond] = useState({ open: false, x: null, y: null });
  const URL = `${process.env.REACT_APP_BASE_URL}file/${path}`; 

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
  }, [mouseX, mouseY]);

  const handleClose = () => {
    if(first.open){
      setFirst({ ...first, open: false });
    }
    else if(second.open){
      setSecond({ ...second, open: false });
    }
  }

  const onOpen = () => {
    handleClose();
    window.open(URL, '_blank')
  }

  const onDownload = () => {

  }

  const onStar = () => {

  }

  const onShare = () => {

  }

  const onDelete = async() => {
    handleClose();
    await PrivateCloud.deleteFile(path);
    dispatch({ type: 'metadata.pull', paths: [path] });
  }

  return(
    <>
      {/* <Menu
        keepMounted
        open={first.open}
        onClose={() => setFirst({ ...first, open: false })}
        anchorReference="anchorPosition"
        anchorPosition={
          first.open ? { top: first.y, left: first.x } : undefined
        }
      > */}
        <MenuItem onClick={onOpen}>
          <ListItemIcon className={classes.icon}>
            <CreateNewFolderOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Open</Typography>
        </MenuItem>
        <Divider className={classes.divider}/>
        <MenuItem onClick={handleClose}>
          <ListItemIcon className={classes.icon}>
            <CloudUploadOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Download</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon className={classes.icon}>
            <CloudUploadOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Add to Favorites</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon className={classes.icon}>
            <CloudUploadOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Share</Typography>
        </MenuItem>
        <Divider className={classes.divider}/>
        <MenuItem onClick={onDelete}>
          <ListItemIcon className={classes.icon}>
            <CloudUploadOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Delete</Typography>
        </MenuItem>
      {/* </Menu>

      <Menu
        keepMounted
        open={second.open}
        onClose={() => setSecond({ ...second, open: false })}
        anchorReference="anchorPosition"
        anchorPosition={
          second.open ? { top: second.y, left: second.x } : undefined
        }
      >
        <MenuItem onClick={onOpen}>
          <ListItemIcon className={classes.icon}>
            <CreateNewFolderOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Open</Typography>
        </MenuItem>
        <Divider className={classes.divider}/>
        <MenuItem onClick={handleClose}>
          <ListItemIcon className={classes.icon}>
            <CloudUploadOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Download</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon className={classes.icon}>
            <CloudUploadOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Add to Favorites</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon className={classes.icon}>
            <CloudUploadOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Share</Typography>
        </MenuItem>
        <Divider className={classes.divider}/>
        <MenuItem onClick={onDelete}>
          <ListItemIcon className={classes.icon}>
            <CloudUploadOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Delete</Typography>
        </MenuItem>
      </Menu> */}
    </>

  );
}

export default FileMenu;
