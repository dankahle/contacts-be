var express = require('express');

router = express.Router();
module.exports = router;


router.get('/docs', function(req, res, next) {
  req.url = '/docs/docs.html';
  next();
});

router.use('/docs', express.static('docs'));
router.use('/api/contacts/schema', express.static('api/contacts/schema'));
router.use('/api/users/schema', express.static('api/users/schema'));
