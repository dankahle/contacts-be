var conn = new Mongo();

var db = conn.getDB('unit');
db.dropDatabase()

db.createCollection('contacts');
db.contacts.createIndex({userId: 1, id: 1}, {unique: true});
db.contacts.createIndex({userId: 1, name: 1});

db.createCollection('users');
db.users.createIndex({id: 1}, {unique: true});
db.users.createIndex({name: 1});

var labelOne = {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc5e1', name: 'label one'};
var labelOneCarl = {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc4e1', name: 'label one carl'};
var janeId = 'c62dac5b-97d8-53a5-9989-cb2f779bc6e1';
var dankUserId = 'c62dac5b-97d8-53a5-9989-cb2f779bc7e1';
var dankCompany = 'dank co';
var carlUserId = 'c62dac5b-97d8-53a5-9989-cb2f779bc7e2';

var contacts = [
  {userId: dankUserId, id: janeId, name: 'jane', labels:[labelOne]},
  {userId: dankUserId, id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e2', name: 'brenda', labels:[]},
  {userId: dankUserId, id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e3', name: 'martha', labels:[labelOne]},

  {userId: carlUserId, id: 'c62dac5b-97d8-53a5-9989-cb2f779bc3e1', name: 'carl cont1', labels:[labelOneCarl]},
  {userId: carlUserId, id: 'c62dac5b-97d8-53a5-9989-cb2f779bc3e2', name: 'carl cont2', labels:[]},
  {userId: carlUserId, id: 'c62dac5b-97d8-53a5-9989-cb2f779bc3e3', name: 'carl cont3', labels:[labelOneCarl]},
];

var users = [
  {id: dankUserId, name: 'dank', company: dankCompany, labels:[labelOne], created: '2017-12-07T00:00:00.000Z', modified: '2017-12-08T00:00:00.000Z'},
  {id: carlUserId, name: 'carl', company: 'carl co', labels:[], created: '2017-12-07T00:00:00.000Z', modified: '2017-12-08T00:00:00.000Z'},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc7e3', name: 'jim', company: 'jim co', labels:[labelOne], created: '2017-12-07T00:00:00.000Z', modified: '2017-12-08T00:00:00.000Z'},
];

db.contacts.insertMany(contacts);
db.users.insertMany(users);
