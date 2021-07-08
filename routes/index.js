const express = require('express');
const auth = require('./auth');
const file = require('./file');
const metadata = require('./metadata');
const public = require('./public');
const { jwtAuthentication, isAuthenticated } = require('../controllers/auth');
const router = express.Router();

router.use('/api/auth', auth);
router.use('/api/file', [jwtAuthentication, isAuthenticated], file);
router.use('/api/metadata', [jwtAuthentication, isAuthenticated], metadata);
router.use('/public', public);

module.exports = router;
