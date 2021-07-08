const IO = require('../utils/io');
const Metadata = require('../db/metadata');

const getMetadata = async(req, res) => {
  // return file info
  try{
    let { path } = req.params;
    let uuid = req.uuid;
  
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
  catch(err){
    res.status(500);
    res.send({ error: err.toString() });
  }

}

module.exports = { getMetadata };
