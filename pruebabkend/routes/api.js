var express = require('express');
var router = express.Router();
var apiVideos = require('./api/videos');

router.use('/videos',apiVideos);

module.exports = router;
