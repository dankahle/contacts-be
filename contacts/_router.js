var express = require('express'),
  ContactsBusiness = require('./business').ContactsBusiness,
  data = require('./data'),
  // ContactsData = require('./data').ContactsData,
  bl = null;
  // dt = null;

router = express.Router();
module.exports = router;

router.get('/', function (req, res) {
  setTimeout(() => {
    res.send(data.getAll());
  }, 1000)
})

router.get('/:id', function (req, res, next) {
  setTimeout(() => {
    if (req.params.id === 'normal') {
      next({
        status: 400,
        message: 'Some error 400 happened on server',
      });
    } else if (req.params.id === 'json') {
      next({
        status: 400,
        message: 'Some 400 error with json content',
        data: {
          invalidFields: [
            {name: 'field one'},
            {name: 'field two'},
          ]
        }
      });
    } else if (req.params.id === '500') {
      next({
        status: 500,
        message: 'Ingnored by ui error modal',
      });
    }

    const user = data.getOne(req.params.id);
    if (user) {
      res.send(user);
    } else {
      next({
        status: 404,
        message: 'User not found.'
      });
    }
  },1000)
})

router.use(function (req, res, next) {
  createBusinessAndDataObjects(req, res, next);
  next();
})

router.post('/', function (req, res, next) {
  // createBusinessAndData(req, res, next);
  bl.addContact()
})

router.put('/:id', function (req, res) {
  const user = data.update(req.params.id, req.body);
  if (user) {
    res.send(user);
  }
  res.status(404).end();
})

router.delete('/:id', function (req, res) {
  const count = data.remove(req.params.id);
  if (count) {
    res.send({count: count});
  }
  res.status(404).end();
})

function createBusinessAndDataObjects(req, res, next) {
  bl = new ContactsBusiness(req, res, next);

}
