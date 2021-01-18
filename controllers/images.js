const db = require('../db/index');

const GET = async(req, res) => {
  //return one or more images
  //console.log(req.params);
  if(!req.params.id){
    let filenames = await db.getFileNames(req.userID);
    res.json({images: filenames});
  }
  else{
    res.sendFile(req.params.id, { root: './uploads/' + req.userID });
  }
}

const POST = (req, res) => {
  //adds images
  let names = req.files.map((file) => file.originalname);
  db.addImage(req.userID, names);
  res.send();
}

const DELETE = () => {
  //removes image
}

module.exports = { GET, POST, DELETE };
