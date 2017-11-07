var _ = require('lodash');

let req = null, res = null, next = null, db = null;

class UsersData {

  constructor(_req, _res, _next) {
    req = _req;
    res = _res;
    next = _next;
    db = req.db.collection('users');
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

  add(user) {
    return db.insertOne(user);
  }

  update(id, user) {
    return db.updateOne({id: id}, user);
  }

  remove(id) {
    return db.removeOne({id: id});
  }

}

module.exports = UsersData;


function getNextUserId() {
  return _.max(_.map(users, 'id')) + 1;
}

function getOneUser(id) {
  return _.find(users, {id: Number(id)});
}

