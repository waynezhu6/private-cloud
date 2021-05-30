// controller for private files

const db = require('../db/index');
const { existsFile } = require('../utils/io');
const { getAccess, setAccess } = require('../db/accessControl');

const GET = async(req, res) => {
  // return one or more files
  let { username, path } = req.params;
  if(username && path){
    if(await existsFile(username, path)){
      
    }
    else{
      res.send({error: "File not found."});
    }
  }
  else{
    res.send({error: "Invalid username or filename!"});
  }
}

const POST = (req, res) => {
  //adds images
  console.log('hello');
  let names = req.files.map((file) => file.originalname);
  db.addImage(req.userID, names);
  res.send();
}

const PUT = (req, res) => {
  // update a file
}

const DELETE = () => {
  // delete a file
}

module.exports = { GET, POST, PUT, DELETE };
