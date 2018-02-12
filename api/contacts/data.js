const chance = new require('chance')(),
  ObjectId = require('mongodb').ObjectId;

let req = null, res = null, next = null, db = null;

class ContactsData {

  constructor(_req, _res, _next) {
    req = _req;
    res = _res;
    next = _next;
    db = req.db.collection('contacts');
  }

  ///////////////////// "/"
  getMany(query) {
    query.userId = req.user.id;
    return db.find(query)
      .toArray();
  }

  addOne(contact) {
    // add properties we expect to be there like mongoose would
    contact.id = contact.id || chance.guid();
    contact.userId = contact.userId || req.user.id;
    contact.labels = contact.labels || [];
    contact.emails = contact.emails || [];
    contact.phones = contact.phones || [];
    contact.addresses = contact.addresses || [];
    contact.websites = contact.websites || [];
    return db.insertOne(contact)
      .then(result => {
        return result;
      })
  }

  updateMany(contacts) {
    const arr = [];
    contacts.forEach(contact => {
      contact._id = ObjectId(contact._id);
      arr.push(db.updateOne({userId: req.user.id, id: contact.id}, contact));
    })
    return Promise.all(arr);
  }

  deleteMany(query) {
    query.userId = req.user.id;
    return db.removeMany(query);
  }

  ///////////////////// "/:id"
  getOne(id) {
    return db.findOne({userId: req.user.id, id: id})
  }

  updateOne(id, contact) {
    contact._id = ObjectId(contact._id);
    return db.updateOne({userId: req.user.id, id: id}, contact)
  }

  deleteOne(id) {
    return db.removeOne({userId: req.user.id, id: id});
  }

}

module.exports = ContactsData;


