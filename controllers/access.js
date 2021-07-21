// controller for accessing publicly available files

const Path = require('path');
const Access = require('../db/access');

const POST = async(req, res) => {
  // retrieve public file
  try{
    let path = Path.posix.join(req.params.path || '/');
    let uuid = req.uuid;
    let isPublic = req.body.isPublic;

    await Access.set(uuid, path, isPublic);
  }
  catch(err){
    res.status(500);
    res.send({ error: 'Unable to fulfill request' });
  }
}

module.exports = { POST }
