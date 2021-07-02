import React, { useEffect, useState } from "react";
import PrivateCloud from '../../lib/api';
import styles from '../../styles/containers/Dashboard/index.module.scss';

import Sidebar from "./Sidebar";
import Content from "./Content";

const Dashboard = () => {

  const [files, setFiles] = useState();

  useEffect(() => {
    const getFiles = async() => {
      PrivateCloud.getFileNames();
    }
  });

  return(
    <div className={styles.body}>
      <Sidebar/>
      <Content/>
    </div>
  );
}

export default Dashboard;
