const { verifyUser, createUser, hasUser } = require('../db/users');
const { encodeToken, decodeToken } = require('../utils/jwt');
const { createDir } = require('../utils/io');

const jwtAuthentication = async(req, res, next) => {
  //injects userID into request if token is valid
  const token = req.header('x-token');
  if(!token)
    return next();

  try{
    const { userID } = decodeToken(token);;
    const userExists = await hasUser(userID);
    if(userExists)
      req.userID = userID;
    return next();
  }
  catch(e){
    return next();
  }
}

const isAuthenticated = async(req, res, next) => {
  //allows request to pass only if user is authenticated
  if(req.userID)
    return next();

  res.status(401);
  res.json({ error: 'User not authenticated' });
}

const jwtLogin = async(req, res) => {
  //returns token if login successful
  const { username, password } = req.body;
  const userID = await verifyUser(username, password);

  if(!userID){
    res.status(401);
    return res.json({ error: 'Incorrect username or password'});
  }

  const token = encodeToken({ userID }); 
  return res.json({ token });
}

const jwtSignup = async(req, res) => {
  //returns true if signup successful
  const { username, password } = req.body;
  let userID = await createUser(username, password);
  if(userID){
    createDir(userID); // create the root folder for this user
    const token = encodeToken({ userID }); 
    return res.json({ token });
  }
}

module.exports = { jwtAuthentication, isAuthenticated, jwtLogin, jwtSignup };