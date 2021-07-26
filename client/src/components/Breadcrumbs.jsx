import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useHistory, useLocation } from 'react-router-dom';
import { StateContext } from './StateContext';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  link: {
    fontSize: '18px'
  }
}));

const SimpleBreadcrumbs = () => {

  const [state] = useContext(StateContext);
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  const renderBreadcrumbs = () => {
    let subpaths = location.pathname.split('/');
    subpaths.shift();

    return subpaths.map((value, index) => (
      <Link 
        color="inherit" 
        className={classes.link}
        href={`#/${value}`} 
        onClick={() => history.push(`#/${value}`)}
        key={index}
      >
        {value}
      </Link>
    ));
  }

  return(
    <Breadcrumbs 
      className={classes.root} 
      separator={<NavigateNextIcon fontSize="small"/>} 
      aria-label="breadcrumb"
    >
      <Link 
        color="inherit" 
        className={classes.link}
        href="#/" 
        onClick={() => history.push('#/')}
      >
        My Files
      </Link>
      {renderBreadcrumbs()}
    </Breadcrumbs>
  );

}

export default SimpleBreadcrumbs;
