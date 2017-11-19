const express = require('express'),
  ContactsBusiness = require('./business');

let bl = null;

router = express.Router();
module.exports = router;

router.get('/schema/*', express.static('api/contacts'));

router.use(function (req, res, next) {
  bl = new ContactsBusiness(req, res, next);
  next();
})

router.get('/', function (req, res) {
  bl.getMany()
})

router.post('/', function (req, res, next) {
  bl.addOne()
})

router.delete('/', function (req, res) {
  bl.deleteMany();
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
