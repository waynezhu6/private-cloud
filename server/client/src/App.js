import React, { useRef } from "react";
import API from "./lib/api";
import './App.css';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Images from './components/Images';
import Login from './components/Login';

const App = () => {

  const [token, setToken] = API.useToken();
  const form = useRef(null);

  // const onFileChange = (e) => { 
  //   setFiles([e.target.files[0]]);
  //   console.log(e.target.files[0]);
  // }

  const onFileSubmit = (e) => {
    setToken(token); //not a great way to force rerender, but it works
  }

  const login = async(username, password) => {
    setToken(await API.login(username, password));
  }

  const signup = async(username, password) => {
    setToken(await API.signup(username, password));
  }
  
  return(
    <div className="body">

      {!token ? <Login login={login} signup={signup}/> : ""}

      <Header token={token} onFileSubmit={onFileSubmit}/>
      <div className="content">
        <Sidebar/>
        <Images token={token}/>

        {/* <div style={{backgroundColor: "white", flex: 1}}>
          <form action="" ref={form} onSubmit={() => onFileSubmit()}>
            <input type="file" name="image"/>
            <input type="submit"/>
          </form>

          <button onClick={async() => setToken(await API.login("user1", "1234"))}>
            test login
          </button>

          <button onClick={async() => await API.getImage(token)}>
            test get image
          </button>

          <button onClick={async() => await API.signup("user1", "1234")}>
            test signup
          </button>
        </div> */}

      </div> 

    </div>
  )
};

export default App;