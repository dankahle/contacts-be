var express = require('express');

router = express.Router();
module.exports = router;

router.get('/', function(req, res, next) {

  try {
    res.sendFile(__dirname + '/docs.html', null, function (err) {
      if (err) {
        next(err);
      }
    })
  } catch (e) {
    next(e);
  }
});
