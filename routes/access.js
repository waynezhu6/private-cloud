const express = require('express');
const access = require('../controllers/access');
const router = express.Router({ mergeParams: true });
const { hasBody } = require('../utils/middleware');

router.post('/:path(*)', hasBody('isPublic'), access.POST);

module.exports = router;
