const chance = new require('chance')(),
  schema = require('./schema/schema.json'),
  schemaPost = require('./schema/schemaPost.json'),
  UsersData = require('./data'),
  base = require('node-base'),
  Validate = base.Validate,
  BasicError = base.errors.BasicError,
  codePrefix = '100-';

let req = null, res = null, next = null, dl = null;

class UsersBusiness {

  constructor(_req, _res, _next) {
    req = _req;
    res = _res;
    next = _next;
    dl = new UsersData(req, res, next);
  }

  ///////////////////// "/"
  getMany() {
    const query = {};
    dl.getMany(query)
      .then(users => res.send(users))
      .catch(e => next(e));
  }

  addOne() {
    const user = req.body;
    const error = Validate.validateObject(req.body, schemaPost);
    if (error) {
      next(error);
    } else {
      user.id = user.id || chance.guid(); // allow the UI to set an id to keep track of things
      dl.addOne(req.body)
        .then(response => {
          if (response.insertedCount !== 1) {
            next(new BasicError('Failed to add user', codePrefix + '0102', 404));
            return;
          } else {
            delete user._id;
            res.send(user);
          }
        })
        .catch(e => next(e));
    }
  }

  ///////////////////// "/:id"
  getOne() {
    const id = req.params.id;
    if (!Validate.validateGuid(id)) {
      next(new BasicError('Invalid id parameter', codePrefix + '0100', 400));
      return;
    }

    dl.getOne(id)
      .then(user => {
        if (!user) {
          next(new BasicError('User not found', codePrefix + '0101', 404));
        } else {
          res.send(user);
        }
      })
      .catch(e => next(e));
  }

  putOne() {
    const id = req.params.id;
    if (!Validate.validateGuid(id)) {
      next(new BasicError('Invalid id parameter', codePrefix + '0100', 400));
      return;
    }

    const user = req.body;
    const error = Validate.validateObject(req.body, schema);
    if (error) {
      next(error);
    } else {
      dl.updateOne(id, user)
        .then(response => {
          if (response.matchedCount !== 1) {
            next(new BasicError('User not found', codePrefix + '0101', 404));
            return;
          } else {
            res.send(user);
          }
        })
        .catch(e => next(e));
    }
  }

  deleteOne() {
    const id = req.params.id;
    if (!Validate.validateGuid(id)) {
      next(new BasicError('Invalid id parameter', codePrefix + '0100', 400));
      return;
    }

    dl.deleteOne(id)
      .then(response => {
        if (response.deletedCount !== 1) {
          next(new BasicError('User not found', codePrefix + '0101', 404));
          return;
        } else {
          res.send({deletedCount: response.deletedCount});
        }
      })
      .catch(e => next(e));
  }

}

module.exports = UsersBusiness;
