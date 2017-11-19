const chance = new require('chance')();

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
    user._id = user._id || chance.guid(); // allow the UI to set an id to keep track of things
    user.labels = user.labels || [];
    return db.insertOne(user);
  }

  ////////////// "/:id"
  getOne(id){
    return db.findOne({_id: id});
  }

  getOneByName(name){
    return db.findOne({name: name});
  }

  updateOne(id, user) {
    user.labels = user.labels || [];
    return db.updateOne({_id: id}, user);
  }

  deleteOne(id) {
    return db.removeOne({_id: id});
  }

}

module.exports = UsersData;

