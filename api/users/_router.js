const express = require('express'),
  UsersBusiness = require('./business');

let bl = null, dl = null;

router = express.Router();
module.exports = router;

router.get('/schema/*', express.static('api/users'));

router.use(function (req, res, next) {
  bl = new UsersBusiness(req, res, next);
  next();
})

router.get('/', function (req, res) {
  bl.getAll()
})

router.get('/:id', function (req, res, next) {
  bl.getOne();
})

router.post('/', function (req, res, next) {
  bl.add()
})

router.put('/:id', function (req, res) {
  bl.put()
})

router.delete('/:id', function (req, res) {
  bl.remove();
})
