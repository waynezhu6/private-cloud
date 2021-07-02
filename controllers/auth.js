const { verifyUser, createUser, hasUser } = require('../db/users');
const { encodeToken, decodeToken } = require('../utils/jwt');
const IO = require('../utils/io');


const jwtAuthentication = async(req, res, next) => {
  // injects userID into request if token is valid
  const jwt_header = req.header('x-token');
  const jwt_cookie = req.cookies.token;
  if(!jwt_header && !jwt_cookie)
    return next();

  try{
    let token = jwt_header || jwt_cookie;
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
  // allows request to pass only if user is authenticated
  if(req.userID)
    return next();

  res.status(401);
  res.json({ error: 'User not authenticated' });
}


const isAuthorized = async(req, res) => {
  // returns true if user has valid token cookie
  const token = req.cookies.token;
  if(!token){
    res.json({ isAuthorized: false });
    return;
  }

  try{
    const { userID } = decodeToken(token);
    const userExists = await hasUser(userID);
    res.json({ isAuthorized: userExists });
  }
  catch{
    res.json({ isAuthorized: false });
  }
}


const jwtLogin = async(req, res) => {
  // returns token if login successful
  // also sets token as httpOnly cookie
  const { username, password } = req.body;
  const userID = await verifyUser(username, password);

  if(!userID){
    res.status(401);
    return res.json({ error: 'Incorrect username or password'});
  }

  const token = encodeToken({ userID }); 
  res.cookie('token', token, { 
    httpOnly: true,
    maxAge: 60*60*1000,
    secure: process.env.NODE_ENV !== "development"
  });
  res.setHeader('Access-Control-Allow-Credentials', true);
  return res.json({ token });
}


const jwtSignup = async(req, res) => {
  //returns true if signup successful
  const { username, password } = req.body;
  let userID = await createUser(username, password);
  if(userID){
    IO.createDir(userID); // create the root folder for this user
    const token = encodeToken({ userID }); 
    return res.json({ token });
  }
  else{
    res.json({ error: "username already exists "});
  }
}


module.exports = { 
  jwtAuthentication, 
  isAuthenticated, 
  isAuthorized, 
  jwtLogin, 
  jwtSignup 
};
