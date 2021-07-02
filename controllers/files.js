// controller for private files

const IO = require('../utils/io');
const Metadata = require('../db/files');


const getFile = async(req, res) => {
  // return one or more files
  let { path } = req.params;
  let uuid = req.userID;

  console.log('getFile', path);

  if(uuid && path){
    if(await IO.hasFile(uuid, path)){
      res.status(200);
      res.sendFile(getFilePath(path));
    }
    else{
      res.status(404);
      res.send({error: "File not found"});
    }
  }
  else{
    res.status(400);
    res.send({error: "Invalid request. File path not provided"});
  }
}


const getFileInfo = async(req, res) => {
  // return file info
  let { path } = req.params;
  let uuid = req.userID;

  console.log('getFileInfo', path);

  if(uuid && path){
    if(await IO.hasFile(uuid, path)){
      res.status(200);
      res.sendFile(Metadata.getFile(path));
    }
    else{
      res.status(404);
      res.send({error: "File not found"});
    }
  }
  else{
    res.status(400);
    res.send({error: "Invalid request. File path not provided"});
  }
}


const uploadFile = (req, res) => {
  // upload a file
  let parentPath = req.body.parent || '/';

  req.files.map((file) => {
    let fileData = {
      owner: req.userID,
      isDir: false,
      isPublic: false,
      size: file.size,

      name: file.originalname,
      path: parentPath + file.originalname,
      parent: parentPath,

      filetype: undefined,
      lastModified: Date.now(),
      files: []
    }
    Metadata.createFile(req.userID, fileData);
  });
  res.send();
}


const updateFile = (req, res) => {
  // update a file
}


const deleteFile = () => {
  // delete a file
}


module.exports = { 
  getFile, 
  getFileInfo,
  uploadFile,
  updateFile, 
  deleteFile
};
