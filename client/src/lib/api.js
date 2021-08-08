const SERVER_URL = process.env.REACT_APP_BASE_URL || "http://34.123.191.140:5000/api/";

const login = async(username, password) => {
  //returns access token if successful
  let res = await fetch(SERVER_URL + "auth/login", {
    method: "POST",
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ username, password, cookie: true })
  })
  .then(res => res.json())
  return res.token;
}


const signup = async(username, password) => {
  //returns true if signup successful
  let res = await fetch(SERVER_URL + "auth/signup", {
    method: "POST",
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.json())
  return res.token;
}


const signout = async() => {
  // request delete token cookie to sign out
  let res = await fetch(SERVER_URL + "auth", {
    method: "DELETE",
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json'
    }
  });
}


const isAuthorized = async() => {
  // returns true if this user is logged in
  let res = await fetch(SERVER_URL + "auth", {
    method: "GET",
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    credentials: 'include'
  })
  .then(res => res.json())
  return res.isAuthorized;
}


const getMetadata = async(path) => {
  //gets images
  let res = await fetch(SERVER_URL + "metadata/" + path, {
    method: "GET",
    credentials: 'include'
  })
  .then(res => res.json());
  return res;
}


const uploadFile = async(path, body) => {
  return await fetch(SERVER_URL + "file/" + path, {
    method: "POST",
    body: body,
    credentials: 'include'
  })
  .then(res => res.json());
}

const updateFile = async(path, fileData) => {
  await fetch(SERVER_URL + "file/" + path, {
    method: "PUT",

  })
}


const deleteFile = async(path) => {
  await fetch(`${SERVER_URL}file/${path}`, {
    method: 'DELETE',
    credentials: 'include'
  });
}


const setTags = async(path, tags, append) => {
  await fetch(`${SERVER_URL}file/${path}`, {
    method: 'POST',
    body: { tags, append },
    credentials: 'include'
  });
}


const PrivateCloud = { 
  login, 
  signup,
  isAuthorized,
  signout,
  getMetadata,
  uploadFile, 
  updateFile,
  deleteFile,
  setTags
};
export default PrivateCloud;
