import React, { useState } from 'react';
import { FileIcon, defaultStyles } from 'react-file-icon'
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";

import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarIcon from '@material-ui/icons/Star';
import CardMedia from '@material-ui/core/CardMedia';

import FileMenu from './FileMenu';
import PrivateCloud from '../lib/api';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: '1 1 240px',
    overflow: 'hidden',
    cursor: 'pointer',
    userSelect: 'none'
  },
  selected: {
    backgroundColor: '#E8F0FE'
  },
  fileIcon: {
    width: '50%',
    margin: 'auto'
  },
  fileName: {
    textAlign: 'center',
    marginTop: '10px'
  },
  starred: {
    color: '#FAD165'
  }
}));

const File = ({ name, path }) => {
  const classes = useStyles();
  const ext = path.split('.').pop() || 'unknown'
  const [selected, setSelected] = useState(false);
  const [starred, setStarred] = useState(false);
  const URL = `${process.env.REACT_APP_BASE_URL}file/${path}`; 

  const onStar = () => {
    let newTags = starred ? [] : ['_favorite'];
    //PrivateCloud.setTags(path, newTags, true);
    setStarred(!starred);
  }

  return (
    // <ClickAwayListener 
    //   mouseEvent="onMouseDown" 
    //   onClickAway={() => setSelected(false)}
    // >
      <div>

        <ContextMenuTrigger id={`file-context-menu-${path}`}>
          <div 
            className={classes.root} 
            onMouseDown={() => setSelected(true)}
            onDoubleClick={() => window.open(URL, '_blank')}
          >        

            <Card variant="outlined" className={`${selected ? classes.selected : ''}`}>
              <CardHeader
                avatar={
                  starred ?
                    <StarOutlineIcon 
                      onMouseDown={(e) => e.stopPropagation()} 
                      onClick={onStar}
                    />
                  :
                    <StarIcon 
                      onMouseDown={(e) => e.stopPropagation()} 
                      className={classes.starred} 
                      onClick={onStar}
                    />
                }
                action={
                  <IconButton aria-label="settings" onMouseDown={(e) => e.stopPropagation()}>
                    <MoreVertIcon/>
                  </IconButton>
                }
              />
              
              <CardMedia>
                <div className={classes.fileIcon}>
                  <FileIcon extension={ext} {...defaultStyles.png}/>
                </div>
              </CardMedia>
        
              <CardContent>
                <Typography className={classes.fileName} gutterBottom variant="body1">
                  {name}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </ContextMenuTrigger>

        <ContextMenu id={`file-context-menu-${path}`}>
          <FileMenu/>
        </ContextMenu>

      </div>
    // </ClickAwayListener>

  );
}

export default File;




