const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  uuid: String
});
const User = new mongoose.model('User', UserSchema);

const FileSchema = new mongoose.Schema({
  owner: String, // file owner
  isDir: Boolean, // true if dir
  isPublic: Boolean, // true if file is public

  name: String, // file name
  path: String, // full file path
  parent: String | undefined, // name of parent

  fileType: String | undefined, // file extension type
  lastModified: Number, // last modified date
  files: [{path: String}], // file paths of children files (if dir)
});
const File = new mongoose.model('File', FileSchema);

module.exports = { User, File };