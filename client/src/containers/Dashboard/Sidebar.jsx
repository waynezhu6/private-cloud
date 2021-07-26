import React, { useState, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Container from "@material-ui/core/Container";
import Button from '@material-ui/core/Button';

import HomeIcon from '@material-ui/icons/Home';
import StarIcon from '@material-ui/icons/Star';
import HistoryIcon from '@material-ui/icons/History';
import DeleteIcon from '@material-ui/icons/Delete';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import { Typography } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: {
    paddingLeft: '16px',
    paddingRight: '16px'
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  input: {
    display: 'none',
  },
}));

const Sidebar = () => {

  const [dropdown, setDropdown] = useState(false);
  const fileInput = useRef(null);
  const [modal, setModal] = useState(false);
  const classes = useStyles();

  const onFileChange = (e) => {
    console.log(e.target.files);
  }

  return(
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <Container className={classes.toolbar}>
        <Typography variant="body1">
          Private Cloud
        </Typography>
        <input
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Upload
          </Button>
        </label>

      </Container>

      <Divider/>

      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            General
          </ListSubheader>
        }
      >
        <ListItem button>
          <ListItemIcon><HomeIcon/></ListItemIcon>
          <ListItemText primary="Dashboard"/>
        </ListItem>
        <ListItem button>
          <ListItemIcon><StarIcon/></ListItemIcon>
          <ListItemText primary="Favorites"/>
        </ListItem>
        <ListItem button>
          <ListItemIcon><HistoryIcon/></ListItemIcon>
          <ListItemText primary="Recent"/>
        </ListItem>
        <ListItem button>
          <ListItemIcon><DeleteIcon/></ListItemIcon>
          <ListItemText primary="Trash"/>
        </ListItem>
      </List>

      <Divider/>
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Viewer
          </ListSubheader>
        }
      >
        <ListItem button>
          <ListItemIcon><LibraryBooksIcon/></ListItemIcon>
          <ListItemText primary="Documents"/>
        </ListItem>
        <ListItem button>
          <ListItemIcon><PhotoLibraryIcon/></ListItemIcon>
          <ListItemText primary="Photos"/>
        </ListItem>
        <ListItem button>
          <ListItemIcon><LibraryMusicIcon/></ListItemIcon>
          <ListItemText primary="Music"/>
        </ListItem>
        <ListItem button>
          <ListItemIcon><VideoLibraryIcon/></ListItemIcon>
          <ListItemText primary="Videos"/>
        </ListItem>
      </List>

      <Divider/>
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Public
          </ListSubheader>
        }
      >
        <ListItem button>
          <ListItemIcon><FolderSharedIcon/></ListItemIcon>
          <ListItemText primary="Shared"/>
        </ListItem>
      </List>

    </Drawer>
  );
}

export default Sidebar;
