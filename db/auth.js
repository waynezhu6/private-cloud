// database functions for login/signup
const { User, Files } = require('./models');
const { v4: uuidv4 } = require('uuid');

const login = async(username, password) => {
  // returns userID if can login, otherwise false
  let res = await User.find({ username, password });
  if(res.length){
    return res[0].uuid;
  }
  return false;
}

const signup = async(username, password) => {
  // returns user id upon successful signup
  let res = await User.find({ username });
  let uuid = uuidv4();

  if(!res.length){
    await _createUser({ username, password, uuid });
    await _createFiles({uuid, username, files: [], public: []});    
    return uuid;
  }
  return undefined;
}

const hasUser = async(userID) => {
  //returns true if this userID exists
  let res = await User.find({ uuid: userID });
  return res.length > 0;
}

const _createUser = async(config) => {
  // create a db user
  let user = new User({ ...config });
  user.save();
}

const _createFiles = async(config) => {
  // create a db file system
  let root = {
    name: '/',
    path: '/',
    isDir: true,
    fileType: undefined,
    lastModified: Date.now(),
    files: []
  }

  let file = new Files({
    ...config, 
    files: [root], 
    public: []
  });
  file.save();
}

module.exports = { login, signup, hasUser };
