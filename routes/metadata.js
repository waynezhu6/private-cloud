// endpoints for file content actions

const express = require('express');
const metadata = require('../controllers/metadata');
const router = express.Router({ mergeParams: true });

router.get('/:path(*)', metadata.getMetadata);

module.exports = router;
