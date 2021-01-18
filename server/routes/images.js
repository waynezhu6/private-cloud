const express = require('express');
const upload = require('../controllers/multer');
const images = require('../controllers/images');
const router = express.Router({ mergeParams: true });

router.get('/', images.GET);
router.post('/', upload.array('image'), images.POST);
router.delete('/', (req, res) => {});

module.exports = router;