// functions for setting public/private file access
const { File } = require('./models');

async function setTags(uuid, path, tags, append){
  // returns true if file at path is public
  let file = await File.findOne({owner: uuid, path});
  if(!file)
    return;

  if(append){
    await File.updateOne(
      { owner: uuid, path },
      { $push: { tags } }
    );
  }
  else{
    await File.updateOne(
      { owner: uuid, path },
      { $set: { tags } }
    );
  }

}

module.exports = { setTags };
