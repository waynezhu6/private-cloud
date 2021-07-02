const njwt = require('njwt');
const secureRandom = require('secure-random');
require('dotenv').config();

const {
  APP_SECRET = secureRandom.randomBuffer(256),
} = process.env;

const encodeToken = (data) => {
  // encode data into jwt
  let jwt = njwt.create(data, APP_SECRET);
  jwt.setExpiration(new Date().getTime() + (60*60*1000)); // One hour from now
  return jwt.compact();
}

const decodeToken = (data) => {
  // return jwt body, or undefined if unable to verify
  try{
    return njwt.verify(data, APP_SECRET).body;
  }
  catch{
    return undefined;
  }
}

module.exports = { encodeToken, decodeToken };
