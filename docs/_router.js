var express = require('express');

router = express.Router();
module.exports = router;

router.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/docs.html');
});

router.get('*', express.static('docs'));
