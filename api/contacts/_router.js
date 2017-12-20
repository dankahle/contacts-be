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
  bl.getMany();
})

router.post('/', function (req, res, next) {
  bl.addOne();
})

router.put('/', function (req, res) {
  bl.updateMany();
})

router.delete('/', function (req, res) {
  bl.deleteByLabel();
})

router.get('/:id', function (req, res, next) {
  bl.getOne();
})

router.put('/:id', function (req, res) {
  setTimeout(() => bl.updateOne(), 1000);// for spinner visibility in UI
  // bl.updateOne();
})

router.delete('/:id', function (req, res) {
  bl.deleteOne();
})
