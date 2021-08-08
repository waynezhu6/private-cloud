import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { StateContext } from "./StateContext";

import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';

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
  card: {
    width: '100%'
  }
}));

const File = ({ name, path }) => {

  const [state, dispatch] = useContext(StateContext);
  const history = useHistory();
  const classes = useStyles();
  const [selected, setSelected] = useState(false);

  return (
    <ClickAwayListener 
      mouseEvent="onMouseDown" 
      onClickAway={() => setSelected(false)}
    >
      <div 
        className={classes.root}
        onDoubleClick={() => history.push(path)}
        onMouseDown={() => setSelected(true)}
      >
        <Card  
          className={`${classes.card} ${selected ? classes.selected : ''}`}
          variant="outlined"
        >
          <CardHeader
            avatar={<FolderOpenIcon/>}
            title={name}
          />
        </Card>
      </div>
    </ClickAwayListener>
  )
}

export default File;




