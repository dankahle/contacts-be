const chance = new require('chance')(),
  schema = require('./schema/schema.json'),
  schemaPost = require('./schema/schemaPost.json'),
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
        users.map(user => this.removeProps(user));
        res.send(users);
      })
      .catch(e => next(e));
  }

  addOne() {
    const user = req.body;
    this.addProps(user);
    const error = Validate.validateObject(req.body, schemaPost);
    if (error) {
      next(error);
    } else {
      dl.addOne(req.body)
        .then(response => {
          if (response.insertedCount !== 1) {
            next(new BasicError('Failed to add user', errorPrefix + errorCodes.resource_not_added, 404));
            return;
          } else {
            res.send(this.removeProps(user));
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
          res.send(this.removeProps(user));
        }
      })
      .catch(e => next(e));
  }

  putOne() {
    const user = req.body;
    this.addProps(user);
    const error = Validate.validateObject(req.body, schema);
    if (error) {
      next(error);
    } else {
      dl.updateOne(req.params.id, user)
        .then(response => {
          if (response.matchedCount !== 1) {
            next(new BasicError('User not found', errorPrefix + errorCodes.resource_not_found, 404));
            return;
          } else {
            res.send(this.removeProps(user));
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

  addProps(obj) {
    obj.id = obj.id || chance.guid();
    obj.labels = obj.labels || [];
    return obj;
  }

  removeProps(obj) {
    delete obj._id;
    return obj;
  }

}


module.exports = UsersBusiness;
