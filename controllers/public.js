// controller for accessing publicly available files

const Path = require('path');
const IO = require('../utils/io');
const Access = require('../db/access');

const GET = async(req, res) => {
  // retrieve public file
  try{
    let { username, path } = req.params;
    if(await IO.hasFile(username, path) && await Access.get(username, path)){
      let fullPath = Path.posix.join(__dirname, 'uploads', username, path);
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
