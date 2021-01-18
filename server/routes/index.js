const express = require('express');
const images = require('./images');
const login = require('./login');
const auth = require('../controllers/auth');
const router = express.Router();

router.use('/api/images', [
  auth.jwtAuthentication, 
  auth.isAuthenticated
], images);
router.use('/api/auth', login);

module.exports = router;