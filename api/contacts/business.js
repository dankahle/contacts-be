const chance = new require('chance')(),
  schema = require('./schema/schema.json'),
  schemaPost = require('./schema/schemaPost.json'),
  ContactsData = require('./data'),
  base = require('node-base'),
  Validate = base.Validate,
  BasicError = base.errors.BasicError,
  codePrefix = '200-';

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
    const query = req.query.label ? {labels: {$in: [req.query.label]}} : {};
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
      contact.id = contact.id || chance.guid(); // allow the UI to set an id to keep track of things
      dl.addOne(req.body)
        .then(response => {
          if (response.insertedCount !== 1) {
            next(new BasicError('Failed to add contact', codePrefix + '0102', 404));
            return;
          } else {
            delete contact._id;
            res.send(contact);
          }
        })
        .catch(e => next(e));
    }
  }

  deleteMany() {
    if (!req.query.label) {
      next(new BasicError('No label supplied', codePrefix + '0107', 400))
    }
    const query = {labels: {$in: [req.query.label]}};
    dl.deleteMany(query)
      .then(response => {
        res.send({deletedCount: response.deletedCount})
      })
      .catch(e => next(e));
  }

  ///////////////////// "/"
  getOne() {
    const id = req.params.id;
    if (!Validate.validateGuid(id)) {
      next(new BasicError('Invalid id parameter', codePrefix + '0100', 400));
      return;
    }

    dl.getOne(id)
      .then(contact => {
        if (!contact) {
          next(new BasicError('Contact not found', codePrefix + '0101', 404));
        } else {
          res.send(contact);
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

    const contact = req.body;
    const error = Validate.validateObject(req.body, schema);
    if (error) {
      next(error);
    } else {
      dl.updateOne(id, contact)
        .then(response => {
          if (response.matchedCount !== 1) {
            next(new BasicError('Contact not found', codePrefix + '0101', 404));
            return;
          } else {
            res.send(contact);
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
          next(new BasicError('Contact not found', codePrefix + '0101', 404));
          return;
        } else {
          res.send({deletedCount: response.deletedCount});
        }
      })
      .catch(e => next(e));
  }

}

module.exports = ContactsBusiness;

