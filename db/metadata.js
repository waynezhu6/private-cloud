// database functions for manipulating file metadata
const Path = require('path');
const { File } = require('./models');
const IO = require('../utils/io');


async function hasFile(uuid, path){
  // returns true if this file exists in db
  return File.exists({ owner: uuid, path });
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
  let parentPath = Path.posix.dirname(path);
  let parentExists = await IO.hasFile(uuid, parentPath);

  if(parentPath === "."){
    parentPath = "/";
  } 

  if(parentExists && path !== "/"){
    
    // insert into files collection
    let file = new File({ owner: uuid, ...fileData });
    file.save();

    // update children files for parent
    await File.updateOne(
      { owner: uuid, path: parentPath }, 
      { $push: { 
        files: { 
          path,
          isDir: fileData.isDir,
          name: fileData.name 
        } 
      } 
    });

  }
}


async function deleteFile(uuid, path){
  // delete the file at this path
  let parentPath = Path.dirname(path);

  if(parentPath === "."){
    parentPath = "/";
  }
  
  if(path !== "/"){
    // don't allow deleting root folder

    let res = await File.deleteMany({ 
      owner: uuid, 
      path: { $regex: new RegExp('^' + path), $options: 'i'}
    });
    console.log(res);
    console.log(parentPath, path);

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
  let file = await File.findOne({ owner: uuid, path });
  if(!file)
    return;

  let originalData = {
    owner: file.owner,
    isDir: file.isDir,
    isPublic: file.isPublic,
    size: file.size,

    name: file.name,
    path: file.path,
    parent: file.parent,

    filetype: file.filetype,
    lastModified: file.lastModified,
    files: file.files
  }

  let updated = { ...originalData, ...fileData };

  await File.updateOne(
    { owner: uuid, path},
    { ...updated }
  );
}


module.exports = { 
  hasFile,
  getFile, 
  createFile, 
  updateFile, 
  deleteFile 
};
