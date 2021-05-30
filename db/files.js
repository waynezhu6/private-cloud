// database functions for manipulating file metadata
const Path = require('path');
const { Files } = require('./models');

async function getFile(uuid, path){
  // returns db file object, or undefined
  let file = await Files.exists({ uuid, files: { $elemMatch: { path } } });
  return file;
}

async function createFile(uuid, file){
  // creates file with 'file' metadata
  // assumes file data is accurate

  const { path } = file;
  const parentPath = Path.dirname(path);
  let fileExists = await getFile(uuid, path);
  let parentExists = await getFile(uuid, parentPath);

  if(!fileExists && parentExists && path !== "/"){

    // insert into files collection
    await Files.updateOne(
      { uuid }, 
      { $push : { files : file } }
    );

    // update children files for parent
    await Files.updateOne(
      { uuid, 'files.path': parentPath }, 
      { $push: { 'files.$.files': { path } } 
    });

  }
}

async function deleteFile(uuid, path){
  // delete the file at this path
  let file = getFile(uuid, path);

  if(file && path !== "/"){
    const parentPath = Path.dirname(path);
    // await Files.deleteOne({ uuid, 'files.path': path });
    await Files.updateOne(
      { uuid, 'files.path': parentPath }, 
      { $pull: { 'files.$.files': { path } } 
    });
  }
}

async function updateFile(uuid, file){
  // update file metadata
  if(hasFile(path)){

  }
}

// async function createDir(userID, file){
//   // creates a new directory in file metadata
//   // file has the shape of a file defined in the files schema
//   // returns true on success
//   let parent = Path.dirname(file.path);
//   let res = await Files.find({ uuid: userID });
//   if(res.length){
//     res[0].files.push(file);
//     res[0].save();
//     return true;
//   }
//   return false;
// }

// async function updateFile(username, file){
//   // updates 'file' metadata
//   let res = await Files.update(
//     {username, "files.path": file.path},
//     {$set: {"files.$": file}}
//   );
//   return;
// }

// async function deleteFile(username, path){
//   // deletes file at 'path'
// }

const Meta = { getFile, createFile, updateFile, deleteFile }
module.exports = Meta;