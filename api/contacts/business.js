const schema = require('./schema/schema.json'),
  schemaPost = require('./schema/schemaPost.json'),
  ContactsData = require('./data'),
  base = require('node-base'),
  Validate = base.Validate,
  BasicError = base.errors.BasicError,
  errorCodes = base.errors.errorCodes,
  errorPrefix = '200-';

let req = null, res = null, next = null, dl = null;

class ContactsBusiness {

  constructor(_req, _res, _next) {
    req = _req;
    res = _res;
    next = _next;
    dl = new ContactsData(req, res, next);
  }

  ///////////////////// "/"
  getMany() {
    const query = req.query.label ? {labels: {$elemMatch: {id: req.query.label}}} : {};
    dl.getMany(query)
      .then(contacts => res.send(contacts))
      .catch(e => next(e));
  }

  addOne() {
    const contact = req.body;
    const error = Validate.validateObject(req.body, schemaPost);
    if (error) {
      next(error);
    } else {
      dl.addOne(req.body)
        .then(response => {
          if (response.insertedCount !== 1) {
            next(new BasicError('Failed to add contact', errorPrefix + errorCodes.resource_not_added, 404));
            return;
          } else {
            res.send(contact);
          }
        })
        .catch(e => next(e));
    }
  }

  deleteMany() {
    if (!req.query.label) {
      next(new BasicError('No label supplied', errorPrefix + errorCodes.invalid_parameters, 400))
    }
    const query = {labels: {$elemMatch: {id: req.query.label}}};
    dl.deleteMany(query)
      .then(response => {
        res.send({deletedCount: response.deletedCount})
      })
      .catch(e => next(e));
  }

  ///////////////////// "/"
  getOne() {
    dl.getOne(req.params.id)
      .then(contact => {
        if (!contact) {
          next(new BasicError('Contact not found', errorPrefix + errorCodes.resource_not_found, 404));
        } else {
          res.send(contact);
        }
      })
      .catch(e => next(e));
  }

  putOne() {
    const contact = req.body;
    const error = Validate.validateObject(req.body, schema);
    if (error) {
      next(error);
    } else {
      dl.updateOne(req.params.id, contact)
        .then(response => {
          if (response.matchedCount !== 1) {
            next(new BasicError('Contact not found', errorPrefix + errorCodes.resource_not_found, 404));
            return;
          } else {
            res.send(contact);
          }
        })
        .catch(e => next(e));
    }
  }

  deleteOne() {
    dl.deleteOne(req.params.id)
      .then(response => {
        if (response.deletedCount !== 1) {
          next(new BasicError('Contact not found', errorPrefix + errorCodes.resource_not_found, 404));
          return;
        } else {
          res.send({deletedCount: response.deletedCount});
        }
      })
      .catch(e => next(e));
  }

}

module.exports = ContactsBusiness;

