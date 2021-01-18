const njwt = require('njwt');
const secureRandom = require('secure-random');
const db = require('../db/index');

const {
  APP_SECRET = secureRandom.randomBuffer(256),
  APP_BASE_URL = 'http://localhost:5000'
} = process.env;

const encodeToken = (data) => {
  return njwt.create(data, APP_SECRET).compact();
}

const decodeToken = (data) => {
  return njwt.verify(data, APP_SECRET).body;
}

const jwtAuthentication = async(req, res, next) => {
  //injects userID into request if token is valid
  const token = req.header('x-token');
  if(!token)
    return next();

  try{
    const decoded = decodeToken(token);
    const { userID } = decoded;
    const hasUser = await db.hasUser(userID);
    if(hasUser)
      req.userID = userID;
  }
  catch(e){
    return next();
  }
  finally{
    next();
  }
}

const isAuthenticated = async(req, res, next) => {
  //allows request to pass only if user is authenticated
  if(req.userID)
    return next();

  res.status(401);
  //res.json({ error: 'User not authenticated!' });
}

const jwtLogin = async(req, res) => {
  //returns token if login successful
  const { username, password } = req.body;
  const userID = await db.login(username, password);

  if(!userID){
    res.status(401);
    return res.json({ error: 'Incorrect username or password!'});
  }

  const token = encodeToken({ userID }); 
  return res.json({ token });
}

const signup = async(req, res) => {
  //returns true if signup successful
  const { username, password } = req.body;
  let result = await db.signup(username, password);
  if(result){
    const token = encodeToken({ result }); 
    return res.json({ token });
  }
}

module.exports = { jwtLogin, jwtAuthentication, isAuthenticated, signup };