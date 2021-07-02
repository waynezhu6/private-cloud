import React from "react";
import styles from '../../styles/containers/Dashboard/Sidebar.module.scss';

const Sidebar = () => {
  return(
    <aside className={`${styles.body} menu`}>
      <p className="menu-label">
        General
      </p>
      <ul className="menu-list">
        <li><a>Dashboard</a></li>
        <li><a>Favorites</a></li>
        <li><a>Recents</a></li>
        <li><a>Trash</a></li>
      </ul>
      <p className="menu-label">
        Viewer
      </p>
      <ul className="menu-list">
        <li><a>Documents</a></li>
        <li><a>Photos</a></li>
        <li><a>Videos</a></li>
      </ul>
      <p className="menu-label">
        Public
      </p>
      <ul className="menu-list">
        <li><a>Shared</a></li>
      </ul>
    </aside>
  );
}

export default Sidebar;
