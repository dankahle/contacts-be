const chance = new require('chance')(),
  schema = require('./schema.json'),
  ContactsData = require('./data');
  base = require('node-base');
  BasicError = base.errors.BasicError;

  let req = null, res = null, next = null, dl = null;

class ContactsBusiness {

  constructor(_req, _res, _next) {
    req = _req;
    res = _res;
    next = _next;
    dl = new ContactsData(req, res, next);
  }

  getAll() {
    res.send(dl.getAll());
  }

  getOne() {
    const user = dl.getOne(req.params.id);
    if (user) {
      res.send(user);
    } else {
      next(new BasicError('User not found', 404));
    }
  }

  add() {
    req.body.id = chance.guid();
    const error = base.Validate.validate(req.body, schema);
    if (error) {
      next(error);
    } else {
      res.send(dl.add(req.body));
    }
  }

  //dankfix: this logic work with native?
  put() {
    const user = dl.update(req.params.id, req.body);
    if (user) {
      res.send(user);
    } else {
      next(new BasicError('User not found', 404));
    }
  }

  remove() {
    const count = dl.remove(req.params.id);
    if (count) {
      res.send({count: count});
    } else {
      next(new BasicError('User not found', 404));
    }
  }

}

module.exports = ContactsBusiness;
