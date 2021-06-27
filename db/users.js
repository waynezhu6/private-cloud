// database functions for login/signup
const { User, File } = require('./models');
const { v4: uuidv4 } = require('uuid');

const verifyUser = async(username, password) => {
  // returns user id if credentials are correct
  let res = await User.findOne({ username, password });
  if(res){
    return res.uuid;
  }
  return undefined;
}

const createUser = async(username, password) => {
  // creates a new user, returning user id if successful
  let res = await User.exists({ username });
  let uuid = uuidv4();

  if(!res){
    let user = new User({ username, password, uuid });
    user.save();

    let file = new File({
      owner: uuid,
      isDir: true,
      isPublic: false,

      name: '/',
      path: '/',
      parent: undefined,

      fileType: undefined,
      lastModified: Date.now(),
      files: []
    });
    file.save();

    return uuid;
  }
  return undefined;
}

const hasUser = async(userID) => {
  //returns true if this user exists
  return await User.exists({ uuid: userID });
}

module.exports = { verifyUser, createUser, hasUser };
