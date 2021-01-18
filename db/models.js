const mongoose = require('mongoose');

const ImagesSchema = new mongoose.Schema({
  url: String,
  private: Boolean
});
const Images = new mongoose.model('Image', ImagesSchema);

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  images: []
});
const User = new mongoose.model('User', UserSchema);

module.exports = { User, Images };