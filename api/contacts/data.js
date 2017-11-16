const chance = new require('chance')();

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
      .sort({name:1})
      .toArray();
  }

  addOne(contact) {
    contact._id = contact._id || chance.guid(); // allow the UI to set an id to keep track of things
    contact.labels = contact.labels || [];
    return db.insertOne(contact)
      .then(result => {
        return result;
      })
  }

  deleteMany(query) {
    return db.removeMany(query);
  }

  ///////////////////// "/:id"
  getOne(id){
    return db.findOne({_id: id})
  }

  updateOne(id, contact) {
    contact.labels = contact.labels || [];
    return db.updateOne({_id: id}, contact)
  }

  deleteOne(id) {
    return db.removeOne({_id: id});
  }

}

module.exports = ContactsData;


