// controlling raw file data

const db = require('../db/index');

const GET = async(req, res) => {
  // return one or more files
  let path = req.params.path;
  if(path){
    res.sendFile(req.params.id, { root: './uploads/' + req.userID });
  }
  else{
    res.send({error: "No path specified"});
  }
}

const POST = (req, res) => {
  //adds images
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

module.exports = { GET, POST, DELETE };
