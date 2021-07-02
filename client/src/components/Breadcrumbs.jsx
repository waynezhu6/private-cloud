import React, { useContext } from 'react';
import { StateContext } from './StateContext';

const Breadcrumbs = () => {

  const [state] = useContext(StateContext);

  const renderBreadcrumbs = () => {
    return state.path.map((value) => (
      <li><a>{value}</a></li>
    ));
  }

  return(
  <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
    <ul>
      <li><a href="#">My Files</a></li>
      {renderBreadcrumbs()}
    </ul>
  </nav>
  );

}

export default Breadcrumbs;
