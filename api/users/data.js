var _ = require('lodash');

let req = null, res = null, next = null, db = null;

class UsersData {

  constructor(_req, _res, _next) {
    req = _req;
    res = _res;
    next = _next;
    db = req.db.collection('users');
  }

  ////////////// "/"
  getMany(query) {
    return db.find(query, {_id:0})
      .sort({name:1})
      // .project({_id:0})
      .toArray();
  }

  addOne(user) {
    return db.insertOne(user);
  }

  ////////////// "/:id"
  getOne(id){
    return db.findOne({id: id}, {_id:0});
  }

  updateOne(id, user) {
    return db.updateOne({id: id}, user);
  }

  deleteOne(id) {
    return db.removeOne({id: id});
  }

}

module.exports = UsersData;

