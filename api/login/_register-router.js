const express = require('express'),
  base = require('node-base'),
  Validate = base.Validate,
  errorCodes = base.errors.errorCodes,
  BasicError = base.errors.BasicError,
  chance = new require('chance')(),
  LoginBusiness = require('./business');

let bl = null;

router = express.Router();
module.exports = router;

router.get('/schema/*', express.static('api/login'));

router.use(function (req, res, next) {
  bl = new LoginBusiness(req, res, next);
  next();
})

router.post('/', function (req, res, next) {
  bl.register();
})
