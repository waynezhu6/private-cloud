const njwt = require('njwt');
const secureRandom = require('secure-random');

const {
  APP_SECRET = secureRandom.randomBuffer(256),
  APP_BASE_URL = 'http://localhost:5000'
} = process.env;

const encodeToken = (data) => {
  // encode data into jwt
  return njwt.create(data, APP_SECRET).compact();
}

const decodeToken = (data) => {
  // decode data jwt
  return njwt.verify(data, APP_SECRET).body;
}

module.exports = { encodeToken, decodeToken };