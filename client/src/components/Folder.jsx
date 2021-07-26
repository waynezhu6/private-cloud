import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
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
  card: {
    width: '100%'
  }
}));

const File = ({ name, path }) => {

  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.root} onDoubleClick={() => history.push(path)}>
      <Card className={classes.card} variant="outlined">
        <CardHeader
          avatar={<FolderOpenIcon/>}
          title={name}
        />
      </Card>
    </div>
  );
}

export default File;




