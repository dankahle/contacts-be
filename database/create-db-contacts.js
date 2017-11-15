var conn = new Mongo();

var db = conn.getDB('contacts');
db.dropDatabase()
db.createCollection('contacts');
db.contacts.createIndex({id:1});
db.contacts.createIndex({name:1});
db.users.createIndex({id:1});
db.users.createIndex({name:1});


var contacts = [
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e1', name: 'dank', labels:['c62dac5b-97d8-53a5-9989-cb2f779bc5e1']},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e2', name: 'carl', labels:[]},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e3', name: 'jim', labels:['c62dac5b-97d8-53a5-9989-cb2f779bc5e1']},
];

var users = [
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e1', name: 'dank'},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e2', name: 'carl'},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e3', name: 'jim'},
];

db.contacts.insertMany(contacts);
db.users.insertMany(contacts);
