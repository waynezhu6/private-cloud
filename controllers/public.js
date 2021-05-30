// controller for accessing publicly available files

const db = require('../db/index');
const { existsFile } = require('../utils/io');
const { getAccess, setAccess } = require('../db/accessControl');

const GET = async(req, res) => {
  let { username, path } = req.params;
  if(await existsFile(username, path) && await getAccess(username, path)){
    res.sendFile(path.join(__dirname, `/uploads/${username}/${path}`));
  }
  else{
    res.sendFile(path.join(__dirname, '/404.html'));
  }
}

module.exports = { GET }