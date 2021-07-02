import React from "react";
import styles from '../../styles/containers/Dashboard/Content.module.scss';

import Breadcrumbs from "../../components/Breadcrumbs";

const Content = () => {
  return(
    <div className={styles.body}>
      <Breadcrumbs/>
    </div>
  );
}

export default Content;
