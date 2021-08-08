// endpoints for file content actions

const express = require('express');
const upload = require('../controllers/multer');
const file = require('../controllers/file');
const router = express.Router({ mergeParams: true });

router.get('/:path(*)', file.getFile);
router.post('/:path(*)', upload.array('files'), file.uploadFile);
router.put('/:path(*)', file.updateFile);
router.delete('/:path(*)', file.deleteFile);

module.exports = router;
