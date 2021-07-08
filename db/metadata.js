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
  const parentPath = Path.dirname(path);
  let parentExists = await IO.hasFile(uuid, parentPath);

  console.log(parentPath, parentExists);

  if(parentExists && path !== "/"){
    
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
  let file = IO.hasFile(uuid, path);

  if(file && path !== "/"){
    // don't allow deleting root folder

    // let res1 = await File.find({ 
    //   owner: uuid, 
    //   path: { $regex: new RegExp('^' + path), $options: 'i'}
    // });

    // console.log(res1);

    console.log(new RegExp('^' + path));

    let res = await File.deleteMany({ 
      owner: uuid, 
      path: { $regex: new RegExp('^' + path), $options: 'i'}
    });

    console.log(res);

    // const parentPath = Path.dirname(path);
    // await File.updateOne(
    //   { owner: uuid, path: parentPath }, 
    //   { $pull: { files: { path } } 
    // });
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

  console.log(updated);
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
