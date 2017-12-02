var conn = new Mongo();

var db = conn.getDB('contacts');
db.dropDatabase()

db.createCollection('contacts');
db.contacts.createIndex({id:1}, {unique: true});
db.contacts.createIndex({name:1});

db.createCollection('users');
db.users.createIndex({id:1}, {unique: true});
db.users.createIndex({name:1});

var labelOne = {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc5e1', name: 'label one', icon: 'label'};
var labelTwo = {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc5e2', name: 'label two', icon: 'label'};
var labelThree = {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc5e3', name: 'label three', icon: 'label'};
var contacts = [
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc4e1', name: 'mary', labels:[labelOne, labelTwo],
    emails: [{email: 'mary@gmail.com', label: 'mary\'s label'}]
  },
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc4e2', name: 'jane', labels:[]},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc4e3', name: 'martha', labels:[labelOne]},
];

var users = [
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e1', name: 'dank', labels:[labelOne, labelTwo, labelThree]},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e2', name: 'carl', labels:[]},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e3', name: 'jim', labels:[labelOne]},
];

db.contacts.insertMany(contacts);
db.users.insertMany(users);
