// controller for private files

const Path = require('path');
const IO = require('../utils/io');
const Metadata = require('../db/metadata');

const getFile = async(req, res) => {
  // return one or more files
  let path = req.params.path || '/';
  let uuid = req.uuid;

  if(await IO.isDirectory(uuid, path)){
    // TODO: instead, zip and send directory
    res.status(404);
    return res.send({error: 'Invalid file path. Cannot be a directory'});
  }

  if(uuid && path){
    if(await IO.hasFile(uuid, path)){
      res.status(200);
      res.sendFile(IO.getFilePath(uuid, path), {root: './'});
    }
    else{
      res.status(404);
      res.send({error: `File '${path}' not found`});
    }
  }
  else{
    res.status(400);
    res.send({error: 'Invalid request. File path not provided'});
  }
}


const uploadFile = async(req, res, next) => {
  // upload a file
  try{
    let path = req.params.path || '/';
    let uuid = req.uuid;
    let files = req.files || [];
    let parentIsDir = await IO.isDirectory(uuid, path);
    let createDir = !await IO.hasFile(uuid, path);
  
    if((!files || files.length == 0) && parentIsDir){
      res.status(400);
      return res.json({error: 'Must include file(s) to upload'});
    }
  
    if(createDir){
      let fileData = {
        owner: req.uuid,
        isDir: true,
        isPublic: false,
        size: 0,
  
        name: Path.basename(path),
        path,
        parent: Path.dirname(path),
  
        filetype: undefined,
        lastModified: Date.now(),
        files: []
      }
      IO.createDir(uuid, path);
      Metadata.createFile(uuid, fileData);
      return res.send();
    }
  
    files.filter(file => file.fieldname === 'files').map(async(file) => {
      let fileData = {
        owner: req.uuid,
        isDir: false,
        isPublic: false,
        size: file.size,
  
        name: file.originalname,
        path: Path.join(path, file.originalname),
        parent: path,
  
        filetype: Path.extname(file.originalname),
        lastModified: Date.now(),
        files: []
      }
      let fullPath = Path.join(path, file.originalname);
  
      if(!await Metadata.hasFile(uuid, fullPath))
        Metadata.createFile(uuid, fileData);
      else
        Metadata.updateFile(uuid, fileData);
    });
  
    return res.send();
  }
  catch(err){
    res.status(500);
    res.send({ error: err.toString() });
  }

}


const deleteFile = async(req, res) => {
  // delete a file
  try{
    let path = req.params.path || '/';
    let uuid = req.uuid;
    let hasFile = await IO.hasFile(uuid, path);
  
    if(path == "/"){
      res.status(400);
      return res.json({error: "Cannot delete user's root directory"});
    }
  
    if(!hasFile){
      res.status(404);
      return res.json({error: `Cannot delete '${path}', file not found`});
    }
  
    await Metadata.deleteFile(uuid, path);
    // await IO.deleteFile(uuid, path);
    return res.send();
  }
  catch(err){
    res.status(500);
    res.send({ error: err.toString() });
  }
  
}


module.exports = { 
  getFile, 
  uploadFile,
  deleteFile
};
