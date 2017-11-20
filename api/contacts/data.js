

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
    return db.findOne({id: id})
  }

  updateOne(id, contact) {
    return db.updateOne({id: id}, contact)
  }

  deleteOne(id) {
    return db.removeOne({id: id});
  }

}

module.exports = ContactsData;


