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
    return db.find(query)
      .sort({name: 1})
      .toArray();
  }

  addOne(contact) {
    // add properties we expect to be there like mongoose would
    contact.id = contact.id || chance.guid();
    contact.labels = contact.labels || [];
    return db.insertOne(contact)
      .then(result => {
        return result;
      })
  }

  updateMany(contacts) {
    const arr = [];
    contacts.forEach(contact => arr.push(db.updateOne({id: contact.id}, contact)))
    return Promise.all(arr);
  }

  deleteMany(query) {
    return db.removeMany(query);
  }

  ///////////////////// "/:id"
  getOne(id) {
    return db.findOne({id: id})
  }

  updateOne(id, contact) {
    contact._id = ObjectId(contact._id);
    return db.updateOne({id: id}, contact)
  }

  deleteOne(id) {
    return db.removeOne({id: id});
  }

}

module.exports = ContactsData;


