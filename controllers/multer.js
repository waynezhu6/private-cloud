const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = path.resolve("uploads/" + req.userID);
    mkdir(dir);
    cb(null, "uploads/" + req.userID);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName);
  }
});

const upload = multer({
  storage: storage
});

const mkdir = (dir) => {
  if(!fs.existsSync(dir))
    fs.mkdirSync(dir);
}

module.exports = upload;