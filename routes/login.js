const express = require('express');
const auth = require('../controllers/auth');
const router = express.Router({ mergeParams: true });

router.post('/login', auth.jwtLogin);
router.post('/signup', auth.signup);

module.exports = router;