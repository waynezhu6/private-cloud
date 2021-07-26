import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Folder from "../../components/Folder";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridGap: theme.spacing(2),
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    marginTop: theme.spacing(2)
  }
}));

const Folders = ({ folders }) => {

  const classes = useStyles()

  return(
    <div>
      <div className={classes.root}>
        {folders.map((folder, index) => <Folder {...folder} key={index}/>)}
      </div>
    </div>
  );
}

export default Folders;
