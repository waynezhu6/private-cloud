// endpoint for getting/setting public file access

const express = require('express');
const public = require('../controllers/public');
const router = express.Router({ mergeParams: true });
const { hasParams } = require('../utils/middleware');

router.get("/:uuid/:path(*)", hasParams("uuid", "path"), public.GET);

module.exports = router;
