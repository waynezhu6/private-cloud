// endpoints for file content actions

const express = require('express');
const upload = require('../controllers/multer');
const files = require('../controllers/files');
const router = express.Router({ mergeParams: true });

router.get('/:username/:path', files.GET);
router.post('/', upload.array('image'), files.POST);
router.put('/', files.PUT)
router.delete('/', (req, res) => {});

module.exports = router;