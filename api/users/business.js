const chance = new require('chance')(),
  schema = require('./schema/schema.json'),
  schemaPost = require('./schema/schemaPost.json'),
  UsersData = require('./data'),
  base = require('node-base'),
  Validate = base.Validate,
  BasicError = base.errors.BasicError;

let req = null, res = null, next = null, dl = null;

class UsersBusiness {

  constructor(_req, _res, _next) {
    req = _req;
    res = _res;
    next = _next;
    dl = new UsersData(req, res, next);
  }

  getAll() {
    dl.getAll()
      .then(users => res.send(users))
      .catch(e => next(e));
  }

  getOne() {
    const id = req.params.id;
    if (!Validate.validateGuid(id)) {
      next(new BasicError('Invalid id parameter', 400));
      return;
    }

    dl.getOne(id)
      .then(user => {
        if (!user) {
          next(new BasicError('User not found', 404));
        } else {
          res.send(user);
        }
      })
      .catch(e => next(e));
  }

  add() {
    const user = req.body;
    user.id = chance.guid();
    const error = Validate.validateObject(req.body, schemaPost);
    if (error) {
      next(error);
    } else {
      dl.add(req.body)
        .then(response => {
          if (response.insertedCount !== 1) {
            next(new BasicError('Failed to add user', 404));
            return;
          } else {
            delete user._id;
            res.send(user);
          }
        })
        .catch(e => next(e));
    }
  }

  put() {
    const id = req.params.id;
    if (!Validate.validateGuid(id)) {
      next(new BasicError('Invalid id parameter', 400));
      return;
    }

    const user = req.body;
    const error = Validate.validateObject(req.body, schema);
    if (error) {
      next(error);
    } else {
      dl.update(id, user)
        .then(response => {
          if (response.matchedCount !== 1) {
            next(new BasicError('User not found', 404));
            return;
          } else {
            res.send(user);
          }
        })
        .catch(e => next(e));
    }
  }

  remove() {
    const id = req.params.id;
    if (!Validate.validateGuid(id)) {
      next(new BasicError('Invalid id parameter', 400));
      return;
    }

    dl.remove(id)
      .then(response => {
        if (response.deletedCount !== 1) {
          next(new BasicError('User not found', 404));
          return;
        } else {
          res.send({});
        }
      })
      .catch(e => next(e));
  }

}


module.exports = UsersBusiness;
