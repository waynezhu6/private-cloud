import React, { useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Folder from "../../components/Folder";
import { StateContext } from "../../components/StateContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridGap: theme.spacing(2),
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    marginTop: theme.spacing(2)
  }
}));

const Folders = () => {

  const [state] = useContext(StateContext);
  const classes = useStyles()

  return(
    <div>
      <div className={classes.root}>
        {Object.values(state.metadata)
          .filter(file => file.isDir)
          .map((folder, index) => <Folder {...folder} key={index}/>)
        }
      </div>
    </div>
  );
}

export default Folders;
