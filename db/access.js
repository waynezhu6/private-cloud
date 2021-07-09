// functions for setting public/private file access
const Path = require('path');
const { File } = require('./models');

async function _isPublic(uuid, path){
  // recursively checks if this path is available, from path up

  let file = await File.findOne({owner: uuid, path});
  if(!file)
    return false;

  if(file.isPublic){
    return true;
  }
  else{
    if(file.path == '/')
      return false;

    let parentPath = Path.posix.dirname(path);
    return _isPublic(uuid, parentPath);
  }
}

async function get(uuid, path){
  // returns true if file at path is public
  return await _isPublic(uuid, path);
}

async function set(uuid, path, isPublic){
  // set the access level for file at 'path' to 'isPublic'
  let file = await Files.findOne({owner: uuid, path});
  if(!file)
    return;

  File.updateOne(
    { owner: uuid, path},
    { isPublic }
  );
}

const Access = { get, set };
module.exports = Access;
