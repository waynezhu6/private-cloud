import React, { useState } from 'react';
import { FileIcon, defaultStyles } from 'react-file-icon'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import CardMedia from '@material-ui/core/CardMedia';

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
  }
}));

const File = ({ name, path }) => {
  const classes = useStyles();
  const ext = path.split('.').pop() || 'unknown'
  const [selected, setSelected] = useState(false);

  return (
    <div className={classes.root} onMouseDown={() => setSelected(true)}>
      <Card variant="outlined" className={`${selected ? classes.selected : ''}`}>
        <CardHeader
          avatar={<StarOutlineIcon/>}
          action={
            <IconButton aria-label="settings">
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

  );
}

export default File;




