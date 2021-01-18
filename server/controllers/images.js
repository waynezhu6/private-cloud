const db = require('../db/index');

const GET = async(req, res) => {
  //return one or more images
  let query = req.query;
  console.log(query.f);
  if(!query.f){
    let filenames = await db.getFileNames(req.userID);
    res.json({images: filenames});
  }
  else{
    res.sendFile(query.f, { root: './uploads/' + req.userID });
  }
}

const POST = (req, res) => {
  console.log(req.files);
  let names = req.files.map((file) => file.originalname);
  db.addImage(req.userID, names);
  res.send();
}

const DELETE = () => {

}

module.exports = { GET, POST, DELETE };
