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
  const uuid = '0fa2b904-cc02-4f56-8ce9-a75ef5429b0b';
  // createFile(
  //   uuid, 
  //   { 
  //     name: 'test1.txt',
  //     path: '/test1.txt',
  //     isDir: true,
  //     fileType: undefined,
  //     lastModified: Date.now(),
  //     files: []
  //   }
  // );
  deleteFile(uuid, '/test1.txt')
}