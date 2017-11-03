var _ = require('lodash');

var users = [
  {id: 1, name: 'dank', age: 50, dcId: 4},
  {id: 2, name: 'carl', age: 60, dcId: 5},
  {id: 3, name: 'jim', age: 40, dcId: 6},
]

let req = null, res = null, next = null;

class ContactsData {

  constructor(_req, _res, _next) {
    req = _req;
    res = _res;
    next = _next;
  }

  getAll() {
    return users;
  }

  getOne(id){
    return getOneUser(id);
  }

  add(user) {
    user.id = getNextUserId();
    users.push(user);
    return user;
  }

  update(id, body) {
    const user = getOneUser(id);
    if (user) {
      return _.merge(user, body);
    } else {
      return;
    }
  }

  remove(id) {
    var user = getOneUser(id);
    if(!user)
      return 0;
    _.pull(users, user);
    return 1;
  }

}

module.exports = ContactsData;


function getNextUserId() {
  return _.max(_.map(users, 'id')) + 1;
}

function getOneUser(id) {
  return _.find(users, {id: Number(id)});
}

