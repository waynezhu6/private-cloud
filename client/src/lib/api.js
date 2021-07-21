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


const signout = async(username, password) => {
  // request delete token cookie to sign out
  let res = await fetch(SERVER_URL + "auth", {
    method: "DELETE",
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json'
    }
  });
}


const isAuthorized = async(username, password) => {
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


// const getFileInfo = async(token, filename) => {
//   //gets images
//   let res = await fetch(SERVER_URL + "files/" + filename, {
//     method: "GET",
//     headers: {
//       'x-token': token,
//       'Content-Type': 'image/*'
//     }
//   })
//   const blob = await res.blob();
//   return URL.createObjectURL(blob);
// }


const getMetadata = async(filename) => {
  //gets images
  let res = await fetch(SERVER_URL + "metadata/" + filename, {
    method: "GET",
    credentials: 'include'
  })
  .then(res => res.json());
  return res;
}


const uploadFile = async(body, token) => {
  await fetch(SERVER_URL + "files", {
    method: "POST",
    body: body,
    headers: {
      'x-token': token,
    },
  })
  .then(res => console.log(res));
}


const PrivateCloud = { 
  login, 
  signup,
  isAuthorized,
  signout,
  uploadFile, 
  //getFileInfo,
  getMetadata
};
export default PrivateCloud;
