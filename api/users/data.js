const chance = new require('chance')(),
  ObjectId = require('mongodb').ObjectId;

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
    return db.find(query)
      .sort({name:1})
      .toArray();
  }

  addOne(user) {
    user.id = user.id || chance.guid();
    user.labels = user.labels || [];
    return db.insertOne(user);
  }

  ////////////// "/:id"
  getOne(id){
    return db.findOne({id: id});
  }

  getOneByName(name){
    return db.findOne({name: name});
  }

  updateOne(id, user) {
    user._id = ObjectId(user._id);
    return db.updateOne({id: id}, user);
  }

  deleteOne(id) {
    return db.removeOne({id: id});
  }

}

module.exports = UsersData;

