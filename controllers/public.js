// controller for accessing publicly available files

const db = require('../db/index');
const IO = require('../utils/io');
const Access = require('../db/access');

const GET = async(req, res) => {
  try{
    let { username, path } = req.params;
    if(await IO.hasFile(username, path) && await Access.get(username, path)){
      res.sendFile(path.join(__dirname, `/uploads/${username}/${path}`));
    }
    else{
      res.sendFile(path.join(__dirname, '/404.html'));
    }
  }
  catch(err){
    res.status(500);
    res.send({ error: 'Unable to fulfill request' });
  }

}

module.exports = { GET }
