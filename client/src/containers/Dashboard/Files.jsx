import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import File from "../../components/File";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridGap: theme.spacing(2),
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    marginTop: theme.spacing(2)
  }
}));

const Files = ({ files }) => {

  const classes = useStyles();

  return(
    <div>
      <div className={classes.root}>
        {files.map((file, index) => <File {...file} key={index}/>)}
      </div>
    </div>
  );
}

export default Files;
