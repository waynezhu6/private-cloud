// a collection of IO helper functions

const fs = require('fs');
const Path = require('path');
const { BASE_PATH = './uploads' } = process.env;


async function hasFile(uuid, path){
  // returns true if this path is valid
  path = Path.join(BASE_PATH, uuid, path);
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
    path = Path.join(BASE_PATH, uuid, path);
    stat = await fs.promises.lstat(path);
    return stat.isDirectory();
  }
  catch{
    return false;
  }
}


async function deleteFile(uuid, path){
  // deletes the file at path, if it exists
  // TODO
  try{
    path = Path.join(BASE_PATH, uuid, path);
    await fs.promises.unlink(path);
  }
  catch{
    throw Error(`Unable to delete file '${path}'`);
  }
}


async function createDir(uuid, path){
  // create a new folder for this user at path
  try{
    if(!await hasFile(uuid, path)){
      path = Path.join(BASE_PATH, uuid, path);
      return await fs.promises.mkdir(path);
    }
  }
  catch{
    throw Error(`Unable to create directory '${path}'`);
  }
}


function getFilePath(uuid, path){
  // returns formatted file path
  path = Path.join(BASE_PATH, uuid, path);
}


const IO = { 
  hasFile,
  createDir, 
  isDirectory,
  getFilePath, 
  deleteFile
};

module.exports = IO;
