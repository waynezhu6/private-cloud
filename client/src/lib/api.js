import { useState } from "react";

const SERVER_URL = process.env.REACT_APP_BASE_URL || "http://34.123.191.140:5000/api/";

const useToken = () => {
  const [token, setToken] = useState(null);
  return [token, setToken];
}

const login = async(username, password) => {
  //returns access token if successful
  let res = await fetch(SERVER_URL + "auth/login", {
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

const getFileNames = async(token) => {
  //gets all image filenames of this user
  let res = await fetch(SERVER_URL + "files", {
    method: "GET",
    headers: {
      'x-token': token,
      'Content-Type':'application/json',
      'Accept':'application/json'
    }
  })
  .then(res => res.json());
  return res;
}

const getImage = async(token, filename) => {
  //gets images
  let res = await fetch(SERVER_URL + "files/" + filename, {
    method: "GET",
    headers: {
      'x-token': token,
      'Content-Type': 'image/*'
    }
  })
  const blob = await res.blob();
  return URL.createObjectURL(blob);
}

const uploadImage = async(body, token) => {
  await fetch(SERVER_URL + "files", {
    method: "POST",
    body: body,
    headers: {
      'x-token': token,
    }
  })
  .then(res => console.log(res));
}

const API = { login, signup, getImage, uploadImage, getFileNames, useToken };
export default API;