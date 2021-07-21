// endpoint for publically accessing files

const express = require('express');
const public = require('../controllers/public');
const router = express.Router({ mergeParams: true });
const { hasParams } = require('../utils/middleware');

router.get("/:username/:path(*)", hasParams("username", "path"), public.GET);

module.exports = router;
