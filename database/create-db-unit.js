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
var dankContactId = 'c62dac5b-97d8-53a5-9989-cb2f779bc6e1';
var dankUserId = 'c62dac5b-97d8-53a5-9989-cb2f779bc7e1';
var carlUserId = 'c62dac5b-97d8-53a5-9989-cb2f779bc7e2';

var contacts = [
  {userId: dankUserId, id: dankContactId, name: 'dank', labels:[labelOne]},
  {userId: dankUserId, id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e2', name: 'carl', labels:[]},
  {userId: dankUserId, id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e3', name: 'jim', labels:[labelOne]},

  {userId: carlUserId, id: dankContactId, name: 'carl cont1', labels:[labelOneCarl]},
  {userId: carlUserId, id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e2', name: 'carl cont2', labels:[]},
  {userId: carlUserId, id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e3', name: 'carl cont3', labels:[labelOneCarl]},
];

var users = [
  {id: dankUserId, name: 'udank', labels:[labelOne]},
  {id: carlUserId, name: 'carl', labels:[]},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc7e3', name: 'jim', labels:[labelOne]},
];

db.contacts.insertMany(contacts);
db.users.insertMany(users);
