// database functions for manipulating file metadata
const Path = require('path');
const { File } = require('./models');

async function hasFile(uuid, path){
  // returns db file object, or undefined
  let file = await File.exists({ owner: uuid, path });
  return file;
}

async function getFiles(uuid, path){
  // returns list of children files to this file
  let file = File.findOne({ owner: uuid, path });
  if(file){
    return file.files;
  }
  return undefined;
}

async function createFile(uuid, fileData){
  // creates file with 'file' metadata
  // assumes file data is valid

  const { path } = fileData;
  const parentPath = Path.dirname(path);
  let fileExists = await hasFile(uuid, path);
  let parentExists = await hasFile(uuid, parentPath);

  if(!fileExists && parentExists && path !== "/"){
    
    // insert into files collection
    let file = new File({ owner: uuid, ...fileData });
    file.save();

    // update children files for parent
    await File.updateOne(
      { owner: uuid, path: parentPath }, 
      { $push: { files: { path } } 
    });

  }
}

async function deleteFile(uuid, path){
  // delete the file at this path
  let file = await hasFile(uuid, path);

  if(file && path !== "/"){
    await File.deleteOne({ owner: uuid, path });

    const parentPath = Path.dirname(path);
    await File.updateOne(
      { owner: uuid, path: parentPath }, 
      { $pull: { files: { path } } 
    });
  }
}

async function updateFile(uuid, fileData){
  // update file metadata
  // assumes file data is valid
  const { path } = fileData;
  let file = File.findOne({ owner: uuid, path });

  if(file){

  }
}

module.exports = { hasFile, getFiles, createFile, updateFile, deleteFile };