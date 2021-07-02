// database functions for manipulating file metadata
const Path = require('path');
const { File } = require('./models');

async function hasFile(uuid, path){
  // returns true if the file at path exists for this user
  let file = await File.exists({ owner: uuid, path });
  return file;
}

async function getFile(uuid, path){
  // returns this file's metadata, or undefined if path is not a dir
  let file = File.findOne({ owner: uuid, path });
  return file || undefined;
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
    // don't allow deleting root folder
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
  if(!file)
    return

  let updated = { ...file, ...fileData };
  File.updateOne(
    { owner: uuid, path},
    { ...updated }
  )
}

module.exports = { hasFile, getFile, createFile, updateFile, deleteFile };
