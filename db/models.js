const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  uuid: String
});
const User = new mongoose.model('User', UserSchema);

const FileSchema = new mongoose.Schema({
  owner: String, // file owner's uuid
  isDir: Boolean, // true if dir
  isPublic: Boolean, // true if file is public
  size: Number,

  name: String, // file name
  path: String, // full file path
  parent: String | undefined, // path of parent

  filetype: String | undefined, // file extension type
  tags: [{type: String}], // tags associated with this file
  lastModified: Number, // last modified date
  
  files: [{
    owner: String, // file owner's uuid
    isDir: Boolean, // true if dir
    isPublic: Boolean, // true if file is public
    size: Number,
  
    name: String, // file name
    path: String, // full file path
    parent: String | undefined, // path of parent
  
    filetype: String | undefined, // file extension type
    tags: [{type: String}], // tags associated with this file
    lastModified: Number // last modified date
  }], // file paths of children files (if dir)
});
const File = new mongoose.model('File', FileSchema);

module.exports = { User, File };
