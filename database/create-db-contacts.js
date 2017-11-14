
conn = new Mongo();
db = conn.getDB('contacts');
db.dropDatabase()
db.createCollection('contacts');
db.contacts.createIndex({id:1}, {unique: true});
db.contacts.createIndex({name:1});
db.users.createIndex({id:1}, {unique: true});
db.users.createIndex({name:1});


var contacts = [
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e1', name: 'dank'},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e2', name: 'carl'},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e3', name: 'jim'},
];

var users = [
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e1', name: 'dank'},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e2', name: 'carl'},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e3', name: 'jim'},
];

db.contacts.deleteMany({});
db.contacts.insertMany(contacts);

db.users.deleteMany({});
db.users.insertMany(contacts);

db = conn.getDB('unit');
db.dropDatabase()
db.createCollection('contacts');
db.contacts.createIndex({id:1});
db.contacts.createIndex({name:1});
db.users.createIndex({id:1});
db.users.createIndex({name:1});


var contacts = [
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e1', name: 'dank'},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e2', name: 'carl'},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e3', name: 'jim'},
];

var users = [
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e1', name: 'dank'},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e2', name: 'carl'},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e3', name: 'jim'},
];

db.contacts.deleteMany({});
db.contacts.insertMany(contacts);

db.users.deleteMany({});
db.users.insertMany(contacts);



