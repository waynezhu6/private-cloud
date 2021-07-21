import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { StateContext } from './StateContext';
import styles from '../styles/components/Breadcrumbs.module.scss';

const Breadcrumbs = () => {

  const [state] = useContext(StateContext);
  const history = useHistory();
  const location = useLocation();

  const renderBreadcrumbs = () => {
    let subpaths = location.pathname.split('/');
    subpaths.shift();
    return subpaths.map((value, index) => (
      <li className="subtitle is-5" key={index}><a>{value}</a></li>
    ));
  }

  return(
  <nav className="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li><a className="subtitle is-5" onClick={() => history.push('/')}>My Files</a></li>
      {renderBreadcrumbs()}
    </ul>
  </nav>
  );

}

export default Breadcrumbs;
