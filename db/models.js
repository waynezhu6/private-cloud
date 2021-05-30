const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  uuid: String
});
const User = new mongoose.model('User', UserSchema);

const FilesSchema = new mongoose.Schema({
  username: String,
  uuid: String,
  files: [{
    name: String, // file name
    path: String, // full file path
    parent: String | undefined, // name of parent
    isDir: Boolean, // true if dir
    fileType: String | undefined, // file extension type
    lastModified: Number, // last modified date
    files: [{path: String}], // file paths of descendent files (if dir)
  }],
  public: [{path: String}]
});
const Files = new mongoose.model('Files', FilesSchema);

module.exports = { User, Files };