// database functions for login/signup
const { User, File } = require('./models');
const { v4: uuidv4 } = require('uuid');

const verifyUser = async(username, password) => {
  // returns user id if credentials are correct
  try{
    let res = await User.findOne({ username, password });
    if(res){
      return res.uuid;
    }
    throw Error();
  }
  catch{
    throw Error(`User '${username}' could not be verified`);
  }
}

const createUser = async(username, password) => {
  // creates a new user, returning user id if successful
  try{
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
    throw Error();
  }
  catch{
    throw Error(`Could not create user '${username}'`);
  }

}

const hasUser = async(uuid) => {
  //returns true if this user exists
  try{
    return await User.exists({ uuid });
  }
  catch{
    throw Error(`User '${uuid}' could not be verified`);
  }
}

module.exports = { verifyUser, createUser, hasUser };
