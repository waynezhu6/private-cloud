// controller for setting file tags

const Path = require('path');
const IO = require('../utils/io');
const { setTags } = require('../db/tag');

const POST = async(req, res) => {
  try{
    let path = Path.posix.join('/', req.params.path || '/');
    let uuid = req.uuid;
    let tags = req.body.tags || [];
    let append = req.body.append;

    if(!await IO.hasFile(uuid, path)){
      res.status(404);
      return res.send({error: `File '${path}' not found`});
    }

    setTags(uuid, path, tags, append);
    res.status(200).send();
  }
  catch(err){
    res.status(500);
    res.send({ error: 'Unable to fulfill request' });
  }
}

module.exports = { POST };
