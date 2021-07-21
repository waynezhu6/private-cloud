import React from "react";
import styles from '../../styles/containers/Dashboard/index.module.scss';

import Sidebar from "./Sidebar";
import Content from "./Content";

const Dashboard = () => {

  return(
    <div className={styles.body}>
      <Sidebar/>
      <Content/>
    </div>
  );
}

export default Dashboard;
