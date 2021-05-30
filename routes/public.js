// endpoint for publically accessing files

const express = require('express');
const public = require('../controllers/public');
const { hasParams } = require('../controllers/utils');
const router = express.Router({ mergeParams: true });

router.get("/:username/:path", hasParams("username", "path"), public.GET)

module.exports = router;