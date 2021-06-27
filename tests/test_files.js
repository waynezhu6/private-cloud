const mongoose = require('mongoose');
const { getFile, createFile, updateFile, deleteFile } = require('../db/files');

const MONGO_URL = "mongodb://localhost:27017/private-cloud";
mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to db');
  main();
});

const main = async() => {
  const uuid = '088c235a-dbc6-4783-9989-c065ebb7807e';
  // createFile(
  //   uuid, 
  //   { 
  //     isDir: true,
  //     isPublic: false,

  //     name: 'test1.txt',
  //     path: '/test1.txt',
  //     parent: '/',

  //     fileType: '.txt',
  //     lastModified: Date.now(),
  //     files: []
  //   }
  // );
  deleteFile(uuid, '/test1.txt')
}