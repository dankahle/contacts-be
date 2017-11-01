var express = require('express'),
  repo = require('./data');

router = express.Router();
module.exports = router;


router.get('/', function (req, res) {
  setTimeout(() => {
    res.send(repo.getAll());
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

    const user = repo.getOne(req.params.id);
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

router.post('/', function (req, res) {
  res.send(repo.add(req.body));
})

router.put('/:id', function (req, res) {
  const user = repo.update(req.params.id, req.body);
  if (user) {
    res.send(user);
  }
  res.status(404).end();
})

router.delete('/:id', function (req, res) {
  const count = repo.remove(req.params.id);
  if (count) {
    res.send({count: count});
  }
  res.status(404).end();
})

