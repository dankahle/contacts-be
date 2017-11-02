const chance = new require('chance')(),
  schema = require('./schema.json'),
  data = require('./data'),
  base = require('node-base');

  let req = null,
  res = null,
  next = null;

class ContactsBusiness {

  constructor(_req, _res, _next) {
    req = _req;
    res = _res;
    next = _next;
  }

  addContact() {
    req.body.id = chance.guid();
    const error = base.Validate.validate(req.body, schema);
    if (error) {
      next(error);
    } else {
      res.send(data.add(req.body));
    }
  }

}

exports.ContactsBusiness = ContactsBusiness;
