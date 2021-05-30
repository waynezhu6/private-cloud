const { Files } = require('./models');

async function getAccess(username, path){
  // returns true if file at path is public
  let res = await Files.find({username});
  if(!res.public)
    return false;

  for(let i = 0; i < res.public.length; i++){
    if(path.includes(res.public[i]))
      return true;
  }
  return false;
}

async function setAccess(username, path, isPublic){
  // set the access level for file at 'path' to 'isPublic'
}

const AccessControl = { getAccess, setAccess };
module.exports = AccessControl;