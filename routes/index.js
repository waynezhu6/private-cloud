const express = require('express');
const files = require('./files');
const public = require('./public');
const login = require('./auth');
const auth = require('../controllers/auth');
const router = express.Router();

router.use('/api/file', [
  auth.jwtAuthentication, 
  auth.isAuthenticated
], files);
router.use('/public', public);
router.use('/api/auth', login);

module.exports = router;
