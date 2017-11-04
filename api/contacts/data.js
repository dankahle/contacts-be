var _ = require('lodash');

let req = null, res = null, next = null, db = null;

class ContactsData {

  constructor(_req, _res, _next) {
    req = _req;
    res = _res;
    next = _next;
    db = req.db.collection('contacts');
  }

  getAll() {
    return db.find({}, {_id:0})
      .sort({name:1})
      // .project({_id:0})
      .toArray();
  }

  getOne(id){
    return db.findOne({id: id}, {_id:0});
  }

  add(contact) {
    return db.insertOne(contact);
  }

  update(id, contact) {
    return db.updateOne({id: id}, contact);
  }

  remove(id) {
    return db.removeOne({id: id});
  }

}

module.exports = ContactsData;


function getNextUserId() {
  return _.max(_.map(contacts, 'id')) + 1;
}

function getOneUser(id) {
  return _.find(contacts, {id: Number(id)});
}

