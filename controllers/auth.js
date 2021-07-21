const Users = require('../db/users');
const IO = require('../utils/io');
const JWT = require('../utils/jwt');


const jwtAuthentication = async(req, res, next) => {
  // injects uuid into request if token is valid
  const jwt_header = req.header('x-token');
  const jwt_cookie = req.cookies.token;

  if(!jwt_header && !jwt_cookie){
    return next();
  }

  try{
    let token = jwt_header || jwt_cookie;
    const { uuid } = JWT.decodeToken(token);;
    const userExists = await Users.hasUser(uuid);
    if(userExists){
      req.uuid = uuid;
    }
    return next();
  }
  catch(e){
    return next();
  }
}


const isAuthenticated = async(req, res, next) => {
  // allows request to pass only if user is authenticated
  if(req.uuid){
    return next();
  }

  res.status(401);
  res.json({ error: 'User not authenticated' });
}


const isAuthorized = async(req, res) => {
  // returns true if user has valid token cookie or header
  const jwt_header = req.header('x-token');
  const jwt_cookie = req.cookies.token;

  if(!jwt_header && !jwt_cookie){
    return res.json({ isAuthorized: false });
  }

  try{
    let token = jwt_header || jwt_cookie;
    const { uuid } = JWT.decodeToken(token);
    const userExists = await Users.hasUser(uuid);
    res.json({ isAuthorized: userExists });
  }
  catch{
    res.status(404);
    res.json({ isAuthorized: false, error: 'User not authorized' });
  }
}


const removeAuth = (req, res) => {
  // delete the httpOnly token cookie from this client
  res.clearCookie('token');
}


const jwtLogin = async(req, res) => {
  // returns token if login successful
  // also sets token as httpOnly cookie
  try{
    const { username, password, cookie } = req.body;
    const uuid = await Users.verifyUser(username, password);
    const token = JWT.encodeToken({ uuid }); 
    
    if(cookie){
      res.cookie('token', token, { 
        httpOnly: true,
        maxAge: 24*60*60*1000, // expire in 1 day
        secure: process.env.NODE_ENV !== "development"
      });
    }

    res.setHeader('Access-Control-Allow-Credentials', true);
    return res.json({ token });
  }
  catch{
    res.status(401);
    return res.json({ error: 'Incorrect username or password'});
  }
}


const jwtSignup = async(req, res) => {
  //returns true if signup successful
  try{
    const { username, password } = req.body;
    let uuid = await Users.createUser(username, password);
    IO.createDir(uuid, ''); // create the root folder for this user
    const token = JWT.encodeToken({ uuid }); 
    return res.json({ token });
  }
  catch{
    res.status(400);
    res.json({ error: "Invalid username or password"});
  }

}


module.exports = { 
  jwtAuthentication, 
  isAuthenticated, 
  isAuthorized, 
  removeAuth,
  jwtLogin, 
  jwtSignup 
};
