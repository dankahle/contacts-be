var conn = new Mongo();

var db = conn.getDB('contacts');
db.dropDatabase()

db.createCollection('contacts');
db.contacts.createIndex({id:1}, {unique: true});
db.contacts.createIndex({name:1});

db.createCollection('users');
db.users.createIndex({id:1}, {unique: true});
db.users.createIndex({name:1});

var labelOne = {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc5e1', name: 'label one'};
var contacts = [
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e1', name: 'dank', labels:[labelOne]},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e2', name: 'carl', labels:[]},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e3', name: 'jim', labels:[labelOne]},
];

var users = [
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e1', name: 'dank', labels:[labelOne]},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e2', name: 'carl', labels:[]},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e3', name: 'jim', labels:[labelOne]},
];

db.contacts.insertMany(contacts);
db.users.insertMany(contacts);
