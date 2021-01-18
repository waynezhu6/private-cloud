const mongoose = require('mongoose');
const { User, Images } = require('./models');

const MONGO_URL = "mongodb://localhost:27017/mydb";
mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to db');
});

const login = async(username, password) => {
  //returns userID if can login, otherwise false
  let res = await User.find({ username, password });
  if(res.length){
    return res[0]._id;
  }
  return false;
}

const signup = async(username, password) => {
  //
  let res = await User.find({ username });

  if(!res.length){
    let user = new User({ username, password, image: [] });
    user.save();
    return user._id;
  }
  return false;
}

const hasUser = async(userID) => {
  //returns true if this userID exists
  let res = await User.find({ _id: userID });
  return res.length > 0;
}

const addImage = async(userID, filenames) => {
  let user = await User.find({ _id: userID });
  user = user[0];
  if(user){
    for(const filename of filenames)
      user.images.push(filename);

    user.save();
  }
}

const removeImage = async(userID, filename) => {
  let user = await User.find({ _id: userID });
  user = user[0];
}

const getImage = (userID, filename) => {

}

const getFileNames = async(userID) => {
  let user = await User.find({ _id: userID });
  if(user.length > 0)
    return user[0].images;
}

const deleteImage = (index) => {

}

module.exports = { login, signup, hasUser, addImage, getFileNames };
