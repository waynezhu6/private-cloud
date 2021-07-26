// a collection of IO helper functions

const fs = require('fs');
const Path = require('path');
const { BASE_PATH = './uploads' } = process.env;


async function hasFile(uuid, path){
  // returns true if this path is valid
  path = Path.posix.join(BASE_PATH, uuid, path);
  try{
    await fs.promises.access(path, fs.constants.F_OK);
    return true;
  }
  catch{
    return false;
  }
}


async function isDirectory(uuid, path){
  // return true if file at path is a directory
  try{
    path = Path.posix.join(BASE_PATH, uuid, path);
    stat = await fs.promises.lstat(path);
    return stat.isDirectory();
  }
  catch{
    return false;
  }
}


async function deleteFile(uuid, path){
  // deletes the file at path, if it exists
  try{
    let fullPath = Path.posix.join(BASE_PATH, uuid, path);
    if(await isDirectory(uuid, path)){
      await fs.promises.rmdir(fullPath, { recursive: true });
    }
    else{
      await fs.promises.unlink(fullPath);
    }
  }
  catch{
    throw Error(`Unable to delete file '${path}'`);
  }
}


async function createDir(uuid, path){
  // create a new folder for this user at path
  try{
    if(!await hasFile(uuid, path)){
      let fullPath = Path.posix.join(BASE_PATH, uuid, path);
      return await fs.promises.mkdir(fullPath);
    }
  }
  catch{
    throw Error(`Unable to create directory '${path}'`);
  }
}


function getFilePath(uuid, path){
  // returns formatted file path
  return Path.posix.join(BASE_PATH, uuid, path);
}


function get(uuid, path){
  // return path to individual file, or to generated zip if path points to dir
  // TODO: perhaps return a callback to delete temp zip file
}


const IO = { 
  hasFile,
  createDir, 
  isDirectory,
  getFilePath, 
  deleteFile,
  get
};

module.exports = IO;
