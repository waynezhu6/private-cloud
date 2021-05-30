import React, { useEffect, useState } from "react";
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import API from "./lib/api";
import './App.css';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Images from './components/Images';
import Login from './components/Login';

// import Login from './containers/Login/index';

const App = () => {

  const [token, setToken] = useState(null); //store app token here
  const [images, setImages] = useState([]); //store filenames of this user's images
  const [lastSubmit, setLastSubmit] = useState(Date.now());

  const onFileSubmit = () => {
    setLastSubmit(Date.now());
  }

  const login = async(username, password) => {
    setToken(await API.login(username, password));
  }

  const signup = async(username, password) => {
    setToken(await API.signup(username, password));
  }

  const getImages = async() => {
    let filenames = await API.getFileNames(token);
    if(!filenames.images)
      return

    let blobs = [];
    for(const name of filenames.images)
      blobs.push({img: await API.getImage(token, name), name });

    console.log(blobs);
    setImages(blobs);
  }

  useEffect(() => {
    if(token){
      getImages();
    }
  }, [lastSubmit, token])
  
  return(
    <div className="body">

      {/* <HashRouter>
        <Switch>
          <Route path="/login"><Login login={login}/></Route>
          <Redirect to="/login"/>
        </Switch>
      </HashRouter> */}

      {!token ? <Login login={login} signup={signup}/> : ""}

      <Header token={token} onFileSubmit={onFileSubmit}/>
      <div className="content">
        <Sidebar/>
        <Images images={images}/>
      </div> 

    </div>
  )
};

export default App;