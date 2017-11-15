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
  bl.getMany()
})

router.post('/', function (req, res, next) {
  bl.addOne()
})

router.get('/:id', function (req, res, next) {
  bl.getOne();
})

router.put('/:id', function (req, res) {
  bl.putOne()
})

router.delete('/:id', function (req, res) {
  bl.deleteOne();
})
