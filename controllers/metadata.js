const Path = require('path');
const IO = require('../utils/io');
const Metadata = require('../db/metadata');

const getMetadata = async(req, res) => {
  // return file info
  try{
    let path = Path.posix.join(req.params.path || '/');
    let uuid = req.uuid;
  
    if(await IO.hasFile(uuid, path)){
      res.status(200);
      return res.json(await Metadata.getFile(uuid, path));
    }
    else{
      res.status(404);
      return res.send({error: `File '${path}' not found`});
    }
  }
  catch(err){
    res.status(500);
    res.send({ error: err.toString() });
  }

}

module.exports = { getMetadata };
