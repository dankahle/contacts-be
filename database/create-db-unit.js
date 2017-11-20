var conn = new Mongo();

var db = conn.getDB('unit');
db.dropDatabase()
db.createCollection('contacts');
db.createCollection('users');
db.contacts.createIndex({name:1});
db.users.createIndex({name:1});

var labelOne = {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc5e1', label: 'label one'};
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
