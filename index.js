const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const http = require('http');
const routes = require('./routes/index');
const PORT = process.env.PORT || 5000;

require('./db/index');

const app = express();
app.use(cors({ exposedHeaders: 'x-token' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);
app.use('/static', express.static(path.join(__dirname, 'uploads')));

app.use(express.static(path.join(__dirname, '/client/build')));
app.use('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/404.html'));
});
app.use('', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});


const server = http.createServer(app); // express uses this
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});