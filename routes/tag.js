// endpoints for getting and setting file tags

const express = require('express');
const tag = require('../controllers/tag');
const router = express.Router({ mergeParams: true });
const { hasBody } = require('../utils/middleware');

router.post("/:path(*)", hasBody('tags'), tag.POST);

module.exports = router;
