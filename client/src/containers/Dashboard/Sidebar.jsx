import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import styles from '../../styles/containers/Dashboard/Sidebar.module.scss';

const Sidebar = () => {

  const [dropdown, setDropdown] = useState(false);
  const fileInput = useRef(null);
  const [modal, setModal] = useState(false);

  const onFileChange = (e) => {
    console.log(e.target.files);
  }

  return(
    <aside className={`${styles.body} menu`}>

      <input 
        type="file" 
        onChange={onFileChange} 
        ref={fileInput}
        className={styles.fileInput}
        onChange={(e) => console.log(e)}
      />

      <h4 className="subtitle">Private Cloud</h4>

      <div 
        className={`dropdown ${dropdown ? 'is-active' : ''}`}
        onBlur={(e) => {
          if(!e.currentTarget.contains(e.relatedTarget))
            setDropdown(false);
        }}
      >
        <div className="dropdown-trigger">
          <button 
            className="button" 
            aria-haspopup="true" 
            aria-controls="dropdown-menu"
            onClick={() => setDropdown(!dropdown)}
          >
            <span>Upload</span>
            <span className="icon is-small">
              <FontAwesomeIcon icon={faAngleDown}/>
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <a 
              className="dropdown-item"
              tabIndex="0"
              onClick={() => {
                setModal(true);
                setDropdown(false);
              }}
            >
              New Folder
            </a>
            <hr className="dropdown-divider"/>
            <a 
              className="dropdown-item"
              tabIndex="1"
              onClick={() => fileInput.current && fileInput.current.click()}
            >
              Upload File
            </a>
            <a 
              className="dropdown-item" 
              tabIndex="2"
              onClick={() => fileInput.current && fileInput.current.click()}
            >
              Upload Folder
            </a>
          </div>
        </div>
      </div>

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

      <div className={`modal ${modal ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={() => setModal(false)}></div>
        <div className="modal-content">
          <p className="image is-4by3">
            <img src="https://bulma.io/images/placeholders/1280x960.png" alt=""/>
          </p>
        </div>
        <button 
          className="modal-close is-large" 
          aria-label="close"
          onClick={() => setModal(false)}
        ></button>
      </div>

    </aside>
  );
}

export default Sidebar;
