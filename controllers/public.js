// controller for getting publicly available files

const Path = require('path');
const IO = require('../utils/io');
const Access = require('../db/access');

const GET = async(req, res) => {
  // retrieve public file
  try{
    let { uuid, path } = req.params;
    if(await IO.hasFile(uuid, path) && await Access.get(uuid, path)){
      let fullPath = Path.posix.join(__dirname, 'uploads', uuid, path);
      res.sendFile(fullPath);
    }
    else{
      res.sendFile(Path.posix.join(__dirname, '/404.html'));
    }
  }
  catch(err){
    res.status(500);
    res.send({ error: 'Unable to fulfill request' });
  }
}

module.exports = { GET }
