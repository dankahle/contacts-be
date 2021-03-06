const chance = new require('chance')(),
  _ = require('lodash'),
  schema = require('./schema/schema.json'),
  schemaPost = require('./schema/schema-post.json'),
  UsersData = require('./data'),
  base = require('node-base'),
  Validate = base.Validate,
  BasicError = base.errors.BasicError,
  errorCodes = base.errors.errorCodes,
  errorPrefix = '300-';

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
      .then(users => {
        users = _.sortBy(users, user => user.name.toLowerCase())
        res.send(users);
      })
      .catch(e => next(e));
  }

  addOne() {
    const user = req.body;
    const error = Validate.validateObject(req.body, schemaPost, `${errorPrefix}0021`);
    if (error) {
      next(error);
    } else {
      dl.addOne(user)
        .then(response => {
          if (response.insertedCount !== 1) {
            next(new BasicError('Failed to add user', errorPrefix + errorCodes.resource_not_added, 404));
            return;
          } else {
            res.send(user);
          }
        })
        .catch(e => next(e));
    }
  }

  ///////////////////// "/:id"
  getOne() {
    dl.getOne(req.params.id)
      .then(user => {
        if (!user) {
          next(new BasicError('User not found', errorPrefix + errorCodes.resource_not_found, 404));
        } else {
          res.send(user);
        }
      })
      .catch(e => next(e));
  }

  updateOne() {
    const user = req.body;
    const error = Validate.validateObject(req.body, schema, `${errorPrefix}0021`);
    if (error) {
      next(error);
    } else {
      dl.updateOne(req.params.id, user)
        .then(response => {
          if (response.matchedCount !== 1) {
            next(new BasicError('User not found', errorPrefix + errorCodes.resource_not_found, 404));
            return;
          } else {
            res.send(user);
          }
        })
        .catch(e => next(e));
    }
  }

  deleteOne() {
    dl.deleteOne(req.params.id)
      .then(response => {
        if (response.deletedCount === 0) {
          next(new BasicError('Contact not found', errorPrefix + errorCodes.resource_not_found, 404));
          return;
        } else {
          res.status(204).end();
        }
      })
      .catch(e => next(e));
  }

}


module.exports = UsersBusiness;
