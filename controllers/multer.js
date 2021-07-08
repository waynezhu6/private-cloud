// configurations for multer
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const IO = require('../utils/io');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = path.resolve("uploads/", req.uuid, req.params.path || '/');
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName);
  }
});


const filter = async(req, file, cb) => {
  let path = req.params.path || '/';
  let uuid = req.uuid;
  let parentIsDir = await IO.isDirectory(uuid, path);
  let createDir = !await IO.hasFile(uuid, path);

  if(!parentIsDir || createDir){
    return cb(null, false);
  }
  cb(null, true);
}


const upload = multer({
  storage: storage,
  fileFilter: filter
});


module.exports = upload;
// module.exports = upload;
