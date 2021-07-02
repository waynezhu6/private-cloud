// endpoints for file content actions

const express = require('express');
const upload = require('../controllers/multer');
const files = require('../controllers/files');
const router = express.Router({ mergeParams: true });

router.get('/meta/:path', files.getFileInfo);
router.get('/:path', files.getFile);
router.post('/', upload.array('file'), files.uploadFile);
router.put('/', files.updateFile)
router.delete('/', files.deleteFile);

router.use('/', (req, res) => res.sendStatus(404));

module.exports = router;
